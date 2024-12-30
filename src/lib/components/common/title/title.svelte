<script lang="ts">
	import BaseData from '$lib/data/base';

	export let title = 'Title';
</script>

<svelte:head>
	<title>{`${title} - ${BaseData.fullName}`}</title>
</svelte:head>
