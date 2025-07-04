<script lang="ts">
	import Heart from '$lib/components/Heart.svelte';
	import { createResponse } from '$lib/response';

	let text = $state('');
	let request: string | null = $state(null);
</script>

<article class="prose prose-xl">
	<h1>Valentina Decision Maker</h1>
	<p>A decision-making tool for my girlfriend Valentina</p>

	{#if !request}
		<fieldset class="fieldset bg-base-200 border-base-300 rounded-box border p-4">
			<legend class="fieldset-legend text-lg">Share your thoughts</legend>
			<textarea
				class="textarea min-h-80 w-full"
				placeholder="What are your thoughts?"
				bind:value={text}
			></textarea>
			<button class="btn btn-primary w-full" onclick={() => (request = text)}>Save</button>
		</fieldset>
	{:else}
		<fieldset class="fieldset bg-base-200 border-base-300 rounded-box border p-4">
			<legend class="fieldset-legend text-lg">Your thoughts</legend>
			<div class="bg-base-100 border-base-300 rounded-box border p-4">
				<p>{request}</p>
			</div>
			<div class="divider my-0"><Heart /></div>
			<div class="bg-base-100 border-base-300 rounded-box border p-4">
				{#await createResponse()}
					<p>Loading...</p>
				{:then response}
					<p>{response}</p>
				{/await}
			</div>
			<button class="btn btn-error mt-4 w-full" onclick={() => (request = null)}>Reset</button>
		</fieldset>
	{/if}
</article>
