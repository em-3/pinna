<script lang="ts">
    import type { Snippet } from "svelte";
    import RoundedSection from "../RoundedSection.svelte";

    let { name, Icon = undefined, children }: { name: string, Icon: any, children: Snippet } = $props();
</script>

<RoundedSection title={name} {Icon}>
    <div class="settings">
        {@render children()}
    </div>
</RoundedSection>

<style>
    .settings {
        display: grid;
        grid-template-columns: 1fr;
        gap: 20px;
        align-items: center;
    }

    @media (min-width: 64em) {
        .settings {
            grid-template-columns: 1fr 2fr;
        }
    }
</style>