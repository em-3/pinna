<script lang="ts">
	import BackendCard from "./BackendCard.svelte";
</script>

<div class="fade-in flex size-full flex-col items-center justify-center gap-10">
	<div class="text-center">
		<h1 class="text-4xl font-bold text-black dark:text-white">Let's Get Started</h1>
		<h2 class="text-2xl text-black dark:text-white">Choose how you will access Jira</h2>
	</div>

	<div class="flex items-center justify-center gap-10">
		<BackendCard
			description="No setup required on the Jira server. Requires additional configuration on the client. Does not last between sessions."
			dest="setup/token"
			icon="ph:desktop-tower-duotone"
			recommended
			service="Browser Token"
		></BackendCard>
	</div>
</div>
