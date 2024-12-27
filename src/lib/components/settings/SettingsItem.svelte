<script lang="ts">
    import PasswordInput from "../input/PasswordInput.svelte";
    import { Eye, EyeOff } from "lucide-svelte";

    interface SettingsItemProperties {
        name: string,
        Icon: any,
        description: string | undefined,
        type: string,
        value: any,
        dirty: boolean
    }

    let { name, Icon = undefined, description = undefined, type = "text", value = $bindable(), dirty = $bindable(false) }: SettingsItemProperties = $props();
</script>

<section class="settings-item">
    <header>
        <h3>
            <Icon />
            <span>{ name }</span>
        </h3>
        {#if description}
        <p>{ description }</p>
        {/if}
    </header>
    {#if type == "password"}
        <PasswordInput bind:value oninput={() => dirty = true} />
    {:else}
        <input { type } bind:value oninput={() => dirty = true}>
    {/if}
</section>

<style>
    header {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    h3 {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 1em;
    }

    p {
        font-size: 0.85em;
    }

    .settings-item {
        display: contents;
    }
</style>