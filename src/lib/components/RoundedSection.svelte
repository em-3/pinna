<script lang="ts">
    import type { Snippet } from "svelte";

    let { title, children, Icon = undefined }: { title: string, children: Snippet, Icon: any } = $props();
</script>

<div class="section">
    <header class="title">
        <Icon></Icon>
        <h2>{ title }</h2>
    </header>
    {@render children()}
</div>

<style>
    .section {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 20px;
        background-color: var(--secondary-background-color);
        border-radius: 25px;
    }

    .title {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        color: var(--accent-color);
    }
</style>