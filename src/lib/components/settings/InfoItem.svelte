<script lang="ts">
    import type { Icon as IconType } from "lucide-svelte";
    import type { Snippet } from "svelte";

    interface InfoItemProperties {
        name: string,
        Icon: typeof IconType | null,
        children: Snippet
    }

    let { name, Icon = null, children }: InfoItemProperties = $props();
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
        align-items: flex-start;
        gap: 10px;
    }
</style>