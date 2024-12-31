<script lang="ts" generics="T">
    import type { Icon as IconType } from "lucide-svelte";
    import type { Snippet } from "svelte";

    interface SettingsItemProperties {
        name: string;
        children: Snippet;
        Icon?: typeof IconType;
        description?: string;
    }

    let { name, children, Icon = undefined, description = undefined }: SettingsItemProperties = $props();
</script>

<section class="settings-item">
    <header>
        <h3>
            <Icon />
            <span>{ name }</span>
        </h3>
        {#if description}
        <p>{ description }</p>
        {/if}
    </header>
    <div class="contents">
        {@render children()}
    </div>
</section>

<style>
    header {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    h3 {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 1em;
    }

    p {
        font-size: 0.85em;
    }

    .settings-item {
        display: contents;
    }

    .contents {
        display: flex;
        flex-direction: column;
    }
</style>