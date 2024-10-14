<script>
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import Themetoggle from '$lib/components/themetoggle.svelte';
</script>

<ModeWatcher />
<div class="flex flex-col">
	<div class="flex justify-end p-6 xl:absolute xl:right-0 xl:top-0">
		<Themetoggle />
	</div>
	<slot />
</div>
