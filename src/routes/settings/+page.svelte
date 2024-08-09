<script lang="ts">
	import DomainSetting from "$lib/components/settings/DomainSetting.svelte";
	import JiraCookies from "$lib/components/settings/JiraCookies.svelte";

	import SettingsCategory from "../../lib/components/settings/SettingsCategory.svelte";
	import TextSetting from "../../lib/components/settings/TextSetting.svelte";

	let domainValid: boolean = false;
	let domain: string = "";
	let sessionID: string = "";
	let crossSiteToken: string = "";
	let crowdToken: string = "";
</script>

<div class="flex flex-col">
	<header class="p-4">
		<h1 class="mb-3 text-3xl">Settings</h1>
		<hr class="border-t-solid w-1/3 border-t-2 border-t-slate-500" />
	</header>
	<SettingsCategory name="Jira">
		<JiraCookies bind:crossSiteToken bind:crowdToken bind:sessionID {domain} {domainValid}
		></JiraCookies>
		<DomainSetting bind:domainValid bind:value={domain} name="Jira Domain">
			The domain of your Jira installation. This should only be the domain (e.g. "jira.com" will
			work, but not "https://jira.com")
		</DomainSetting>
		<TextSetting bind:value={sessionID} name="Session ID">
			The session ID used to authenticate your Jira session. The value for this is from the
			<code>jsessionid</code>
			cookie in your Jira session.
		</TextSetting>
		<TextSetting bind:value={crossSiteToken} name="Cross Site Token">
			The CSRF token used by the server to determine if the application is legitimate or not. The
			value for this is from the
			<code>atlassian.xsrf.token</code>
			cookie in your Jira session.
		</TextSetting>
		<TextSetting bind:value={crowdToken} name="Crowd Token Key">
			The crowd token key used to authenticate your Jira session. The value for this is from the
			<code>crowd.token_key</code>
			cookie in your Jira session.
		</TextSetting>
	</SettingsCategory>
</div>
