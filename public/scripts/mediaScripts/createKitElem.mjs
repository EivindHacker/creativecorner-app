import {purchasedMusic, currentPage, kitsPerPage} from "./mediaList.mjs";
import {playMusic} from "./playMusic.mjs";

import tryBuyKit from "./tryBuyKit.mjs";

const kitsContainer = document.getElementById("kitsContainer");

let kitsWritten = 0;

// Function to create the kit list and append it to the container
export function createKitElement(kit) {
	const kitElement = document.createElement("div");
	kitElement.id += kit.title;
	kitElement.classList.add("kit");

	const currentKitIndex = kit.id;

	kitsWritten++;

	if (kitsWritten > 49) {
		if (currentKitIndex <= currentPage * kitsPerPage - 1 && currentKitIndex >= currentPage * kitsPerPage - 50) {
		} else {
			kitElement.style.display = "none";
			return kitElement;
		}
	}

	const kitAnimation = document.createElement("img");
	kitAnimation.src = "../../assets/imgs/gradient-fx.png";
	kitAnimation.classList.add("gradient-fx");

	kitElement.appendChild(kitAnimation);

	const elementBtn = document.createElement("div");
	elementBtn.classList.add("element-btn");

	// Create and add the kit image
	const imageElement = document.createElement("img");
	const imageUrl = `../../media/coverImgs/${kit.series}.jpg`;
	imageElement.src = imageUrl;
	imageElement.classList.add("kit-img");
	elementBtn.appendChild(imageElement);

	// Create and add the kit details
	const infoElement = document.createElement("div");
	infoElement.classList.add("info");

	// Create and add the kit title
	const titleElement = document.createElement("h2");
	titleElement.textContent = kit.title;
	titleElement.classList.add("kit-title");
	infoElement.appendChild(titleElement);

	const creatorElement = document.createElement("a");
	creatorElement.textContent = kit.creator;
	creatorElement.classList.add("creator-txt");
	creatorElement.onclick = function () {
		//window.location.href = `./${kit.creator}.html`;
	};
	creatorElement.style.lineHeight = "5px";
	creatorElement.style.marginTop = "-7px";
	infoElement.appendChild(creatorElement);

	const typeElement = document.createElement("h4");
	typeElement.textContent = kit.type;
	typeElement.classList.add("kit-type");
	infoElement.appendChild(typeElement);

	elementBtn.appendChild(infoElement);

	// Create and add the kit details
	const detailsElement = document.createElement("div");
	detailsElement.classList.add("details");

	const genreElement = document.createElement("p");
	genreElement.innerHTML = `<p><img src="../../assets/btnIcons/note.png" class="note-ico">&nbsp;${kit.genre}</p>`;
	genreElement.classList.add("genre-format");
	detailsElement.appendChild(genreElement);

	const bpm_key = document.createElement("p");
	bpm_key.textContent = `${kit.bpm} BPM | ${kit.key}`;
	bpm_key.classList.add("details-format");
	detailsElement.appendChild(bpm_key);

	elementBtn.appendChild(detailsElement);

	// Append the tags to the kitElement
	const tagsElement = document.createElement("div");
	tagsElement.classList.add("tags");
	kit.tags.forEach((tag) => {
		const tagElement = document.createElement("span");
		tagElement.classList.add("tag-format");
		tagElement.textContent = tag;
		tagsElement.appendChild(tagElement);
	});
	elementBtn.appendChild(tagsElement);

	kitElement.appendChild(elementBtn);
	elementBtn.addEventListener("mouseup", () => {
		playMusic(kit);
	});

	const rightCont = document.createElement("div");
	rightCont.classList.add("right-cont");

	const likeBuyDiv = document.createElement("div");
	likeBuyDiv.classList.add("like-buy-div");

	rightCont.appendChild(likeBuyDiv);

	// Create the like button as an actual button
	const likeButton = document.createElement("button");
	likeButton.classList.add("like-button");
	likeButton.innerHTML = '<img src="../../assets/btnIcons/favBtn.png" alt="Like">';
	likeBuyDiv.appendChild(likeButton);

	// Add event listener to handle the like button click
	likeButton.addEventListener("click", (e) => {
		// Toggle the 'liked' class on the button to change its appearance
		likeButton.classList.toggle("liked");

		// Add or remove the kit title from local storage
		const likedMusic = JSON.parse(localStorage.getItem("likedMusic")) || [];
		const kitTitle = kit.title;
		const kitIndex = likedMusic.indexOf(kitTitle);
		if (kitIndex === -1) {
			likedMusic.push(kitTitle);

			let heartFX;
			const x = e.clientX;
			const y = e.clientY;
			for (let i = 0; i < 4; i++) {
				heartFX = document.createElement("img");
				heartFX.src = "../../assets/btnIcons/favBtn.png";
				heartFX.classList.add("heart-fx");
				if (i == 0 || i == 2 || i == 4) {
					heartFX.classList.add("fx-1");
				} else {
					heartFX.classList.add("fx-2");
				}
				if (window.innerWidth < 576) {
					heartFX.style.left = x + Math.floor(Math.random() * 10) + "px";
					heartFX.style.top = y + Math.floor(Math.random() * 10) - 40 + "px";
				} else {
					heartFX.style.left = x + Math.floor(Math.random() * 20) - 25 + "px";
					heartFX.style.top = y + Math.floor(Math.random() * 20) - 30 + "px";
				}
				heartFX.style.left = x + Math.floor(Math.random() * 20) - 20 + "px";
				heartFX.style.top = y + Math.floor(Math.random() * 20) - 30 + "px";
				heartFX.style.animationDelay = Math.random() * 0.5 + "s";
				document.body.appendChild(heartFX);
			}
		} else {
			// Kit already in liked list, remove it
			likedMusic.splice(kitIndex, 1);
		}
		localStorage.setItem("likedMusic", JSON.stringify(likedMusic));
	});

	// Check if the kit has been liked and set the 'liked' class if necessary
	const likedMusic = JSON.parse(localStorage.getItem("likedMusic")) || [];
	if (likedMusic.includes(kit.title)) {
		likeButton.classList.add("liked");
	}

	// Create the buy button and add event listener to handle the buy button click
	const buyButton = document.createElement("button");
	buyButton.classList.add("buy-button");
	buyButton.innerHTML = '<img src="../../assets/btnIcons/cartBtn.png" alt="Buy">';
	likeBuyDiv.appendChild(buyButton);

	//Eventlistener for the buy button.
	buyButton.addEventListener("click", () => {
		tryBuyKit(kit);
	});

	const downnloadBtn = document.createElement("button");
	downnloadBtn.innerHTML = '<img src="../../assets/btnIcons/downloadBtn.svg" alt="download button">';
	downnloadBtn.classList.add("download-btn");
	downnloadBtn.style.display = "none";
	rightCont.appendChild(downnloadBtn);

	//Event listener for download button.
	downnloadBtn.addEventListener("click", (e) => {
		handledDownload(kit);

		//----------Download FX------------
		let heartFX;
		const x = e.clientX;
		const y = e.clientY;
		for (let i = 0; i < 4; i++) {
			heartFX = document.createElement("img");
			heartFX.src = "./img/note.png";
			heartFX.classList.add("heart-fx");
			if (i == 0 || i == 2 || i == 4) {
				heartFX.classList.add("fx-1");
			} else {
				heartFX.classList.add("fx-2");
			}
			if (window.innerWidth < 576) {
				heartFX.style.left = x + Math.floor(Math.random() * 10) + "px";
				heartFX.style.top = y + Math.floor(Math.random() * 10) - 40 + "px";
			} else {
				heartFX.style.left = x + Math.floor(Math.random() * 20) - 25 + "px";
				heartFX.style.top = y + Math.floor(Math.random() * 20) - 30 + "px";
			}
			heartFX.style.left = x + Math.floor(Math.random() * 20) - 20 + "px";
			heartFX.style.top = y + Math.floor(Math.random() * 20) - 30 + "px";
			heartFX.style.animationDelay = Math.random() * 0.5 + "s";
			document.body.appendChild(heartFX);
		}
	});

	const priceTag = document.createElement("span");
	priceTag.classList.add("price-tag");
	if (kit.discount > 0) {
		priceTag.innerHTML = `<span class="discount-tag">${kit.price}</span>&nbsp;${
			kit.price - kit.discount
		}<img class="credit-ico" src="../../assets/btnIcons/credit-ico-2.svg">`;
		priceTag.style.color = "rgb(255, 208, 0)";
	} else {
		priceTag.innerHTML = `${kit.price}<img class="credit-ico" src="../../assets/btnIcons/credit-ico-2.svg">`;
	}

	rightCont.appendChild(priceTag);

	//CODE FOR PURCHASED KITS
	// Check if the kit has been bought and set the bought class if necessary
	if (purchasedMusic.includes(kit.title)) {
		buyButton.style.display = "none";
		downnloadBtn.style.display = "block";
		priceTag.classList.add("disable-price");
	}

	kitElement.appendChild(rightCont);

	// Add the kit element to the container
	kitsContainer.appendChild(kitElement);

	return kitElement;
}
