<script lang="ts">    
    import { reportStore } from "$lib/report.svelte";
    import Report from "$lib/components/report/Report.svelte";
    import Welcome from "$lib/components/Welcome.svelte";
</script>

{#if reportStore.report}
<Report data={ reportStore.report }></Report>
{:else}
<Welcome></Welcome>
{/if}