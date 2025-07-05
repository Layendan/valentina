<script lang="ts">
	import Sparkle from '$lib/components/Sparkle.svelte';
	import '../app.css';
	import '@fontsource/silkscreen';

	let { children } = $props();
</script>

<svelte:head>
	<title>VAL (Valentina's Automated Love)</title>
	<meta name="description" content="A decision-making tool for my girlfriend Valentina" />
	<link rel="icon" href="/favicon.png" />
	<link rel="apple-touch-icon" href="/128x128@2x.png" />
	<link rel="manifest" href="/manifest.webmanifest" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="theme-color" content="#769ECB" />
	<meta name="mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="default" />
	<meta name="msapplication-TileColor" content="#769ECB" />
	<meta name="msapplication-TileImage" content="/128x128@2x.png" />
	<meta name="application-name" content="VAL (Valentina's Automated Love)" />
	<meta name="apple-mobile-web-app-title" content="VAL (Valentina's Automated Love)" />
</svelte:head>

<main
	class="bg-base-100/30 z-10 container grid min-h-screen min-w-screen items-center justify-items-center p-4"
>
	{@render children()}
</main>

<Sparkle />
