onmessage = e => {
	if (!e.data) {
		return;
	}
	const { images } = e.data;
	images.forEach(img => {
		fetch(img.src, {
			method: 'GET',
			mode: 'no-cors',
			cache: 'default'
		})
			.then(response => {
				return response.blob();
			})
			.then(blob => postMessage({ src: img.src, blob }));
	});
};
