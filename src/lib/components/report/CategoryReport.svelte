<script lang="ts">
    import type { Worklog } from "$lib/types/ReportData";
    import type { CategorySummary } from "$lib/types/ReportSummary";

    import { Ghost } from "lucide-svelte";
    import { formatHoursMinutes } from "$lib/formattedTime";

    let { name, worklogs, summary, Icon = undefined }: { name: string, worklogs: Worklog[], summary: CategorySummary, Icon: any } = $props();
</script>

<div class="report-table">
    <div class="title">
        <Icon></Icon>
        <h2>{ name }</h2>
    </div>
    {#if worklogs.length > 0}
    <table>
        <thead>
            <tr>
                <th scope="col">Issue ID</th>
                <th scope="col">Name</th>
                <th scope="col">Story Points</th>
                <th scope="col">Time Spent</th>
            </tr>
        </thead>
        <tbody>
            {#each worklogs as issue (issue.id)}
            <tr>
                <th scope="row">{ issue.id }</th>
                <td class="name">{ issue.name }</td>
                <td>{ issue.storyPoints }</td>
                <td>{ formatHoursMinutes(issue.seconds) }</td>
            </tr>
            {/each}
        </tbody>
        <tfoot>
            <tr>
                <th scope="row" style="grid-column: span 2;">Total</th>
                <td>{ summary.totalPoints }</td>
                <td>{ formatHoursMinutes(summary.totalSeconds) }</td>
            </tr>
        </tfoot>
    </table>
    {:else}
    <!-- Display a special message if there's no values in the table data -->
    <div class="empty-message">
        <Ghost size="48"></Ghost>
        <p>There's no data for this category</p>
    </div>
    {/if}
</div>

<style>
    .report-table {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 20px;
        background-color: var(--secondary-background-color);
        border-radius: 25px;
    }

    .title {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        color: var(--accent-color);
    }

    .empty-message {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        font-weight: normal;
        font-size: 1em;
    }

    table {
        display: grid;
        grid-template-columns: 3fr 3fr 2fr 2fr;
    }

    thead, tbody, tfoot, tr {
        display: contents;
    }

    th, td {
        padding: 10px;
        word-break: break-word;
        text-align: left;
        align-content: center;
        transition: ease-in 0.2s background-color;
    }

    td.name {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    tbody th, tbody td {
        border-bottom: 1px solid var(--tertiary-color);
    }

    th:not(:last-child), td:not(:last-child) {
        border-right: 1px solid var(--tertiary-color);
    }

    thead th,
    tbody tr:last-child th,
    tbody tr:last-child td {
        border-bottom: 3px solid var(--tertiary-color);
    }

    @media (min-width: 40em) {
        table {
            grid-template-columns: 2fr 4fr 1fr 1fr;
        }
    }

    @media (min-width: 64em) {
        table {
            grid-template-columns: 3fr 3fr 2fr 2fr;
        }
    }
</style>