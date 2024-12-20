<script lang="ts">
    import type { ReportData } from "$lib/types/ReportData";
    import Report from "$lib/components/report/Report.svelte";
    import Welcome from "$lib/components/Welcome.svelte";
    
    let loadedReport = undefined;

</script>

{#if loadedReport}
<Report data={ loadedReport }></Report>
{:else}
<Welcome></Welcome>
{/if}