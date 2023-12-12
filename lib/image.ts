export function svgToBlob(image: HTMLImageElement, fileName: string = "svg_blob.svg") {
  return fetch(image.src).then(async (response) => {
    const blob = await response.blob();
    return new Blob([blob], { type: blob.type })
  });
}
