//PLAY MUSIC
export let playing = false;

export function changePlayState() {
	if (playing) {
		playing = false;
	} else {
		playing = true;
	}
}
