<script lang="ts">
    import type { FormEventHandler } from "svelte/elements";

    import { Eye, EyeOff } from "lucide-svelte";

    let { value = $bindable(), oninput = null }: { value: string, oninput: FormEventHandler<HTMLInputElement> | null } = $props();

    let showPassword = $state(false);
    const PasswordIcon = $derived(showPassword ? Eye : EyeOff);
</script>

<div class="password">
    <input type={ showPassword ? "text" : "password" } bind:value {oninput}>
    <button onclick={() => showPassword = !showPassword} aria-label="Show/Hide Password"><PasswordIcon /></button>
</div>

<style>
    .password {
        display: inline-flex;
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