<script lang="ts">
    import SettingsItem from "$lib/components/settings/SettingsItem.svelte";
    import SettingsCategory from "$lib/components/settings/SettingsCategory.svelte";
    
    import { Code, Feather, Package, Rocket } from "lucide-svelte";
</script>

<SettingsCategory name="About Pinna" Icon={Feather}>
    <SettingsItem name="Developers" Icon={Rocket}>
        <a href="https://em-3.dev" target="_blank">EM_3</a>
    </SettingsItem>
    <SettingsItem name="Open Source Software Used" Icon={Package}>
        <a href="https://tauri.app/" target="_blank">Tauri</a>
        <a href="https://svelte.dev/" target="_blank">Svelte and SvelteKit</a>
        <a href="https://vite.dev/" target="_blank">Vite</a>
        <a href="https://lucide.dev/" target="_blank">Lucide Icons</a>
    </SettingsItem>
    <SettingsItem name="Source and License" Icon={Code}>
        <a href="https://github.com/em-3/pinna" target="_blank">Source code available on GitHub</a>
        <a href="https://www.mozilla.org/en-US/MPL/2.0/" target="_blank">Licensed under the Mozilla Public License Version 2.0</a>
        <p>Pinna logo copyright &copy; 2024 Eli Miller. All Rights Reserved</p>
    </SettingsItem>
</SettingsCategory>