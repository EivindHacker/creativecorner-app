"use strict";

import playIntroAnim from "./introAnim.js";

let intro = sessionStorage.getItem("finished");

if (intro == null) {
	playIntroAnim();
}

let userContContent = "";

let userPic = "";

const menuBarHTML = `
    <div class="nav-holder">
        <div class="logo-cont">
                <img src="../../assets/logos/logo.svg" alt="logo" class="logo">
                <a class="logo-txt" href="index.html">
                    SongStarterKits
                </a>
            </div>
        
        <nav class="nav-cont">         
            <a class="push-menu">.<br>.</a>
            <a id="home-link" href="index.html" class="nav-link">Home</a>
            <a id="kits-link" href="kits.html" class="nav-link">Kits</a>
            <a id="about-link"  href="about.html" class="nav-link">About</a>
            <a id="contact-link" href="contact.html" class="nav-link">Contact</a>
            <a id="checkout-link" href="checkout.html" class="nav-link">Pricing</a>
        </nav>
        
        <div class="user-cont">
            <button onclick="window.location.href='./signup.html'" class="signin-btn">Sign Up/In</button>
            <button class="menu-btn">
                <div class="hamburger"></div>
                <div class="hamburger"></div>
                <div class="hamburger"></div>
            </button>
        </div>     
        

        
    </div>`;

const navBarCont = document.getElementById("navbar");
navBarCont.innerHTML = menuBarHTML;

export function updateMenuBar(credits) {
	if (localStorage.getItem("PIC") == null) {
		userPic = `<img id="userBtn" class="user-btn" src="./btnImg/userBtn.png">`;
	} else {
		userPic = `<img id="userBtn" class="user-btn-pic" src="${localStorage.getItem("PIC")}">`;
	}

	if (signedIn) {
		//Show credits and user settings button.
		userContContent = `
        <div class="user-cont">
            <span id="visualCredits" class="user-credits">${credits}<img class="user-credits-ico" src="./img/credit-ico-2.svg"></span>
            <a href="user-settings.html">
                ${userPic}
            </a>
        </div>`;
	} else {
		userContContent = `
        <button onclick="window.location.href='./signup.html'" class="signin-btn">Sign Up/In</button>
        `;
	}

	const menuBarHTML = `
    <div class="nav-holder">
        <div class="logo-cont">
                <img src="../../assets/logos/logo.svg" alt="logo" class="logo">
                <a class="logo-txt" href="index.html">
                    SongStarterKits
                </a>
            </div>
        
        <nav class="nav-cont">         
            <a class="push-menu">.<br>.</a>
            <a id="home-link" href="index.html" class="nav-link">Home</a>
            <a id="kits-link" href="kits.html" class="nav-link">Kits</a>
            <a id="about-link"  href="about.html" class="nav-link">About</a>
            <a id="contact-link" href="contact.html" class="nav-link">Contact</a>
            <a id="checkout-link" href="checkout.html" class="nav-link">Pricing</a>
        </nav>
        <div class="user-cont" style="margin-top: 0px">
            ${userContContent}
            <button class="menu-btn">
                <div class="hamburger"></div>
                <div class="hamburger"></div>
                <div class="hamburger"></div>
            </button>       
        </div>

        
    </div>`;

	const navBarCont = document.getElementById("navbar");
	navBarCont.innerHTML = menuBarHTML;
}

const menuBtn = document.querySelector(".menu-btn");
menuBtn.addEventListener("click", function () {
	showNavMenu();
});

const navHolder = document.querySelector(".nav-holder");
const navCont = document.querySelector(".nav-cont");

let showNav = false;

function showNavMenu() {
	console.log(showNav);
	if (!showNav) {
		showNav = true;
		navHolder.style.height = window.innerHeight + "px";
		navCont.style.display = "flex";
	} else {
		showNav = false;
		navHolder.style.height = "60px";
		navCont.style.display = "none";
	}
}

addEventListener("resize", (e) => {
	if (window.innerWidth < 768) {
		showNav = false;
		navHolder.style.height = "60px";
		navCont.style.display = "none";
	} else {
		navCont.style.display = "flex";
	}
});

const visualCredits = document.getElementById("visualCredits");

export function updateMenuBarCredits() {
	visualCredits.innerText = userCredits;
}

console.log(document.querySelector(".logo").src);
