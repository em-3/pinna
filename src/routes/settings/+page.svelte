<script lang="ts">
	import DomainSetting from "$lib/components/settings/DomainSetting.svelte";
	import JiraCookies from "$lib/components/settings/JiraCookies.svelte";
	import SettingsCategory from "$lib/components/settings/SettingsCategory.svelte";
	import TextSetting from "$lib/components/settings/TextSetting.svelte";
	import ThemedButton from "$lib/components/ThemedButton.svelte";
	import { type Config } from "$lib/stores/config";
	import { getContext } from "svelte";
	import { type Writable } from "svelte/store";

	const config: Writable<Config> = getContext("config");

	//Clone the config so we can make changes to it without saving them
	let liveConfig = structuredClone($config);

	//And make sure any updates get shown here as well
	config.subscribe((newConfig) => {
		if (liveConfig == newConfig) {
			return;
		}

		liveConfig = structuredClone(newConfig);
	});

	//Checks if the config has changed from the saved version.
	///This isn't the most elegant solution, but it's the best I could think of without doing deep object inspection
	$: configModified = !(
		liveConfig.backend.jiraDomain == $config.backend.jiraDomain &&
		liveConfig.backend.sessionID == $config.backend.sessionID &&
		liveConfig.backend.crossSiteToken == $config.backend.crossSiteToken &&
		liveConfig.backend.crowdTokenKey == $config.backend.crowdTokenKey
	);

	let jiraDomainValid: boolean = false;

	function saveConfig() {
		//To save we just need to write the live config into the store
		config.set(structuredClone(liveConfig));
	}
</script>

<div class="flex flex-col">
	<header class="p-4">
		<div class="mb-4 flex items-center gap-4">
			<iconify-icon icon="material-symbols:settings" width="48"></iconify-icon>
			<h1 class="text-2xl">Settings</h1>
		</div>
		<hr class="border-t-solid w-1/3 border-t-2 border-t-slate-500" />
	</header>
	<SettingsCategory icon="logos:jira" name="Jira">
		<JiraCookies
			bind:crossSiteToken={liveConfig.backend.crossSiteToken}
			bind:crowdToken={liveConfig.backend.crowdTokenKey}
			bind:sessionID={liveConfig.backend.sessionID}
			domain={liveConfig.backend.jiraDomain}
			domainValid={jiraDomainValid}
		></JiraCookies>
		<DomainSetting
			bind:domainValid={jiraDomainValid}
			bind:value={liveConfig.backend.jiraDomain}
			name="Jira Domain"
		>
			The domain of your Jira installation. This should only be the domain (e.g. "jira.com" will
			work, but not "https://jira.com")
		</DomainSetting>
		<TextSetting bind:value={liveConfig.backend.sessionID} name="Session ID">
			The session ID used to authenticate your Jira session. The value for this is from the
			<code>jsessionid</code>
			cookie in your Jira session.
		</TextSetting>
		<TextSetting bind:value={liveConfig.backend.crossSiteToken} name="Cross Site Token">
			The CSRF token used by the server to determine if the application is legitimate or not. The
			value for this is from the
			<code>atlassian.xsrf.token</code>
			cookie in your Jira session.
		</TextSetting>
		<TextSetting bind:value={liveConfig.backend.crowdTokenKey} name="Crowd Token Key">
			The crowd token key used to authenticate your Jira session. The value for this is from the
			<code>crowd.token_key</code>
			cookie in your Jira session.
		</TextSetting>
	</SettingsCategory>
	<div class="saveButton {configModified && jiraDomainValid ? 'show' : ''}">
		<ThemedButton on:click={saveConfig}>Save Changes</ThemedButton>
	</div>
</div>

<style>
	.saveButton {
		position: fixed;
		bottom: 5%;
		right: 5%;
		transform: translateY(200%);
		transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
	}

	.saveButton.show {
		transform: translateY(0);
	}
</style>
