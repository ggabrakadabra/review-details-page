# About
## Objective
Design and implement an application that lists reviews and allows a user to select a review to see more details. Review data will be provided in the form of a reviews.json file.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
This Project uses the [json server package](https://github.com/typicode/json-server) as an api to make data lookup and storage easy

## How to Use
run `nf start` to start both the web and api servers
otherwise, run `yarn start` and `json-server --watch db.json --port 3004`
on page load there will be a list of reviews
you can click on any review and add / view / edit a comment

## What I would add if I had more time
I would like to get 100% test coverage
The styling does not exactly match the mocks and ideally they would look the same. 
Everything should be tab navigable for accessibility, this is important for users who need screen readers

## Available Scripts
In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `json-server --watch db.json --port 3004`

Will run the json server with the reviews and user comments

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

