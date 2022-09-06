# CurrencyExchangeList
An app for listing CryptoCurrency exchanges.

This was largely a project for learning how to write an application using React.  This app does actually work and I suppose could be made into something useful if anyone cared enough to do so.  It's largely served its purpose for me for now.  It's possible I will do additional work on it, but I'm pursuing other avenues at this time.

It gets its data from [Coingecko](https://www.coingecko.com/en/api/documentation) so any improvements would need to be consistent with their TOS.

Note that it's set up to run serving static files behind an nginx server.  The default configuration is for it to run from my domain (mriehle.com) at 'CurrencyExchange'.  To make this work on a different host, the 'hostname' key in package.json would need to change.  To just move the path, that key and the basename specified on BrowserInfo in index.js would need to change.


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

