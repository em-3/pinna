<script lang="ts">
    import type { EventHandler } from "svelte/elements";
    import type { PinnaUser } from "$lib/types/PinnaUser";
    import { CircleX } from "lucide-svelte";

    let { user = $bindable(), onremove = undefined }: { user: PinnaUser, onremove?: EventHandler } = $props();
</script>

<div class="user">
    <div class="user-info">
        <h4>{ user.displayName }</h4>
        {#if user.nickname}
        <div class="nickname">
            <p>a.k.a. "{user.nickname}"</p>
        </div>
        {/if}
        <p>{ user.username }</p>
    </div>
    <button class="remove" onclick={onremove}>
        <CircleX />
    </button>
</div>

<style>
    h4 {
        font-size: 1em;
    }

    button {
        padding: 0;
        background-color: transparent;
        color: var(--secondary-accent-color);
    }

    button:disabled {
        color: var(--tertiary-color);
    }

    button.remove {
        padding: 10px;
        background-color: transparent;
        color: var(--error-color);
    }

    /* input {
        padding: 5px 10px;
    } */

    .user {
        display: grid;
        grid-template-columns: 1fr min-content;
        align-items: center;
        padding: 10px;
        background-color: var(--background-color);
        border-radius: 15px;
    }

    .user-info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
    }

    @media (min-width: 64em) {
        .user-info {
            align-items: stretch;
        }
    }
</style>