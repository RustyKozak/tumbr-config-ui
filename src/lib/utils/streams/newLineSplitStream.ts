export function createLineSplitStream() {
  let buffer = '';

  const transform = (chunk: any, controller: TransformStreamDefaultController) => {
    const decodedChunk = new TextDecoder().decode(chunk, { stream: true });

    buffer += decodedChunk;

    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';

    for (const line of lines) {
      controller.enqueue(line);
    }
  }

  const flush = (controller: TransformStreamDefaultController) => {
    if (buffer?.length) {
      controller.enqueue(buffer)
    }
  }

  return new TransformStream({
    transform,
    flush
  })
}
