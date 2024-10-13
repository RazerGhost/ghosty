<script>
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import Themetoggle from '$lib/components/themetoggle.svelte';
</script>

<ModeWatcher />
<div class="flex flex-col">
    <div class=" absolute right-0 top-0 p-5">
        <Themetoggle />
    </div>
	<slot />
</div>
