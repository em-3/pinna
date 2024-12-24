<script lang="ts">
    import { errorQueue } from "$lib/error.svelte";
    import { fly } from "svelte/transition";
    import { flip } from "svelte/animate";
    import { CircleAlert } from "lucide-svelte";
</script>

<div class="error-stack">
    {#each errorQueue as error (error.id)}
        <div class="error-toast" animate:flip={{ duration: 300 }} in:fly={{ x: "30em" }} out:fly={{ x: "30em" }}>
            <div class="icon">
                <CircleAlert size="32" />
            </div>
            <div class="content">
                <h1>{ error.errorTitle ?? "Error!" }</h1>
                <p>{ error.errorMessage }</p>
            </div>
        </div>
    {/each}
</div>

<style>
    .error-stack {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 1;
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px;
        
        view-transition-name: error-message;
    }

    .error-toast {
        max-width: 25em;
        display: grid;
        grid-template-columns: min-content 1fr;
        gap: 20px;
        padding: 20px;
        background-color: var(--error-color);
        color: var(--secondary-text-color);
        border-radius: 25px;
        box-shadow: var(--tertiary-color) 0 5px 5px;
    }

    .icon {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    h1 {
        font-size: 1.25em;
    }

    p {
        font-size: 0.85em;
    }
    
    ::view-transition-group(error-message) {
        /* Fix for weird view transition stacking issues */
        /* https://www.nicchan.me/blog/view-transitions-and-stacking-context/ */
        z-index: 1;
    }

    ::view-transition-old(error-message) {
        /* Stop the old error message from displaying at all */
        display: none;
    }

    ::view-transition-new(error-message) {
        /* Prevent the fade-in on the new error message */
        animation: none;
    }
</style>