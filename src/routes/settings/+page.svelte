<script lang="ts">
    import { defaultConfig, type PinnaConfig } from "$lib/types/PinnaConfig";

    import { onMount } from "svelte";
    import { configStore, saveConfig as saveConfigToFile } from "$lib/stores/config.svelte";
    import JiraSettings from "$lib/components/settings/JiraSettings.svelte";
    import PinnaInfo from "$lib/components/settings/PinnaInfo.svelte";

    let tempConfig: PinnaConfig = $state(defaultConfig);
    let dirtyValues: boolean[] = $state([
        false
    ]);

    const dirty = $derived(dirtyValues.some(value => value));

    function discardConfig() {
        // Reset the UI to the original values
        tempConfig = $state.snapshot(configStore).config;
        dirtyValues.fill(false);
    }

    function saveConfig() {
        // Copy the values into the config and save it
        configStore.config = tempConfig;
        saveConfigToFile();
        dirtyValues.fill(false);
    }

    onMount(() => {
        // Create an exact copy of the current config
        tempConfig = $state.snapshot(configStore).config;
    });

</script>

<section class="settings">
    <header>
        <h1>Settings</h1>
    </header>
    <section class="settings-categories scroll-section">
        <JiraSettings bind:config={tempConfig} bind:dirty={dirtyValues[0]} />
        <PinnaInfo />
    </section>
    <div class="button-tray" class:show={dirty}>
        <button onclick={discardConfig}>Discard Changes</button>
        <button onclick={saveConfig}>Save Changes</button>
    </div>
</section>

<style>
    .button-tray {
        position: fixed;
		bottom: 6em;
		right: 10px;
		transform: translateY(400%);
		transition: transform 0.5s ease;
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
        overflow: hidden;
        padding: 10px;
    }

    .settings-categories {
        overflow-y: auto;
    }

    @media (min-width: 64em) {
        .button-tray {
            bottom: 1em;
        }
    }
</style>