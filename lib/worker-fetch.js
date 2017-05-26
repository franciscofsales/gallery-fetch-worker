onmessage = e => {
	if (!e.data) {
		return;
	}
	const { images } = e.data;
	images.forEach(img => {
		fetch(img.src, {
			method: 'GET',
			cache: 'default'
		})
			.then(response => response.blob())
			.t`hen(blob => postMessage({ src: img.src, blob }));
	});
};
