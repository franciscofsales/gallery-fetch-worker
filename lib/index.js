
const worker = new Worker('./worker.js');
worker.onmessage = (e) => {
	const [id, src] = e.data;

  // process src / id / index

};


// input data
const images = Array.from(
	document.querySelectorAll('[data-image-src]')
).map(img => ({ id: img.id, src: img.getAttribute('data-image-src') }));


worker.postMessage(images);
