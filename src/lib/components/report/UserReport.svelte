<script lang="ts">
    import type { UserReport } from "$lib/types/PinnaReport";
    import type { UserSummary } from "$lib/types/ReportSummary";

    import { CircleCheck, CircleDot, CircleDashed } from "lucide-svelte";
    import CategoryReport from "./CategoryReport.svelte";
    import SummaryGrid from "$lib/components/report/summary/SummaryGrid.svelte";
    import SummaryItem from "$lib/components/report/summary/SummaryItem.svelte";
    import { formatHours } from "$lib/utils";

    let { id = null, userData, summary }: { id: any, userData: UserReport, summary: UserSummary } = $props();
</script>

<section { id }>
    <header>
        <h1>Report for { userData.user.nickname ?? userData.user.displayName }</h1>
    </header>
    <SummaryGrid>
        <SummaryItem total={formatHours(summary.totalSeconds)} name="Hours Spent" />
        <SummaryItem total={summary.categories.reviewed.totalPoints} name="Reviewed Points" />
        <SummaryItem total={summary.categories.developed.totalPoints} name="Developed Points" />
        <SummaryItem total={summary.combinedPoints} name="Combined Points" />
    </SummaryGrid>
    <div class="report-grid">
        <CategoryReport name="Reviewed" issues={userData.issues.reviewed} summary={ summary.categories.reviewed } Icon={CircleCheck}></CategoryReport>
        <CategoryReport name="Developed" issues={userData.issues.developed} summary={ summary.categories.developed } Icon={CircleDot}></CategoryReport>
        <CategoryReport name="Unassigned" issues={userData.issues.unassigned} summary={ summary.categories.unassigned } Icon={CircleDashed}></CategoryReport>
    </div>
</section>

<style>
    section, .report-grid {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
</style>