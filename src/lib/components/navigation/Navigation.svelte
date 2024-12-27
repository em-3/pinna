<script lang="ts">
    import { goto } from "$app/navigation";
    import { loadReportFromFile } from "$lib/stores/report.svelte";
    import { showErrorMessage } from "$lib/stores/error.svelte";
    import { BugPlay, FileInput, FilePlus2, Home, Settings } from "lucide-svelte";
    import NavLink from "./NavLink.svelte";
    import NavButton from "./NavButton.svelte";

    function loadReport() {
        loadReportFromFile()
        .then(() => {
            goto("/");
        })
        .catch((error: Error) => {
            showErrorMessage(error.message, "Error Opening Report");
        });
    }
</script>

<nav>
    <NavLink href="/" Icon={Home}>Home</NavLink>
    <NavButton Icon={FilePlus2}>New</NavButton>
    <NavButton onclick={loadReport} Icon={FileInput}>Load</NavButton>
    <NavLink href="/settings" Icon={Settings}>Settings</NavLink>
</nav>

<style>
    nav {
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 5px;
        padding: 5px;
        background-color: var(--menu-color);
        backdrop-filter: blur(20px);
        
        view-transition-name: navbar;
    }

    @media (min-width: 64em) {
        nav {
            position: static;
            display: inline-flex;
            justify-content: flex-start;
            width: initial;
        }
    }

    ::view-transition-group(navbar) {
        /* Fix for weird view transition stacking issues */
        /* https://www.nicchan.me/blog/view-transitions-and-stacking-context/ */
        z-index: 1;
    }

    ::view-transition-old(navbar) {
        /* Stop the old navbar from displaying at all */
        display: none;
    }

    ::view-transition-new(navbar) {
        /* Prevent the fade-in on the new navbar */
        animation: none;
    }
</style>