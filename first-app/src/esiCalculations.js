// xParam:
// [0] radius
// [1] density
// [2] escape velocity
// [3] mean temperature
export function countEsi(xParam) {
	console.log('--countEsi--');
	console.log(xParam);

	const N = 4;
	const xEarth = [
		6371,
		5.51,
		1,
		288,
	];
	const w = [
		0.57,
		1.07,
		0.7,
		5.58,
	];

	let esi = 1;
	for (let i = 0; i < N; i++) {
		esi *= Math.pow((1 - Math.abs((xParam[i] - xEarth[i]) / (xParam[i] + xEarth[i]))), (w[i] / N));
	}

	console.log('esiCount = ' + esi * 100);
	return esi * 100;
}