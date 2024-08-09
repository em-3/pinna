// https://stackoverflow.com/a/39538518
function delay(time: number, val?: unknown) {
	return new Promise((resolve) => setTimeout(resolve, time, val));
}

export default delay;
