<script lang="ts">
    import type { Snippet } from "svelte";

    interface InfoItemProperties {
        name: string,
        Icon: any,
        children: Snippet
    }

    let { name, Icon = undefined, children }: InfoItemProperties = $props();
</script>

<section class="info-item">
    <header>
        <h3>
            <Icon />
            <span>{ name }</span>
        </h3>
    </header>
    <section class="items">
        {@render children()}
    </section>
</section>

<style>
    h3 {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 1em;
    }

    .info-item {
        display: contents;
    }

    .items {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
</style>