<script lang="ts">
    import { loadReportFromFile, showReportModal } from "$lib/stores/report.svelte";
    import { showErrorMessage } from "$lib/stores/error.svelte";
    import { FileInput, FilePlus2 } from "lucide-svelte";

    function loadReport() {
        loadReportFromFile().catch((error: Error) => {
            showErrorMessage(error.message, "Error Opening Report");
        });
    }
</script>

<section class="welcome">
    <picture>
        <source srcset="/pinna-dark.svg" media="(prefers-color-scheme: dark)">
        <img src="/pinna.svg" alt="Pinna Logo" aria-hidden="true" width="256">
    </picture>
    <h1>Welcome to Pinna!</h1>
    <div class="quick-actions">
        <button onclick={() => showReportModal()}><FilePlus2 />New</button>
        <button onclick={loadReport}><FileInput />Load</button>
    </div>
</section>

<style>
    .welcome {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 10px;
        margin-top: 30px;
    }

    .quick-actions {
        display: flex;
        gap: 10px;
    }
</style>