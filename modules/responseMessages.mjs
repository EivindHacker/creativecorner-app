//Input messages

const missingDataFieldsTxt = {en: "Required fields was not filled in. Fix this, and try again"};
const illegalInputTxt = {
	en: "You have entered a illegal input. Some of the following symbols may not be allowed: ! # $ % ^ & * ( ) { } [ ] ' , ? ; : \n \r \t + * / = < > |",
};
const illegalRatingInputTxt = {en: "You have entered a illegal input, only 1 digit between 0 and 5 is allowed"};

//Universal messages
const editNotAllowedTxt = {en: "You are not allowed to edit this."};
const deleteNotAllowedTxt = {en: "You are not allowed to delete this."};
const missingPrametersTxt = {en: "Missing parameters"};

//User Messages

const userExistsTxt = {en: "User already exists"};
const wrongPassOrEmailTxt = {en: "Wrong username or password"};
const emailAlreadyExistsTxt = {en: "Email already exists"};
const passwordMissMatchTxt = {en: "The password you typed does not match your original password"};
const passwordUpdateSuccessTxt = {en: "Password updated successfully", no: "Passordet ditt har blitt oppdatert"};
const passwordUpdateFailureTxt = {en: "Could not update password"};
const accountUpdateSuccessTxt = {en: "Account updated succesfully", no: "Kontoen din har blitt oppdatert"};
const deleteAccountFailureTxt = {en: "Could not delete your account, contact developer"};
const cantFindUserTxt = {en: "Could not find your account. Try to re-login or contact developer"};
const tokenHasExpiredTxt = {en: "Your login token has expired, please login again."};
const missingTokenTxt = {en: "You are missing a token, please login again."};
const couldNotUpdateTokenTxt = {en: "Could not update user token"};
const errorValidatingTokenTxt = {en: "Error validating token, if the error persist, login again"};
const deleteUserSuccessTxt = {en: "User deleted successfully, you will be redirected in 5 seconds"};
const loginSuccessTxt = {en: "Logged in successfully"};
const creationNotAuthorizedTxt = {en: "You have to set your user role to 'Musician', to submit a creation to a idea."};

//Idea Messages

const noIdeasFoundTxt = {en: "We could not find any ideas..."};
const errorGettingIdeasTxt = {en: "Error while getting ideas"};
const cantCreateIdeaTxt = {en: "Cant create idea. Try again, or contact developer"};
const ratingNotAllowedTxt = {en: "You are not allowed to rate your own idea."};
const alreadyRatedTxt = {en: "You have already rated this idea"};
const cantFindIdeaTxt = {en: "We could not find the idea you were interacting with"};
const ideaUpdateSuccessTxt = {en: "Idea updated successfully"};
const cantRateIdeaTxt = {en: "Cant create idea. Try again, or contact developer."};
const deleteIdeaSuccessTxt = {en: "Idea deleted successfully"};
const deleteIdeaFailureTxt = {en: "Failed to delete idea"};
const cantFindCreationToDeleteTxt = {en: "Cant find creation to delete"};
const creationDeleteSuccessTxt = {en: "Creation deleted successfully"};
const creationDeletionFailureTxt = {en: "Error while deleting creation"};

//DB Errors

const errorUpdatingDataTxt = {en: "An error occured while updating database"};
const errorGettingDataTxt = {en: "An error occured while getting data from database"};

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
			emailAlreadyExists: emailAlreadyExistsTxt[lang],
			userExists: userExistsTxt[lang],
			wrongPassOrEmail: wrongPassOrEmailTxt[lang],
			passwordMissMatch: passwordMissMatchTxt[lang],
			passwordUpdateFailure: passwordUpdateFailureTxt[lang],
			deleteAccountFailure: deleteAccountFailureTxt[lang],
			cantFindUser: cantFindUserTxt[lang],
			tokenHasExpired: tokenHasExpiredTxt[lang],
			missingToken: missingTokenTxt[lang],
			couldNotUpdateToken: couldNotUpdateTokenTxt[lang],
			errorValidatingToken: errorValidatingTokenTxt[lang],
			deleteUserSuccess: deleteUserSuccessTxt[lang],
			loginSuccess: loginSuccessTxt[lang],
		};

		this.IdeaMsg = {
			noIdeasFound: noIdeasFoundTxt[lang],
			errorGettingIdeas: errorGettingIdeasTxt[lang],
			cantCreateIdea: cantCreateIdeaTxt[lang],
			cantRateIdea: cantRateIdeaTxt[lang],
			ratingNotAllowed: ratingNotAllowedTxt[lang],
			alreadyRated: alreadyRatedTxt[lang],
			cantFindIdea: cantFindIdeaTxt[lang],
			ideaUpdateSuccess: ideaUpdateSuccessTxt[lang],
			deleteIdeaSuccess: deleteIdeaSuccessTxt[lang],
			deleteIdeaFailure: deleteIdeaFailureTxt[lang],
			creationNotAuthorized: creationNotAuthorizedTxt[lang],
			cantFindCreationToDelete: cantFindCreationToDeleteTxt[lang],
			creationDeleteSuccess: creationDeleteSuccessTxt[lang],
			creationDeletionFailure: creationDeletionFailureTxt[lang],
		};

		this.InputMsg = {
			missingDataFields: missingDataFieldsTxt[lang],
			illegalInput: illegalInputTxt[lang],
			illegalRatingInput: illegalRatingInputTxt[lang],
		};

		this.DbMsg = {
			errorUpdatingData: errorUpdatingDataTxt[lang],
			errorGettingData: errorGettingDataTxt[lang],
		};

		this.UniversalMsg = {
			editNotAllowed: editNotAllowedTxt[lang],
			deleteNotAllowed: deleteNotAllowedTxt[lang],
			missingPrameters: missingPrametersTxt[lang],
		};
	}
}

const ResMsgInstance = new ResMsg();

export {ResMsgInstance as ResMsg};
