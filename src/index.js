import React from "react";
import registerServiceWorker from "./registerServiceWorker";

// Import some basic css
import 'semantic-ui-css/semantic.min.css';
import "./index.css";

// Import our global redux store from helpers - do this anywhere you want access to the store
import { store } from "./helpers";

// This will be our main application container (connected to the redux store)
import { MainAppContainer } from "./app";

// This will make redux available to the application
import { Provider } from "react-redux";

// Good old render from react
import { render } from "react-dom";

// Useful logging for checking which environment we aer in
if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
   } else {
    console.log('Looks like we are in production mode!');
}

// Rather than have an index.html just create one on the fly here
let root = document.createElement('div');
root.id = "root";
document.body.appendChild( root );
document.title = "React Eelectron & Web Boilerplate";

render(
  <Provider store={store}>
    <MainAppContainer />
  </Provider>,
  document.getElementById("root")
);

// Google what this does!
registerServiceWorker();
