<script lang="ts">
	import Heart from '$lib/components/Heart.svelte';
	import { createResponse } from '$lib/response';

	let text = $state('');
	let request: string | null = $state(null);
</script>

<article class="prose md:prose-xl">
	<h1 class="text-center text-blue-400 saturate-50 dark:text-blue-200">Valentina Decision Maker</h1>
	<p class="text-center">A decision-making tool for my girlfriend Valentina</p>

	{#if !request}
		<textarea
			class="textarea min-h-80 w-full"
			placeholder="What are your thoughts?"
			bind:value={text}
		></textarea>
		<button class="btn btn-primary mt-1 w-full" onclick={() => (request = text)}>Save</button>
	{:else}
		<div class="bg-base-100 border-base-300 rounded-box border p-4">
			<p>{request}</p>
		</div>
		<div class="divider"><Heart /></div>
		<div class="bg-base-100 border-base-300 rounded-box border p-4">
			<p>{createResponse()}</p>
		</div>
		<button class="btn btn-error mt-4 w-full" onclick={() => (request = null)}>Reset</button>
	{/if}
</article>
