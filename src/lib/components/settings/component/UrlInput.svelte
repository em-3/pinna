<script lang="ts">
    import type { TextInputComponent } from "$lib/types/properties/TextInputComponent";
    import TextInput from "./TextInput.svelte";

    let { value = $bindable(), dirty = $bindable(), valid = $bindable(false), ...extra }: TextInputComponent = $props();

    // This regex checks if the input contains a fully-formed, secure URL with a trailing slash
    const validationRegex = /^https\:\/\/[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+\/(?:[a-zA-Z]+\/)*$/g;
</script>

<TextInput type="url" {validationRegex} bind:value bind:dirty bind:valid {...extra} />