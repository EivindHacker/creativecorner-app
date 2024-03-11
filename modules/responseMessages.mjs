//User Messages

const missingDataFieldsTxt = {en: "Required fields was not filled in. Fix this, and try again"};
const userExistsTxt = {en: "User already exists, login using this email, or try another email"};
const wrongPassOrEmailTxt = {en: "Wrong username or password"};
const passwordMissMatchTxt = {en: "The password you typed does not match your original password"};
const passwordUpdateSuccessTxt = {en: "Password updated successfully", no: "Passordet ditt har blitt oppdatert"};
const passwordUpdateFailureTxt = {en: "Could not update password"};
const accountUpdateSuccessTxt = {en: "Account updated succesfully", no: "Kontoen din har blitt oppdatert"};
const deleteAccountFailureTxt = {en: "Could not delete your account, contact developer"};
const accountToDeleteNotFoundTxt = {en: "Could not find your account, when trying to delete it. Contact developer"};

//Idea Messages

const noIdeasFoundTxt = {en: "We could not find any ideas..."};

const avialableLanguages = {
	norwegian: "no",
	english: "en",
};

const lang = avialableLanguages.english;

class ResMsg {
	constructor() {
		this.UserMsg = {
			passwordUpdateSuccess: passwordUpdateSuccessTxt[lang],
			accountUpdateSuccess: accountUpdateSuccessTxt[lang],
			missingDataFields: missingDataFieldsTxt[lang],
			userExists: userExistsTxt[lang],
			wrongPassOrEmail: wrongPassOrEmailTxt[lang],
			passwordMissMatch: passwordMissMatchTxt[lang],
			passwordUpdateFailure: passwordUpdateFailureTxt[lang],
			deleteAccountFailure: deleteAccountFailureTxt[lang],
			accountToDeleteNotFound: accountToDeleteNotFoundTxt[lang],
		};

		this.IdeaMsg = {
			noIdeasFound: noIdeasFoundTxt[lang],
		};
	}
}

const ResMsgInstance = new ResMsg();

export {ResMsgInstance as ResMsg};
