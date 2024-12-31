<script lang="ts">
    import type { TextInputComponent } from "$lib/types/properties/TextInputComponent";
    
    import { Eye, EyeOff } from "lucide-svelte";
    import { onMount } from "svelte";

    let { validationRegex = undefined, value = $bindable(), dirty = $bindable(), valid = $bindable(false) }: TextInputComponent = $props();

    let showPassword = $state(false);
    const PasswordIcon = $derived(showPassword ? Eye : EyeOff);

    // The following code is identical to the validation found in TextInput.svelte
    // The reason for this is because the <input> element requires custom styling in this component,
    // meaning it cannot take advantage of the existing code in TextInput.svelte

    let tempValue: string;

    onMount(() => {
        // Store a temporary copy of the value when the component is mounted
        tempValue = value;
    })

    function inputUpdated() {
        // Check if the current value is the same as the original value
        dirty = tempValue != value;

        if(validationRegex) {
            valid = validationRegex.test(value);
        }
    }
</script>

<div class="password">
    <input type={ showPassword ? "text" : "password" } bind:value onchange={inputUpdated}>
    <button onclick={() => showPassword = !showPassword} aria-label="Show/Hide Password"><PasswordIcon /></button>
</div>

<style>
    .password {
        flex: 1;
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