<script lang="ts">
	import Heart from '$lib/components/Heart.svelte';
	import { createDecisionResponse, createResponse } from '$lib/response';

	let text = $state('');
	let request: string | null = $state(null);
	let decision = $state(true);
</script>

<article class="prose md:prose-xl">
	<h1 class="text-primary text-center">Valentina's Automated Love</h1>
	<p class="text-center">A decision-making tool for my girlfriend Valentina</p>

	{#if !request}
		<textarea
			class="textarea min-h-80 w-full"
			placeholder="What are your thoughts?"
			bind:value={text}
		></textarea>
		<div class="mt-1 grid w-full grid-cols-2 gap-1">
			<button
				class="btn btn-primary"
				onclick={() => {
					request = text;
					decision = true;
				}}
			>
				Make a Decision
			</button>
			<button
				class="btn btn-primary"
				onclick={() => {
					request = text;
					decision = false;
				}}>I'm Valing it</button
			>
		</div>
	{:else}
		<div class="bg-base-100 border-base-300 rounded-box border p-4">
			<p class="text-base">{request}</p>
		</div>
		<div class="divider my-2"><Heart /></div>
		<div class="bg-base-100 border-base-300 rounded-box border p-4">
			<p class="text-base">{decision ? createDecisionResponse() : createResponse()}</p>
		</div>
		<button
			class="btn btn-error mt-1 w-full"
			onclick={() => {
				request = null;
				decision = true;
			}}>Reset</button
		>
	{/if}
</article>
