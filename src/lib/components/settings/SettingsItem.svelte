<script lang="ts">
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

    let showPassword = $state(false);
    const PasswordIcon = $derived(showPassword ? Eye : EyeOff);
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
        <div class="password">
            <input type={ showPassword ? "text" : "password" } bind:value oninput={() => dirty = true}>
            <button onclick={() => showPassword = !showPassword} aria-label="Show/Hide Password"><PasswordIcon /></button>
        </div>
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

    .password {
        display: flex;
        align-items: stretch;
    }

    .password input {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        flex: 1;
    }

    .password button {
        display: flex;
        align-items: center;
        border: 1px solid var(--tertiary-color);
        border-radius: 15px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-left: none;
        background-color: var(--background-color);
        color: var(--text-color);
        padding: 0 10px;
        cursor: pointer;
    }
</style>