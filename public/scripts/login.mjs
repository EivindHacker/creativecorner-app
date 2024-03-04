import postTo from "../modules/postTo.mjs";

console.log("This is the login script calling...");

document.getElementById("loginBtn").addEventListener("click", async () => {
	const email = document.getElementById("emailInputLogin").value;
	const pswHash = document.getElementById("emailInputLogin").value;

	const user = {name, email, pswHash};
	const respon = await postTo("/user/login", user)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			const userData = JSON.parse(data);
			const authString = btoa(userData.pswHash);
			localStorage.setItem("authString", authString);
			console.log(userData);
		});
});
