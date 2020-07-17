# Express Boilerplate!

> This is a boilerplate project used for cooking up new projects! Happy jamming! 

## Set up

Complete the following steps to start a new project (NEW-PROJECT-NAME):

1. Clone this jam to your local machine `git clone BOILERPLATE-URL NEW-PROJECTS-NAME`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm install`
5. Move the example Environment file to `.env` that will be ignored by git and read by the express server `mv example.env .env`
6. Edit the contents of the `package.json` to use NEW-PROJECT-NAME instead of `"name": "express-boilerplate",`

## Scripts
* Start the application `npm start`
* Start nodemon for the application `npm run dev`
* Run the tests `npm test`

## Deploying

When your new project is fully cooked and for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.


Following from the previous assignment, you should already have a table called shopping_list inside your knex-practice database. Make a new file in your knex-practice project for ./src/shopping-list-service.js that contains methods for CRUD: to get, insert, update and delete shopping list items. Also, make a ./test/shopping-list-service.spec.js file that tests the CRUD methods.