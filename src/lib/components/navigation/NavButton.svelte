<script lang="ts">
    import type { Icon as IconType } from "lucide-svelte";
    import type { Snippet } from "svelte";
    import type { MouseEventHandler } from "svelte/elements";

    let { onclick = undefined, Icon, children }: { onclick?: MouseEventHandler<HTMLButtonElement>, Icon: typeof IconType, children: Snippet } = $props();
</script>

<button {onclick}>
    <Icon />
    <span>{@render children()}</span>
</button>

<style>
    button {
        flex-direction: column;
        padding: 10px;
        background-color: transparent;
        color: var(--text-color);
    }

    @media (min-width: 64em) { 
        button {
            flex-direction: row;
            font-size: 0.75em;
        }
    }
</style>