<script lang="ts">
    import type { Snippet } from "svelte";

    let { sidebarContent, mainContent }: { sidebarContent: Snippet, mainContent: Snippet } = $props();
</script>

<section class="sidebar-section">
    <div class="sidebar-wrapper">
        <section class="sidebar-content">
            {@render sidebarContent()}
        </section>
    </div>
    <section class="main-content scroll-section">
        {@render mainContent()}
    </section>
</section>

<style>
    .sidebar-section {
        display: grid;
        grid-template-columns: 1fr;
        overflow: hidden;
    }

    .sidebar-wrapper, .sidebar-wrapper section {
        overflow: hidden;
    }

    .sidebar-wrapper section {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .sidebar-content {
        padding: 10px;
    }

    .main-content {
        display: flex;
        flex-direction: column;
    }

    .main-content {
        overflow-y: auto;
    }

    @media (min-width: 64em) {
        .sidebar-section {
            grid-template-columns: 1fr 5fr 1fr;
        }
    }
</style>