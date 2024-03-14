const missingDataFieldsTxt = {en: "Required fields was not filled in. Fix this, and try again"};
const illegalInputTxt = {en: "You have entered a illegal input"};

//User Messages

const userExistsTxt = {en: "User already exists, login using this email, or try another email"};
const wrongPassOrEmailTxt = {en: "Wrong username or password"};
const passwordMissMatchTxt = {en: "The password you typed does not match your original password"};
const passwordUpdateSuccessTxt = {en: "Password updated successfully", no: "Passordet ditt har blitt oppdatert"};
const passwordUpdateFailureTxt = {en: "Could not update password"};
const accountUpdateSuccessTxt = {en: "Account updated succesfully", no: "Kontoen din har blitt oppdatert"};
const deleteAccountFailureTxt = {en: "Could not delete your account, contact developer"};
const cantFindUserTxt = {en: "Could not find your account. Try to re-login or contact developer"};
const tokenHasExpiredTxt = {en: "Your login token has expired, please login again."};
const missingTokenTxt = {en: "You are missing a token, please login again."};
const cantRateIdeaTxt = {en: "Cant create idea. Try again, or contact developer."};

//Idea Messages

const noIdeasFoundTxt = {en: "We could not find any ideas..."};
const cantCreateIdeaTxt = {en: "Cant create idea. Try again, or contact developer"};
const ratingNotAllowedTxt = {en: "You are not allowed to rate your own idea."};
const alreadyRatedTxt = {en: "You have already rated this idea"};

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

			userExists: userExistsTxt[lang],
			wrongPassOrEmail: wrongPassOrEmailTxt[lang],
			passwordMissMatch: passwordMissMatchTxt[lang],
			passwordUpdateFailure: passwordUpdateFailureTxt[lang],
			deleteAccountFailure: deleteAccountFailureTxt[lang],
			cantFindUser: cantFindUserTxt[lang],
			tokenHasExpired: tokenHasExpiredTxt[lang],
			missingToken: missingTokenTxt[lang],
		};

		this.IdeaMsg = {
			noIdeasFound: noIdeasFoundTxt[lang],
			cantCreateIdea: cantCreateIdeaTxt[lang],
			cantRateIdea: cantRateIdeaTxt[lang],
			ratingNotAllowed: ratingNotAllowedTxt[lang],
			alreadyRated: alreadyRatedTxt[lang],
		};

		this.InputMsg = {
			missingDataFields: missingDataFieldsTxt[lang],
			illegalInput: illegalInputTxt[lang],
		};
	}
}

const ResMsgInstance = new ResMsg();

export {ResMsgInstance as ResMsg};
