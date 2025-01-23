<script lang="ts">
	import { createLineSplitStream } from '$lib/utils/streams/newLineSplitStream';

	async function handleFileDrop(event: Event) {
		console.log('Starting file drop');
		event.preventDefault();

		const e = event as any;
		// for(const f of e?.dataTransfer ?? []) {
		//   const fi = f as DataTransferItem
		//   const file = await fi.getAsFile()?.text()
		//   console.log(file)
		// }
		const data = e.dataTransfer.files[0] as File;
		const stream = data.stream();

		const lineSplitTransformStream = createLineSplitStream();
		const lineStream = stream.pipeThrough(lineSplitTransformStream);

		for await (const chunk of lineStream) {
			console.log('Chunk:', { chunk });
		}
	}

	function handleFileDragOver(event: Event) {
		event.preventDefault();
	}
</script>

<div
	role="textbox"
	tabindex="0"
	class="flex h-full w-full flex-row justify-center rounded-md border-2 border-black"
	ondrop={(event: Event) => handleFileDrop(event)}
	ondragover={(event: Event) => handleFileDragOver(event)}
>
	Drop Files Here
</div>
