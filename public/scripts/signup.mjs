import postTo from "../modules/postTo.mjs";

console.log("This is the singup script calling...");

document.getElementById("createUserButton").onclick = async function (e) {
	const name = document.getElementById("nameInputSignUp").value;
	const email = document.getElementById("emailInputSignUp").value;
	const pswHash = document.getElementById("pswHashInputSignUp").value;
	const user = {name, email, pswHash};
	const respon = await postTo("/user/signUp", user)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			const userData = JSON.parse(data);
			const authString = btoa(userData.pswHash);
			localStorage.setItem("authString", authString);
			console.log(authString);
		});
};
