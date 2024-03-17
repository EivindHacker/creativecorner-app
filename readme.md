# Creative Corner - Semester project

## Description

Creative Corner is my exam project in Application Development 2 at UiA. This is a simple app were you can share your ideas for a song, and musicians can use this page as inspiration for their work.
Maybe your idea will be the next big hit? Probably not... :P

## Projectmanagment

I've used [Trello]([https://trello.com/b/FHCiBdTb/demo](https://trello.com/invite/b/F7Eo5hqg/ATTI94983d617c3506dd55d62b207dfc4c72912EAFB0/apputvikling-2)) for project management. You can find the board [here]([https://trello.com/b/FHCiBdTb/demo](https://trello.com/invite/b/F7Eo5hqg/ATTI94983d617c3506dd55d62b207dfc4c72912EAFB0/apputvikling-2)).


## Getting started

To get started with the project you need to clone the repository and open it in your favorite IDE. We recommend using VS Code.
Once you have cloned the repository you need to install the dependencies. This is done by running the following command in the terminal:

```
npm install
```

You also need to edit the .env file with values for:

- DB_CONNECTIONSTRING , this is the connectionstring to your database
- DB_SSL, if runing localy this needs to be false

Once the dependencies are installed and the database is runing you can run the project by running the following command in the terminal:

```
npm start
```

This will start the server and you can now access the project on http://localhost:8080 in your browser.

## API Documentation

Common for all these API's is that they return a object if successful, and string if unsuccessful.

All API's that has some sort of user input has the same input validation.
Illegal symbols are: ! # $ % ^ & * ( ) { } [ ] ' , ? ; : \n \r \t + * / = < > | " `
In some cases are ! and , allowed.
Max length is 64 symbols.
Min length is 1 symbol.
In one case, 200 symbols are allowed.

All `POST` needs the objects below passed in the body as json.


### User

- `POST /User/signUp/`: Allows users to sign up for the platform.
  Needs the following object: {name (string), email (string), pswHash (string), role (string), language (string)}.
  Creates user in the Users DB.
  
- `POST /User/login/`: Enables users to log in to their accounts.
  Needs the following object: {email (string), pswHash (string)}.
  If user is found in database it genrates and returns a token.
  Token is of type JSON Web Token, and is hashed by a secret key, an has a expiration of 1 hour.
  
- `POST /User/getUserData/`: Retrieves data related to the authenticated user.
  Needs the following object: {token (string)}.
  If token is valid, it returns the users data.
  If token expired, it returns message saying that the token has expired.
  If token is not valid, it returns message saying that the token is not valid.
  
- `POST /User/updateUserInfo/`: Allows users to update their information.
  Needs the following object: {name (string), email (string), role (string), language (string), token (string)}.
  Allows user to update their information and preferences.
  If successfull, it returns an object of this structure {message, data, success}.
  The message contains a success message based on selected language, that you can display.
  
- `POST /User/updateUserPassword/`: Allows users to update their password.
  Needs the following object: {oldPass (string), newPass (string), token (string)}.
  The api will check if your old password matches, before assinging a new password.
  Allows user to update their information and preferences.
  If successfull, it returns an object of this structure {message, data, success}.
  The message contains a success message based on selected language, that you can display.
  
- `POST /User/deleteUser/`: Deletes the user account.
  Needs the following object {token (string)}.
  Validates token, then removes all your data from the database called Users.

### Ideas

- `GET /Idea/getIdeas/`: Retrieves a list of all available ideas.
  Has the following URL idea/getIdeas/sortBy_orderBy
  Sort by can be one of the following: ASC, DESC or RANDOM.
  Order by can one of the following: 
    id, title, creator_id, creator_name, genres, rating, creations, description, rated_by.

  This returns all the ideas from the Ideas database as an array of objects.
  The object structure looks like this:
    {id (integer), title (string), creator_id (integer), creator_name (string), genres (string), rating (integer), creations (string), description (string), rated_by (string)}
  
- `GET /Idea/getUserIdeas/`: Retrieves ideas specific to the authenticated user.
  Has the following URL: idea/getUserIdeas/sortBy_id
  Read about the sortBy in the `GET /Idea/getIdeas/` above.
  the id, needs to be the idea of the user.

  Returns the same data-structure as `GET /Idea/getIdeas/`, responding only with ideas from user id.
  
- `POST /Idea/createIdea/`: Allows users to create a new idea.
  Needs the following object {title (string), description (string), genres(array of strings)}
  returns the idea back to the user as object: {id, title, creator_id, creator_name, genres, rating, creations, description, rated_by}
  
- `POST /Idea/editIdea/`: Enables users to edit an existing idea.
  Needs the following object {title (string), description (string), genres(array of strings)}
  If successfull, it returns an object of this structure {message, data, success}.
  The message contains a success message based on selected language, that you can display.

- `POST /Idea/rateIdea/`: Allows users to rate an idea.
  needs the following object: {rating (integer with only 1 digit), id (integer), token(string)}.
  Rates an idea based on input from 0-5. User can only rate other peoples idea once, and not their own at all.
  If succeesfull it returns this object {rating}, containing the updated ratings for the idea with the id you sent in.
  
- `POST /Idea/deleteIdea/`: Deletes a specific idea.
  Needs the following object: {id (int), token (string)}.
  Deletes the idea with the matching id, if user has created the idea originally.
  If successfull, it returns an object of this structure {message, data, success}.
  The message contains a success message based on selected language, that you can display.
- `POST /Idea/submitCreation/`: Submits the creation based on an idea.
  Only users with the role Musicians, can add a creation to a idea.
  Needs the following object: {id (integer), title (string), artist (string), link (string)}
  Adds a creation to a idea.
  If successfull, it returns an object of this structure {message, data, success}.
  The message contains a success message based on selected language, that you can display.
  
- `POST /Idea/deleteCreation/`: Deletes a creation associated with an idea.
  Needs the following object: {id (integer), creation (string), token (string)}
  Allows users to delte their creations from idea. 
  Only the user who has created the creation, can delete it.
  If successfull, it returns an object of this structure {message, data, success}.
  The message contains a success message based on selected language, that you can display.
