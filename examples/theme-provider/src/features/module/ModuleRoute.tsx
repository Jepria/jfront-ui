import React, { useRef } from "react"
import { Panel } from "@jfront/ui-core"
import ModuleTabPanel from "./components/ModuleTabPanel"
import ModuleToolbar from "./components/ModuleToolbar"
import { Route, Switch, useRouteMatch } from "react-router-dom"
import ModuleCreatePage from "./pages/ModuleCreatePage"
import ModuleListPage from "./pages/ModuleListPage"
import ModuleViewPage from "./pages/ModuleViewPage"

const ModuleRoute = () => {
  const { path } = useRouteMatch()

  return (
    <Panel>
      <Panel.Header>
        <ModuleTabPanel />
        <ModuleToolbar />
      </Panel.Header>
      <Panel.Content>
        <Switch>
          <Route path={path} exact>
            <ModuleListPage />
          </Route>
          <Route path={`${path}/create`}>
            <ModuleCreatePage />
          </Route>
          <Route path={`${path}/:id/detail`}>
            <ModuleViewPage />
          </Route>
        </Switch>
      </Panel.Content>
    </Panel>
  )
}

export default ModuleRoute
