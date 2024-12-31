<script lang="ts">
    import type { Icon as IconType } from "lucide-svelte";
    import type { Snippet } from "svelte";

    let { title, children, Icon = undefined }: { title: string, children: Snippet, Icon?: typeof IconType } = $props();
</script>

<section class="section">
    <header class="title">
        <Icon />
        <h2>{ title }</h2>
    </header>
    {@render children()}
</section>

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