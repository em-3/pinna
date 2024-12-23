<script lang="ts">
    import type { ConfigData } from "$lib/types/ConfigData";

    import { Cloud, Code, Feather, Globe, KeyRound, LayoutDashboard, Package, Rocket } from "lucide-svelte";
    import { onMount } from "svelte";
    import { config, saveConfig as saveConfigToFile } from "$lib/config.svelte";
    import SettingsItem from "$lib/components/settings/SettingsItem.svelte";
    import SettingsCategory from "$lib/components/settings/SettingsCategory.svelte";
    import InfoItem from "$lib/components/settings/InfoItem.svelte";

    let tempConfig: ConfigData = $state({
        instance: {
            projectName: "",
            token: "",
            url: ""
        }
    });
    let dirty = $state(false);

    function discardConfig() {
        // Reset the UI to the original values
        tempConfig = $state.snapshot(config);
        dirty = false;
    }

    function saveConfig() {
        // Copy the values into the config and save it
        config.instance = tempConfig.instance;
        saveConfigToFile();
        dirty = false;
    }

    onMount(() => {
        // Create an exact copy of the current config
        tempConfig = $state.snapshot(config);
    });

</script>

<section class="settings">
    <header>
        <h1>Settings</h1>
    </header>
    <section class="settings-categories">
        <SettingsCategory name="Server" Icon={Cloud}>
            <SettingsItem name="Instance URL" Icon={Globe} description="The fully-formed URL for your Jira instance." type="url" bind:value={tempConfig.instance.url} bind:dirty>
            </SettingsItem>
            <SettingsItem name="Personal Access Token" Icon={KeyRound} description="A personal access token connected to your account. This will be used to authenticate with the Jira server." type="password" bind:value={tempConfig.instance.token} bind:dirty></SettingsItem>
            <SettingsItem name="Project Name" Icon={LayoutDashboard} description="The Jira project that worklogs will be pulled from." bind:value={tempConfig.instance.projectName} bind:dirty></SettingsItem>
        </SettingsCategory>
        <SettingsCategory name="About Pinna" Icon={Feather}>
            <InfoItem name="Developers" Icon={Rocket}>
                <a href="https://em-3.dev" target="_blank">EM_3</a>
            </InfoItem>
            <InfoItem name="Open Source Software Used" Icon={Package}>
                <a href="https://tauri.app/" target="_blank">Tauri</a>
                <a href="https://svelte.dev/" target="_blank">Svelte and SvelteKit</a>
                <a href="https://vite.dev/" target="_blank">Vite</a>
                <a href="https://lucide.dev/" target="_blank">Lucide Icons</a>
            </InfoItem>
            <InfoItem name="Source and License" Icon={Code}>
                <a href="https://github.com/em-3/pinna" target="_blank">Source code available on GitHub</a>
                <a href="https://www.mozilla.org/en-US/MPL/2.0/" target="_blank">Licensed under the Mozilla Public License Version 2.0</a>
                <p>Pinna logo copyright &copy; 2024 Eli Miller. All Rights Reserved</p>
            </InfoItem>
        </SettingsCategory>
    </section>
    <div class="button-tray" class:show={dirty}>
        <button onclick={discardConfig}>Discard Changes</button>
        <button onclick={saveConfig}>Save Changes</button>
    </div>
</section>

<style>
    .button-tray {
        position: fixed;
		bottom: 5em;
		right: 10px;
		transform: translateY(400%);
		transition: transform 0.5s ease-out;
    }

    .button-tray.show {
		transform: translateY(0);
    }

    .button-tray button {
        box-shadow: var(--tertiary-color) 0 5px 5px;
    }

    .settings, .settings-categories {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .settings {
        padding: 10px;
    }

    @media (min-width: 64em) {
        .button-tray {
            bottom: 1em;
        }
    }
</style>