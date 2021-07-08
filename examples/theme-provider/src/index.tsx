import "core-js/stable"
import "react-app-polyfill/ie11"
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { ThemeProvider, jepriaTheme, GlobalStyles } from "@jfront/ui-core"
import { Provider } from "react-redux"
import { store } from "./app/store/configureStore"
import darkTheme from "./app/common/darkTheme"
import { ComboBox } from "@jfront/ui-core"

ReactDOM.render(
  <React.StrictMode>
    {/* <ComboBox
      name="code"
      // value={values.code}
      // onSelectionChange={(name, value) => setFieldValue(name, value)}
      options={[{ name: "1", value: "1" }]}
      // error={errors.code}
    /> */}
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles theme={darkTheme} />
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root"),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
