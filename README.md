## Live version on Netlify

[![Netlify Status](https://api.netlify.com/api/v1/badges/3fc38d73-965a-4a49-8f6f-ff6f7304f2cf/deploy-status)](https://app.netlify.com/sites/gallant-pike-59e84b/deploys)

https://gallant-pike-59e84b.netlify.app/

## Description about app

- This pokemon application consists of three main views. These are:
    - Pokedex View to list pokemons using the API with pagination(Infinite scrolling used in frontend). User can sort pokemons by their Id's or names. Additionally, there is a surprise me button added that links to random pokemon's detail page.
    - Captured Pokemons View to list pokemons that are captured by user. User can sort pokemons by their Id's or names in here as well. Pokemons will be shown with a favorite button and favorited pokemons will be displayed with priority.
    - Pokemon Detail View to display the details of the clicked pokemon(Type, Abilities and Stats of the pokemon are displayed). Both Pokedex and Captured Pokemons Views redirected to this page and pokemon details render here conditionally. User can capture pokemon and if it succeeds, the user is informed via a congrats dialog(User can release captured pokemons in here as well). Additionally, user can add pokemon to favorites if the pokemon is captured before.
- App has language support(except the fields that are fetched from the API).
- App has responsive UI.
- Redux is used for managing the state throughout the application flow.
- There is a snackbar component to inform the user that pokemon capture is failed.
- No external component library is used.


## Technologies/Libraries Used

- React Router Dom : To wrap all views into router in App.js.
- [Tailwind CSS](https://tailwindcss.com/) : Highly customizable, low-level CSS framework that gives you all of the building blocks you need to build bespoke designs without any annoying opinionated styles you have to fight to override.
- [axios](https://github.com/axios/axios) : Promise based HTTP client for the browser and node.js
- [react-redux](https://react-redux.js.org/): Official React bindings for Redux
- [react-intl](https://www.npmjs.com/package/react-intl): To use localization in app
- [react-lottie](https://github.com/chenqingspring/react-lottie) : Render After Effects animations on React
- [font awesome icons](https://fontawesome.com/): Font Awesome, the web's most popular icon set and toolkit.

## Feature TODO's

- UI/UX improvements
- Dockerizing the app
- [react-virtualized](https://github.com/bvaughn/react-virtualized) to render pokemons efficiently
- Dark Theme


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn install`

Install the node dependencies before run the app.

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
