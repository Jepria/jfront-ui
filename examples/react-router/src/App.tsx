import * as React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  Link as RouterLink,
  useRouteMatch,
  useParams,
} from "react-router-dom"
import {
  Breadcrumbs,
  Link,
  Toolbar,
  TabPanel,
  Tab,
  Panel,
  ToolbarSplitter,
  ToolbarButtonBase,
  useRouteMapping,
} from "@jfront/ui-core"
import { Dictionary } from "@jfront/ui-utils"
import styled from "styled-components"
import namor from "namor"

const StyledRouterLink = styled(RouterLink)`
  color: currentColor;
  text-decoration: none;
  font-weight: normal;
  &:hover {
    opacity: 0.7;
  }
`

const routes: Dictionary<string> = {
  "/home": "Home",
  "/home/about": "About",
  "/home/users": "Users",
  "/home/users/:id": "User",
  "/home/users/:id/details": "User details",
}

const RouteBreadcrumbs = () => {
  const { path } = useRouteMatch()
  const routeMappings = useRouteMapping(routes)

  return (
    <>
      {path !== "/home" && (
        <>
          <Breadcrumbs
            collapseMethod="dropdown"
            style={{
              height: "22px",
              float: "left",
              display: "inline-flex",
              alignItems: "center",
              padding: "0 5px",
            }}
          >
            {routeMappings.map((routeMapping, index) => {
              const last = index === routeMappings.length - 1

              return last ? (
                <Link key={routeMapping.to}>{routeMapping.routName}</Link>
              ) : (
                <Link
                  as={StyledRouterLink}
                  to={routeMapping.to}
                  key={routeMapping.to}
                >
                  {routeMapping.routName}
                </Link>
              )
            })}
          </Breadcrumbs>
          <ToolbarSplitter />
        </>
      )}
    </>
  )
}

const About = () => {
  return (
    <Panel>
      <Panel.Header>
        <TabPanel>
          <Tab>
            <Link as={StyledRouterLink} to={`/home`}>
              Home
            </Link>
          </Tab>
          <Tab>
            <Link as={StyledRouterLink} to={`/home/users`}>
              Users
            </Link>
          </Tab>
          <Tab selected>About</Tab>
        </TabPanel>
        <Toolbar>
          <RouteBreadcrumbs />
          <ToolbarButtonBase onClick={() => window.alert("About")}>
            alert
          </ToolbarButtonBase>
        </Toolbar>
      </Panel.Header>
      <Panel.Content>
        <pre>
          React router breadcrumbs example. Users Tab has nested modules. It
          shows hierarchy module system.
        </pre>
      </Panel.Content>
    </Panel>
  )
}

const Users = () => {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route exact path={path}>
        <Panel>
          <Panel.Header>
            <TabPanel>
              <Tab>
                <Link as={StyledRouterLink} to={`/home`}>
                  Home
                </Link>
              </Tab>
              <Tab selected>Users</Tab>
              <Tab>
                <Link as={StyledRouterLink} to={`/home/about`}>
                  About
                </Link>
              </Tab>
            </TabPanel>
            <Toolbar>
              <RouteBreadcrumbs />
              <ToolbarButtonBase onClick={() => window.alert("User")}>
                alert
              </ToolbarButtonBase>
            </Toolbar>
          </Panel.Header>
          <Panel.Content>
            <ul>
              <li>
                <RouterLink to="/home/users/1">User 1</RouterLink>
              </li>
              <li>
                <RouterLink to="/home/users/2">User 2</RouterLink>
              </li>
            </ul>
          </Panel.Content>
        </Panel>
      </Route>
      <Route path={`${path}/:id`}>
        <User />
      </Route>
    </Switch>
  )
}

const User = () => {
  const { path } = useRouteMatch()
  const { id } = useParams<any>()

  return (
    <Switch>
      <Route exact path={path}>
        <Panel>
          <Panel.Header>
            <TabPanel>
              <Tab selected>Users</Tab>
              <Tab>
                <Link as={StyledRouterLink} to={`/home/users/${id}/details`}>
                  Details
                </Link>
              </Tab>
            </TabPanel>
            <Toolbar>
              <RouteBreadcrumbs />
              <ToolbarButtonBase onClick={() => window.alert(`User ${id}`)}>
                alert
              </ToolbarButtonBase>
            </Toolbar>
          </Panel.Header>
          <Panel.Content>
            <div>username: {namor.generate({ words: 1, numbers: 0 })}</div>
            <div>login: {namor.generate({ words: 1, numbers: 0 })}</div>
          </Panel.Content>
        </Panel>
      </Route>
      <Route path={`${path}/details`}>
        <UserDetails />
      </Route>
    </Switch>
  )
}

const UserDetails = () => {
  const { id } = useParams<any>()
  return (
    <Panel>
      <Panel.Header>
        <TabPanel>
          <Tab>
            <Link as={StyledRouterLink} to={`/home/users/${id}`}>
              Users
            </Link>
          </Tab>
          <Tab selected>Details</Tab>
        </TabPanel>
        <Toolbar>
          <RouteBreadcrumbs />
          <ToolbarButtonBase onClick={() => window.alert(`User ${id}`)}>
            alert
          </ToolbarButtonBase>
        </Toolbar>
      </Panel.Header>
      <Panel.Content>
        <div>Name: {namor.generate({ words: 1, numbers: 0 })}</div>
        <div>Surname: {namor.generate({ words: 1, numbers: 0 })}</div>
        <div>Birth date: {new Date().toLocaleDateString()}</div>
      </Panel.Content>
    </Panel>
  )
}

const Home = () => {
  let { path } = useRouteMatch()

  return (
    <Switch>
      <Route exact path={path}>
        <Panel>
          <Panel.Header>
            <TabPanel>
              <Tab selected>Home</Tab>
              <Tab>
                <Link as={StyledRouterLink} to={`/home/users`}>
                  Users
                </Link>
              </Tab>
              <Tab>
                <Link as={StyledRouterLink} to={`/home/about`}>
                  About
                </Link>
              </Tab>
            </TabPanel>
            <Toolbar>
              <ToolbarButtonBase onClick={() => window.alert("Home")}>
                alert
              </ToolbarButtonBase>
            </Toolbar>
          </Panel.Header>
          <Panel.Content>Example homepage</Panel.Content>
        </Panel>
      </Route>
      <Route path={`${path}/users`}>
        <Users />
      </Route>
      <Route path={`${path}/about`}>
        <About />
      </Route>
    </Switch>
  )
}

function App() {
  return (
    <Router>
      <Panel>
        <Panel.Content>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
          </Switch>
        </Panel.Content>
      </Panel>
    </Router>
  )
}

export default App
