<script lang="ts">
	export let href: string;
	export let icon: string;
	export let name: string;
	export let clientHeight: number = 0;
</script>

<a bind:clientHeight class="flex items-center gap-2 p-4" {href}>
	<iconify-icon {icon}></iconify-icon>
	{name}
</a>
