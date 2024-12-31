<script lang="ts">
    import type { PinnaUser } from "$lib/types/PinnaUser";
    import type { SettingsComponent } from "$lib/types/properties/SettingsComponent";

    import { Ghost } from "lucide-svelte";
    import { flip } from "svelte/animate";
    import User from "./User.svelte";

    let { value: users = $bindable(), dirty = $bindable(), valid = $bindable(false) }: SettingsComponent<PinnaUser[]> = $props();

    let currentUsername: string = $state("");

    $effect(() => {
        valid = users.length > 0;
    });

    function addUser() {
        // TODO: Add API lookup for user info
        // For now, we're just settings everything to username, which should work temporarily
        const username = $state.snapshot(currentUsername);

        users.push({
            id: username,
            displayName: username,
            username
        });

        currentUsername = "";

        dirty = true;
    }

    function removeUser(index: number) {
        users.splice(index, 1);

        dirty = true;
    }
</script>

<section class="user-select">
    <div class="controls">
        <input type="text" placeholder="Enter a Jira username..." bind:value={currentUsername}>
        <button onclick={addUser} disabled={currentUsername.length == 0}>Add</button>
    </div>
    {#if users.length > 0}
        <div class="users">
                {#each users as user, index (user.id) }
                    <div class="user-wrapper" animate:flip={{ duration: 300 }}>
                        <User bind:user={users[index]} onremove={() => removeUser(index)} />
                    </div>
                {/each}
        </div>
    {:else}
        <div class="empty-message">
            <Ghost size="48" />
            <p>No users selected</p>
        </div>
    {/if}
</section>

<style>

    .user-select {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px;
        border: 1px solid var(--tertiary-color);
        border-radius: 15px;
    }

    .controls {
        display: grid;
        grid-template-columns: 1fr min-content;
        gap: 10px;
    }

    .users {
        display: grid;
        grid-template-columns: 1fr;
        gap: 10px;
        border-radius: 15px;
    }

    .user-wrapper {
        display: contents;
    }

    .empty-message {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }

    @media (min-width: 64em) {
        .users {
            grid-template-columns: 1fr 1fr;
        }
    }
</style>