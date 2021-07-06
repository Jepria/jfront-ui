import "core-js/stable"
import "react-app-polyfill/ie11"
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "./index.css"
import * as serviceWorker from "./serviceWorker"
import { ThemeProvider, jepriaTheme, GlobalStyles } from "@jfront/ui-core"
import { Provider } from "react-redux"
import { store } from "./app/store/configureStore"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={jepriaTheme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
