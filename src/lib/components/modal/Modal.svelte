<script lang="ts">
    import { CircleX } from "lucide-svelte";
    import type { Snippet } from "svelte";
    import { fade, fly } from "svelte/transition";

    let { title, children }: { title: string, children: Snippet } = $props();
</script>

<div class="overlay" transition:fade={{ duration: 300 }}></div>

<div class="wrapper">
    <div class="modal" transition:fly={{ y: "50vh" }}>
        <header>
            <h1>{ title }</h1>
            <button onclick={() => history.back()} aria-label="Close dialog"><CircleX size="32" /></button>
        </header>
        {@render children()}
    </div>
</div>

<style>
    header {
        display: grid;
        grid-template-columns: 1fr min-content;
        align-items: center;
    }

    header button {
        background-color: transparent;
        color: var(--error-color);
    }

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2;
        background-color: var(--menu-color);
        backdrop-filter: blur(5px);
        transition: 300ms opacity ease;
    }

    .wrapper {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 3;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }

    .modal {
        width: 100%;
        max-width: 32em;
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 20px;
        background-color: var(--secondary-background-color);
        border-radius: 15px;
    }
</style>