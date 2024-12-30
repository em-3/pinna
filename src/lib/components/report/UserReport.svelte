<script lang="ts">
    import type { UserReport } from "$lib/types/ReportData";
    import type { UserSummary } from "$lib/types/ReportSummary";

    import { CircleCheck, CircleDot, CircleAlert, CircleDashed, CircleFadingArrowUp } from "lucide-svelte";
    import CategoryReport from "./CategoryReport.svelte";
    import SummaryGrid from "$lib/components/report/summary/SummaryGrid.svelte";
    import SummaryItem from "$lib/components/report/summary/SummaryItem.svelte";
    import { formatHours } from "$lib/utils";

    let { id = undefined, userData, summary }: { id: any, userData: UserReport, summary: UserSummary } = $props();
</script>

<section { id }>
    <header>
        <h1>Report for { userData.name }</h1>
    </header>
    <SummaryGrid>
        <SummaryItem total={formatHours(summary.totalSeconds)} name="Hours Spent" />
        <SummaryItem total={summary.data.reviewed.totalPoints} name="Reviewed Points" />
        <SummaryItem total={summary.data.developed.totalPoints} name="Developed Points" />
        <SummaryItem total={summary.combinedPoints} name="Combined Points" />
    </SummaryGrid>
    <div class="report-grid">
        <CategoryReport name="Reviewed" issues={userData.data.reviewed} summary={ summary.data.reviewed } Icon={CircleCheck}></CategoryReport>
        <CategoryReport name="Developed" issues={userData.data.developed} summary={ summary.data.developed } Icon={CircleDot}></CategoryReport>
        <CategoryReport name="Unassigned" issues={userData.data.unassigned} summary={ summary.data.unassigned } Icon={CircleDashed}></CategoryReport>
    </div>
</section>

<style>
    section, .report-grid {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
</style>