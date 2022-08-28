# CurrencyExchangeList
An app for listing CryptoCurrency exchanges.

This was largely a project for learning how to write an application using React.  It's the second attempt at that since the first attempt went very badly.  This app does actually work and I suppose could be made into something useful if anyone cared enough to do so.  It's largely served its purpose for me for now.

It gets its data from [Coingecko](https://www.coingecko.com/en/api/documentation) so any improvements would need to be consistent with their TOS.

Note that it's set up to run serving static files behind an nginx server.  The default configuration is for it to run from my domain (mriehle.com) at 'CurrencyExchange'.  To make this work on a different host, the 'hostname' key in package.json would need to change.  To just move the path, that key and the basename specified on BrowserInfo in index.js would need to change.


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run test:debug`

Pretty much running the tests with the ability to attach a debugger;

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
