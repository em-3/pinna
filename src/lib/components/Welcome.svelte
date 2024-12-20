<script lang="ts">
    import { FileInput, FilePlus2 } from "lucide-svelte";
</script>

<section class="welcome">
    <picture>
        <source srcset="/pinna-dark.svg" media="(prefers-color-scheme: dark)">
        <img src="/pinna.svg" alt="Pinna Logo" aria-hidden="true" width="256">
    </picture>
    <h1>Welcome to Pinna!</h1>
    <div class="quick-actions">
        <button><FilePlus2 />New</button>
        <button><FileInput />Load</button>
    </div>
</section>

<style>
    .welcome {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 10px;
        transform: translateY(-30px);
    }

    .quick-actions {
        display: flex;
        gap: 10px;
    }
</style>