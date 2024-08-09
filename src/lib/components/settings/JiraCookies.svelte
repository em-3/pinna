<script lang="ts">
	import { invoke } from "@tauri-apps/api/tauri";
	import ThemedButton from "$lib/components/ThemedButton.svelte";
	import "ldrs/ring";

	export let domain: string;
	export let domainValid: boolean = false;
	//jsessionid
	export let sessionID: string = "";
	//atlassian.xsrf.token
	export let crossSiteToken: string = "";
	//crowd.token_key
	export let crowdToken: string = "";

	/**
	 * Represents a cookie extracted by rookie on the backend
	 */
	interface Cookie {
		domain: string;
		name: string;
		value: string;
		expires: number;
	}

	const targetCookies = ["jsessionid", "atlassian.xsrf.token", "crowd.token_key"];

	let cookiePromise: Promise<void>;

	async function getCookies() {
		let cookies: Array<Cookie> = await invoke("get_cookies", { domain });

		if (cookies.length < targetCookies.length) {
			throw Error(
				"Could not find cookies. Make sure you're using a compatible browser and are signed into Jira"
			);
		}

		//Filter out unneeded cookies and duplicates (from multiple browsers) by picking the most recent cookies
		//And put them into an object for easy indexing
		let filteredCookies: { [key: string]: Cookie } = {};

		for (let cookie of cookies) {
			if (!targetCookies.includes(cookie.name)) {
				continue;
			}

			//Check if the a cookie with the same name is already stored
			if (filteredCookies[cookie.name]) {
				//If there's a duplicate, swap it with the current selection if the new cookie has a later expiry time
				if (filteredCookies[cookie.name].expires < cookie.expires) {
					filteredCookies[cookie.name] = cookie;
				}
			} else {
				filteredCookies[cookie.name] = cookie;
			}
		}

		//Assign each cookie
		sessionID = filteredCookies["jsessionid"].value;
		crossSiteToken = filteredCookies["atlassian.xsrf.token"].value;
		crowdToken = filteredCookies["crowd.token_key"].value;
	}
</script>

<div class="flex flex-col gap-4 rounded-lg p-4 even:bg-gray-100">
	<p class="rounded-lg border-l-8 border-l-yellow-400 bg-yellow-100 p-4">
		Warning! These values can be used by a malicious attacker to gain access to your Jira
		installation. Please handle with care.
	</p>
	<p>
		Pinna can autofill the fields below by extracting the cookies from a compatible Chromium or
		Firefox-based browser.
	</p>
	<p
		aria-hidden={!domainValid}
		class="text-red-500 opacity-0 transition-opacity {domainValid ? '' : 'opacity-100'}"
	>
		Please fill in a valid domain below to use autofill
	</p>
	<div class="flex items-center gap-4">
		<ThemedButton disabled={!domainValid} on:click={() => (cookiePromise = getCookies())}
			>Autofill Cookies</ThemedButton
		>
		{#if cookiePromise}
			{#await cookiePromise}
				<l-ring size="30" stroke="4"></l-ring>
				<p>Loading...</p>
			{:then}
				<p>Success!</p>
			{:catch error}
				<p class="text-red-500">{error}</p>
			{/await}
		{/if}
	</div>
	<p>
		Pinna does not extract any cookies other than the ones required (see below settings for more
		information)
	</p>
</div>
