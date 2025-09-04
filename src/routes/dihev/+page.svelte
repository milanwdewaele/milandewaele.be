<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let days = 0;
	let hours = 0;
	let minutes = 0;
	let seconds = 0;

	const startDate = new Date('2025-07-05T19:15:00');

	function updateCounter() {
		const now = new Date();
		const diffMs = Number(now) - Number(startDate);
		days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
		hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
		minutes = Math.floor((diffMs / (1000 * 60)) % 60);
		seconds = Math.floor((diffMs / 1000) % 60);
	}

	$: months = Math.floor(days / 30);

	let interval: ReturnType<typeof setInterval>;
	onMount(() => {
		updateCounter();
		interval = setInterval(updateCounter, 1000);
		return () => clearInterval(interval);
	});
</script>

<div class="container">
	<div class="mb-6 text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
		Damn, ik heb <br />(al {months} maand{months === 1 ? '' : 'en'})<br /> een vriend.
	</div>
	<div class="max-w-[600px] italic text-neutral-500 md:text-xl">
		Bedankt Maxim. Je bent de beste. &lt;3  
	</div>
	<div class="counter bg-card border">
		<span class="unit">
			{#key days}
				<span class="unit-value" transition:fade>{days}</span>
			{/key}
			<span class="unit-label">dagen</span>
		</span>
		<span class="unit">
			{#key hours}
				<span class="unit-value" transition:fade>{hours}</span>
			{/key}
			<span class="unit-label">uur</span>
		</span>
		<span class="unit">
			{#key minutes}
				<span class="unit-value" transition:fade>{minutes}</span>
			{/key}
			<span class="unit-label">minuten</span>
		</span>
		<span class="unit">
			{#key seconds}
				<span class="unit-value" transition:fade>{seconds}</span>
			{/key}
			<span class="unit-label">seconden</span>
		</span>
	</div>
</div>

<style>
	.counter {
		display: flex;
		flex-direction: column;
		width: auto;
		gap: 0.5em;
		font-size: clamp(2.5em, 10vw, 8em);
		font-weight: 700;
		letter-spacing: 3px;
		margin-top: 10px;
		border-radius: 0.75rem;
		padding: 0.5em 1em;
		user-select: none;
		align-items: center;
	}
	.unit {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		overflow: hidden;
		height: 1.5em;
		position: relative;
	}
	.unit-label {
		font-size: 0.3em;
		font-weight: 400;
		opacity: 0.7;
		margin-top: 10px;
		bottom: 0px;
		letter-spacing: 0.5px;
		position: absolute;
	}
</style>
