onmessage = e => {
	if (!e.data) {
		return;
	}
	const images = e.data;
	images.forEach(img => {
		const xhr = new XMLHttpRequest();
		xhr.responseType = 'blob';
		const onLoad = data => {
			if (xhr.readyState == 4 && xhr.status == 200) {
				postMessage({ src: img.src, blob: xhr.response });
			}
		};
		xhr.onload = onLoad;
		xhr.open('GET', img.src, true);
		xhr.send();
	});
};
