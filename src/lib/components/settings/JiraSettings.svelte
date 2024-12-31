<script lang="ts">
    import { BookKey, Cloud, Globe, KeyRound, LayoutDashboard } from "lucide-svelte";
    import SettingsItem from "$lib/components/settings/SettingsItem.svelte";
    import SettingsCategory from "$lib/components/settings/SettingsCategory.svelte";
    import TextInput from "$lib/components/settings/component/TextInput.svelte";
    import UrlInput from "$lib/components/settings/component/UrlInput.svelte";
    import PasswordInput from "$lib/components/settings/component/PasswordInput.svelte";
    import type { PinnaConfig } from "$lib/types/PinnaConfig";

    let { config = $bindable(), dirty = $bindable() }: { config: PinnaConfig, dirty: boolean } = $props();

    let dirtyValues: boolean[] = $state(new Array(4));

    $effect(() => {
        // Reset the values if dirty gets flipped to false
        if(!dirty) {
            dirtyValues.fill(false);
        }
    });

    $effect(() => {
        dirty = dirtyValues.some(value => value);
    })
</script>

<SettingsCategory name="Jira" Icon={Cloud}>
    <SettingsItem name="Instance URL" Icon={Globe} description="The fully-formed URL for your Jira instance.">
        <UrlInput type="url" bind:value={config.jiraConfig.url} bind:dirty={dirtyValues[0]} />
    </SettingsItem>
    <SettingsItem name="Access Token" Icon={KeyRound} description="The access token used to authenticate with your Jira instance.">
        <PasswordInput type="url" bind:value={config.jiraConfig.token} bind:dirty={dirtyValues[1]} />
    </SettingsItem>
    <SettingsItem name="Project Name" Icon={LayoutDashboard} description="The Jira project that issues will be pulled from.">
        <TextInput bind:value={config.jiraConfig.projectName} bind:dirty={dirtyValues[2]} />
    </SettingsItem>
    <SettingsItem name="Story Points Field" Icon={BookKey} description="The Jira issue field that is used to track story points.">
        <TextInput bind:value={config.jiraConfig.storyPointsField} bind:dirty={dirtyValues[3]} />
    </SettingsItem>
</SettingsCategory>