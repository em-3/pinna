<script lang="ts">
	export let name: string;
	export let value: string = "";
	export let domainValid: boolean = false;

	$: propName = name.toLowerCase().replace(" ", "-");

	//https://stackoverflow.com/a/26093611
	$: domainValid = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/g.test(value);
</script>

<div class="flex flex-col gap-4 rounded-lg p-4 even:bg-gray-100">
	<label class="font-bold" for={propName}>{name}</label>
	<p class="text-slate-500">
		<slot></slot>
	</p>
	<p
		aria-hidden={!domainValid}
		class="text-red-500 opacity-0 transition-opacity {domainValid ? '' : 'opacity-100'}"
	>
		Error: Invalid domain
	</p>
	<input
		autocomplete="off"
		bind:value
		class="rounded-xl border-2 border-solid border-slate-500 p-2"
		id={propName}
		name={propName}
		type="text"
	/>
</div>
