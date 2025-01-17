<script lang="ts">
    import type { Snippet } from "svelte";

    let { children }: { children: Snippet } = $props();
</script>

<h2>Jump to...</h2>
<div class="quick-links scroll-section">
    {@render children()}
</div>

<style>
    .quick-links {
        display: flex;
        white-space: nowrap;
        overflow-x: auto;
        gap: 10px;
    }

    @media (min-width: 64em) {
        .quick-links {
            flex-direction: column;
        }
    }
</style>