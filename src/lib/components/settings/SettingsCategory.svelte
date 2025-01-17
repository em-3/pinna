<script lang="ts">
    import type { Icon as IconType } from "lucide-svelte";
    import type { Snippet } from "svelte";
    import RoundedSection from "../RoundedSection.svelte";

    let { name, id = undefined, Icon = undefined, children }: { name: string, id?: string, Icon?: typeof IconType, children: Snippet } = $props();
</script>

<RoundedSection title={name} {id} {Icon}>
    <div class="settings">
        {@render children()}
    </div>
</RoundedSection>

<style>
    .settings {
        display: grid;
        grid-template-columns: 1fr;
        gap: 20px;
        align-items: flex-start;
    }

    @media (min-width: 64em) {
        .settings {
            grid-template-columns: 1fr 2fr;
        }
    }
</style>