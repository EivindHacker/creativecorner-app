# Creative Corner - Semester project

## Description

Creative Corner is my exam project in Application Development 2 at UiA. This is a simple app were you can share your ideas for a song, and musicians can use this page as inspiration for their work.
Maybe your idea will be the next big hit? Probably not... :P

## Projectmanagment

I've used [Trello](<[https://trello.com/b/FHCiBdTb/demo](https://trello.com/invite/b/F7Eo5hqg/ATTI94983d617c3506dd55d62b207dfc4c72912EAFB0/apputvikling-2)>) for projectmanagment. You can find the board [here](<[https://trello.com/b/FHCiBdTb/demo](https://trello.com/invite/b/F7Eo5hqg/ATTI94983d617c3506dd55d62b207dfc4c72912EAFB0/apputvikling-2)>).

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

- [Login](login.md) : `POST /api/login/`
