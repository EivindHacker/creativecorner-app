//["All", "Pop", "HipHop", "Trap", "EDM", "RnB", "House", "Rock", "Country", "Cinematic", "Classical", "World"];

//Endre alle kits til og legge til Type. Og deretter sortere etter type.

export const kits = [
	{
		type: "kit",
		title: "24k Gold",
		creator: "Edvyn",
		series: "Edvyn Beats Vol 1",
		genre: "Hip Hop",
		bpm: 142,
		key: "A Major",
		tags: ["24k Golden", "Happy", "Dreamy"],
		hot: false,
		price: 2,
		discount: 1,
		stems: ["lead", "bass", "guitar", "drums"],
		startStems: [true, true, true, true],
	},
	/*
	{
		type: "instrumental",
		title: "Lofi Chill",
		creator: "ChillMasta",
		series: "Edvyn Beats Vol 1",
		genre: "House",
		bpm: 90,
		key: "C minor",
		tags: ["Chill", "Relaxing", "Mellow"],
		hot: true,
		price: 1,
		discount: 0,
		stems: [null],
		startStems: [null],
	},
	*/
	{
		type: "kit",
		title: "Careless Whiskey",
		genre: "HipHop",
		key: "A Minor",
		bpm: 145,
		creator: "Edvyn",
		tags: ["Romantic", "Sexy", "Trap"],
		stems: ["lead", "bass", "melody", "drums"],
		startStems: [true, true, true, true],
		hot: false,
		price: 2, //$
		discount: 1,
		series: "Edvyn Beats Vol 1",
	},
	{
		type: "kit",
		title: "Step Outside",
		genre: "Pop",
		key: "C Major",
		bpm: 115,
		creator: "EDVYN",
		tags: ["Sweet", "Relaxing", "Cute"],
		tags: ["Romantic", "Sexy", "Trap"],
		stems: ["lead", "bass", "melody", "drums"],
		startStems: [true, true, true, true],
		hot: false,
		price: 10, //$
		discount: 0, //$
		series: "Edvyn Beats Vol 1",
	},
	{
		type: "kit",
		title: "Sunday Flowers",
		genre: "Pop",
		key: "C Minor",
		bpm: 130,
		creator: "EDVYN",
		tags: ["Guitar", "Summer", "Happy"],
		stems: ["lead", "bass", "melody", "drums"],
		startStems: [true, true, true, true],
		hot: true,
		price: 15, //$
		discount: 0, //$
		series: "Edvyn Beats Vol 1",
	},
	{
		type: "kit",
		title: "Dehli",
		creator: "Maybon",
		genre: "World",
		bpm: 95,
		key: "F# Minor",
		series: "Edvyn Beats Vol 1",
		tags: ["Asia", "Indian", "Sitar"],
		price: 9, //$
		discount: 0, //$
		stems: ["lead", "bass", "melody", "drums"],
		startStems: [true, true, true, true],
		hot: true,
	},
	{
		type: "kit",
		title: "Trapped In Asia",
		genre: "Pop",
		key: "B Major",
		bpm: 95,
		creator: "Maybon",
		tags: ["Flume", "Asia", "Glitch"],
		stems: ["lead", "bass", "melody", "drums"],
		startStems: [true, true, true, true],
		hot: false, //Leave on false.
		price: 0, //$
		discount: 0, //$
		series: "Edvyn Beats Vol 1",
	},
	{
		type: "kit",
		title: "Astrotype",
		genre: "Trap",
		key: "B Major",
		bpm: 95,
		creator: "EDVYN",
		tags: ["Travis Scott", "Dark", "Synth"],
		stems: ["lead", "bass", "melody", "drums"],
		startStems: [true, true, true, false],
		hot: false,
		price: 10, //$
		discount: 5, //$
		series: "Edvyn Beats Vol 1",
	},
	{
		type: "kit",
		title: "Need4Speed",
		genre: "Trap",
		key: "G# Minor",
		bpm: 90,
		creator: "Maybon",
		tags: ["Gangster", "OG", "Old School"],
		stems: ["lead", "bass", "melody", "drums"],
		startStems: [true, true, true, true],
		hot: true,
		price: 15, //$
		discount: 8, //$
		series: "Edvyn Beats Vol 1",
	},
	{
		type: "kit",
		title: "Stars",
		genre: "Pop",
		key: "A Major",
		bpm: 122,
		creator: "EDVYN",
		tags: ["Travis Scott", "Dark", "Synth"],
		stems: ["lead", "bass", "melody", "drums"],
		startStems: [true, true, true, true],
		hot: false,
		price: 9, //$
		discount: 0, //$
		series: "Edvyn Beats Vol 1",
	},
	{
		type: "kit",
		title: "Evening Of Fire",
		genre: "Pop",
		key: "F Major",
		bpm: 155,
		creator: "EDVYN",
		tags: ["Travis Scott", "Dark", "Synth"],
		stems: ["percussion", "bass", "melody", "drums"],
		startStems: [false, true, true, true],
		hot: false,
		price: 15, //$
		discount: 0, //$
		series: "Edvyn Beats Vol 1",
	},
	{
		type: "kit",
		title: "Expressive Empathy",
		genre: "Cinematic",
		key: "C Major",
		bpm: 140,
		creator: "EDVYN",
		tags: ["Travis Scott", "Dark", "Synth"],
		stems: ["lead", "bass", "melody", "drums"],
		startStems: [true, true, true, true],
		hot: true,
		price: 20, //$
		discount: 0, //$
		series: "Edvyn Beats Vol 1",
	},
	{
		type: "kit",
		title: "Schoolboi",
		genre: "Pop",
		key: "C Major",
		bpm: 140,
		creator: "EDVYN",
		tags: ["Modern", "Playfull", "Happy"],
		stems: ["lead", "bass", "melody", "drums"],
		startStems: [true, true, true, true],
		hot: false,
		price: 15, //$
		discount: 0, //$
		series: "Edvyn Beats Vol 1",
	},
	{
		type: "kit",
		title: "Darkness",
		genre: "EDM",
		key: "F# Minor",
		bpm: 115,
		creator: "Maybon",
		tags: ["Dark", "Synth", "Epic"],
		stems: ["lead", "bass", "melody", "drums"],
		startStems: [true, true, true, true],
		hot: false,
		price: 10, //$
		discount: 5, //$
		series: "Edvyn Beats Vol 1",
	},
	{
		type: "kit",
		title: "Organico",
		genre: "World",
		key: "Db Major",
		bpm: 100,
		creator: "EDVYN",
		tags: ["Mysterious", "Acoustic", "Dark"],
		stems: ["lead", "bass", "melody", "drums"],
		startStems: [true, true, true, true],
		hot: false,
		price: 5, //$
		discount: 0, //$
		series: "Edvyn Beats Vol 1",
	},
	{
		type: "kit",
		title: "Addicted",
		genre: "Pop",
		key: "Bb Minor",
		bpm: 90,
		creator: "EDVYN",
		tags: ["Diry", "Dark", "Bad"],
		stems: ["lead", "bass", "melody", "drums"],
		startStems: [true, true, true, true],
		hot: false,
		price: 10, //$
		discount: 0, //$
		series: "Edvyn Beats Vol 1",
	},
	{
		type: "kit",
		title: "Starlight",
		genre: "Pop",
		key: "F Major",
		bpm: 112,
		creator: "EDVYN",
		tags: ["Big", "Dreamy", "Røyksopp"],
		stems: ["lead", "bass", "melody", "drums"],
		startStems: [true, true, true, true],
		hot: false,
		price: 10, //$
		discount: 0, //$
		series: "Edvyn Beats Vol 1",
	},
	{
		type: "kit",
		title: "Lofi God_1",
		genre: "HipHop",
		key: "F# Minor",
		bpm: 170,
		creator: "EDVYN",
		tags: ["Lofi", "Chill", "Sexy"],
		stems: ["lead", "bass", "melody", "drums"],
		startStems: [true, true, true, true],
		hot: false,
		price: 10, //$
		discount: 0, //$
		series: "Edvyn Beats Vol 1",
	},
	{
		type: "kit",
		title: "Gameboi",
		genre: "EDM",
		key: "F Major",
		bpm: 150,
		creator: "EDVYN",
		tags: ["8-bit", "Game", "Arcade"],
		stems: ["lead", "bass", "melody", "drums"],
		startStems: [true, true, true, true],
		hot: false,
		price: 10, //$
		discount: 0, //$
		series: "Edvyn Beats Vol 1",
	},
	{
		type: "kit",
		title: "What",
		genre: "EDM",
		key: "C Major",
		bpm: 110,
		creator: "Maybon",
		tags: ["Glitch", "Electronic", "Dreamy"],
		stems: ["lead", "bass", "melody", "drums"],
		startStems: [true, true, true, true],
		hot: false,
		price: 10, //$
		discount: 0, //$
		series: "Edvyn Beats Vol 1",
	},

	{
		type: "kit",
		title: "Eivinds Beats vol1",
		genre: "EDM",
		key: "C Major",
		bpm: 110,
		creator: "Maybon",
		tags: ["Sample Pack", "EDM", "Electronic"],
		stems: ["lead", "bass", "melody", "drums"],
		startStems: [true, true, true, true],
		hot: false,
		price: 10, //$
		discount: 0, //$
		series: "Edvyn Beats Vol 1",
	},
	{
		type: "kit",
		title: "Instrumental Test",
		genre: "Cinematic",
		key: "C Major",
		bpm: 110,
		creator: "Maybon",
		tags: ["Instrumental", "EDM", "Electronic"],
		stems: ["lead", "bass", "melody", "drums"],
		startStems: [true, true, true, true],
		hot: false,
		price: 10, //$
		discount: 0, //$
		series: "Edvyn Beats Vol 1",
	},
	{
		type: "kit",
		title: "Preset Pack",
		genre: "Cinematic",
		key: "C Major",
		bpm: 110,
		creator: "Maybon",
		tags: ["Preset Pack", "EDM", "Electronic"],
		stems: ["lead", "bass", "melody", "drums"],
		startStems: [true, true, true, true],
		hot: false,
		price: 10, //$
		discount: 0, //$
		series: "Edvyn Beats Vol 1",
	},
];
