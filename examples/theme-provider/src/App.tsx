import * as React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import ModuleRoute from "./features/module/ModuleRoute"

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path={process.env.PUBLIC_URL}>
            <ModuleRoute />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
