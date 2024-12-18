<script>
    import { CircleCheck, CircleDot, CircleAlert, CircleDashed, CircleFadingArrowUp } from "lucide-svelte";
    import ReportTable from "./IssuesTable.svelte";

    let { name, reviewed, developed, changesRequested, unassigned, inProgress } = $props();
</script>

<section>
    <header>
        <h1>Report for { name }</h1>
    </header>
    <div class="report-grid">
        <ReportTable name="Reviewed" issues={reviewed} Icon={CircleCheck}></ReportTable>
        <ReportTable name="Developed" issues={developed} Icon={CircleDot}></ReportTable>
        <ReportTable name="Changes Requested" issues={changesRequested} Icon={CircleAlert}></ReportTable>
        <ReportTable name="Unassigned" issues={unassigned} Icon={CircleDashed}></ReportTable>
        <ReportTable name="In Progress" issues={inProgress} Icon={CircleFadingArrowUp}></ReportTable>
    </div>
</section>

<style>
    section {
        margin: 0 10px;
    }

    header {
        color: var(--accent-color);
        margin-bottom: 25px;
    }

    .report-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 20px;
    }

    @media (min-width: 64em) {
        .report-grid {
            grid-template-columns: 1fr 1fr;
        }
    }

    @media (min-width: 80em) {
        .report-grid {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }
</style>