//Input messages
const missingDataFieldsTxt = {en: "Required fields was not filled in. Fix this, and try again", no: "Påkrevde felt ble ikke fylt inn. Fiks dette, og prøv igjen"}; // prettier-ignore
const illegalInputTxt = {en: "You have entered a illegal input. Some of the following symbols may not be allowed: ! # $ % ^ & * ( ) { } [ ] ' , ? ; : \n \r \t + * / = < > |", no: "Du har tastet inn ugyldig input. Noen av de følgende symbolene kan være ikke tillatt: ! # $ % ^ & * ( ) { } [ ] ' , ? ; : \n \r \t + * / = < > |"}; // prettier-ignore
const illegalRatingInputTxt = {en: "You have entered a illegal input, only 1 digit between 0 and 5 is allowed", no: "Du har tastet inn ugyldig input, bare 1 siffer mellom 0 og 5 er tillatt"}; // prettier-ignore

//Universal messages
const editNotAllowedTxt = {en: "You are not allowed to edit this.", no: "Du har ikke lov til å redigere dette."}; // prettier-ignore
const deleteNotAllowedTxt = {en: "You are not allowed to delete this.", no: "Du har ikke lov til å slette dette."}; // prettier-ignore
const missingPrametersTxt = {en: "Missing parameters", no: "Manglende parametere"}; // prettier-ignore

//User Messages
const userExistsTxt = {en: "User already exists", no: "Brukeren eksisterer allerede"}; // prettier-ignore
const wrongPassOrEmailTxt = {en: "Wrong username or password", no: "Feil brukernavn eller passord"}; // prettier-ignore
const emailAlreadyExistsTxt = {en: "Email already exists", no: "E-posten eksisterer allerede"}; // prettier-ignore
const passwordMissMatchTxt = {en: "The password you typed does not match your original password", no: "Passordet du skrev stemmer ikke overens med det opprinnelige passordet ditt"}; // prettier-ignore
const passwordUpdateSuccessTxt = {en: "Password updated successfully", no: "Passordet ditt har blitt oppdatert"}; // prettier-ignore
const passwordUpdateFailureTxt = {en: "Could not update password", no: "Kunne ikke oppdatere passord"}; // prettier-ignore
const accountUpdateSuccessTxt = {en: "Account updated succesfully", no: "Kontoen din har blitt oppdatert"}; // prettier-ignore
const deleteAccountFailureTxt = {en: "Could not delete your account, contact developer", no: "Kunne ikke slette kontoen din, kontakt utvikleren"}; // prettier-ignore
const cantFindUserTxt = {en: "Could not find your account. Try to re-login or contact developer", no: "Kunne ikke finne kontoen din. Prøv å logge inn på nytt eller kontakt utvikleren"}; // prettier-ignore
const tokenHasExpiredTxt = {en: "Your login token has expired, please login again.", no: "Innloggingstokenet ditt har utløpt, vennligst logg inn på nytt."}; // prettier-ignore
const missingTokenTxt = {en: "You are missing a token, please login again.", no: "Du mangler en token, vennligst logg inn på nytt."}; // prettier-ignore
const couldNotUpdateTokenTxt = {en: "Could not update user token", no: "Kunne ikke oppdatere brukertoken"}; // prettier-ignore
const errorValidatingTokenTxt = {en: "Error validating token, if the error persist, login again", no: "Feil ved validering av token, hvis feilen vedvarer, logg inn på nytt"}; // prettier-ignore
const deleteUserSuccessTxt = {en: "User deleted successfully, you will be redirected in 5 seconds", no: "Brukeren ble slettet vellykket, du vil bli omdirigert om 5 sekunder"}; // prettier-ignore
const loginSuccessTxt = {en: "Logged in successfully", no: "Innlogging vellykket"}; // prettier-ignore
const creationNotAuthorizedTxt = {en: "You have to set your user role to 'Musician', to submit a creation to a idea.", no: "Du må sette brukerrollen din til 'Musiker' for å sende inn en kreasjon til en idé."}; // prettier-ignore

//Idea Messages
const noIdeasFoundTxt = {en: "We could not find any ideas...", no: "Vi kunne ikke finne noen ideer..."}; // prettier-ignore
const errorGettingIdeasTxt = {en: "Error while getting ideas", no: "Feil ved henting av ideer"}; // prettier-ignore
const cantCreateIdeaTxt = {en: "Cant create idea. Try again, or contact developer", no: "Kan ikke opprette ideen. Prøv igjen, eller kontakt utvikleren"}; // prettier-ignore
const ratingNotAllowedTxt = {en: "You are not allowed to rate your own idea.", no: "Du har ikke lov til å vurdere din egen idé."}; // prettier-ignore
const alreadyRatedTxt = {en: "You have already rated this idea", no: "Du har allerede vurdert denne idéen"}; // prettier-ignore
const cantFindIdeaTxt = {en: "We could not find the idea you were interacting with", no: "Vi kunne ikke finne ideen du samhandlet med"}; // prettier-ignore
const ideaUpdateSuccessTxt = {en: "Idea updated successfully", no: "Idéen ble oppdatert vellykket"}; // prettier-ignore
const cantRateIdeaTxt = {en: "Cant create idea. Try again, or contact developer.", no: "Kan ikke opprette idéen. Prøv igjen, eller kontakt utvikleren."}; // prettier-ignore
const deleteIdeaSuccessTxt = {en: "Idea deleted successfully", no: "Idéen ble slettet vellykket"}; // prettier-ignore
const deleteIdeaFailureTxt = {en: "Failed to delete idea", no: "Feil ved sletting av idé"}; // prettier-ignore
const cantFindCreationToDeleteTxt = {en: "Cant find creation to delete", no: "Kan ikke finne kreasjonen som skal slettes"}; // prettier-ignore
const creationDeleteSuccessTxt = {en: "Creation deleted successfully", no: "Kreasjonen ble slettet vellykket"}; // prettier-ignore
const creationDeletionFailureTxt = {en: "Error while deleting creation", no: "Feil ved sletting av kreasjon"}; // prettier-ignore

//DB Errors
const errorUpdatingDataTxt = {en: "An error occured while updating database", no: "En feil oppstod under oppdatering av database"}; // prettier-ignore
const errorGettingDataTxt = {en: "An error occured while getting data from database", no: "En feil oppstod under henting av data fra database"}; // prettier-ignore

export const avialableLanguages = {
	no: "no",
	en: "en",
};

let lang = avialableLanguages.en;

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

let ResMsgInstance = new ResMsg();

export function updateLanguage(userLang) {
	lang = avialableLanguages[userLang];
	ResMsgInstance = new ResMsg();
}

export {ResMsgInstance as ResMsg};
