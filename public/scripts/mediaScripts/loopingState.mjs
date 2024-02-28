//LOOP MUSIC
export let loop = false;

export function changeLoopState() {
	if (loop) {
		loop = false;
	} else {
		loop = true;
	}
}
