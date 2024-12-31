<script lang="ts">
    import type { Icon as IconType } from "lucide-svelte";
    import type { Component, Snippet } from "svelte";
    
    import { page } from "$app/state";

    
    let { href, Icon, children }: { href: string, Icon: typeof IconType, children: Snippet } = $props();
</script>

<div>
    <a {href} class:active={page.url.pathname == href}>
        <Icon />
        <span>{@render children()}</span>
    </a>
</div>

<style>
    div {
        display: flex;
        justify-content: center;
    }

    a {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        padding: 10px;
        text-decoration: none;
        color: var(--text-color);
        border-radius: 15px;
    }

    a::after {
        content: '';
        position: absolute;
        bottom: 5px;
        left: 0;
        right: 0;
        border-bottom: 3px solid var(--accent-color);
        transform-origin: center;
        transform: scaleX(0);
        transition: 300ms transform ease-out;
    }

    a.active::after {
        transform: scaleX(1);
    }

    @media (min-width: 64em) { 
        a {
            flex-direction: row;
            font-size: 0.75em;
        }
    }
</style>