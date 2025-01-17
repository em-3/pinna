<script lang="ts">
    import { goto } from "$app/navigation";
    import { loadReportFromFile, showReportModal } from "$lib/stores/report.svelte";
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
    <NavButton onclick={() => showReportModal()} Icon={FilePlus2}>New</NavButton>
    <NavButton onclick={loadReport} Icon={FileInput}>Load</NavButton>
    <NavLink href="/settings" Icon={Settings}>Settings</NavLink>
</nav>

<style>
    nav {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 5px;
        padding: 5px;
        
        view-transition-name: navbar;
    }

    @media (min-width: 64em) {
        nav {
            display: flex;
            justify-content: flex-start;
        }
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