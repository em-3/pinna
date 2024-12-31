<script lang="ts">
    import type { TextInputComponent } from "$lib/types/properties/TextInputComponent";
    import { onMount } from "svelte";

    let { type = "text", validationRegex = undefined, value = $bindable(), dirty = $bindable(), valid = $bindable(false) }: TextInputComponent = $props();

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

<input {type} bind:value onchange={inputUpdated}>

<style>
    input {
        flex: 1;
    }
</style>