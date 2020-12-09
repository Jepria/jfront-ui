import { Dictionary } from "@jfront/ui-utils"

interface Path {
  name: string
  path: string
}

const getPaths = (pathname: string): Path[] => {
  const paths: Path[] = []
  if (pathname === "/") return paths
  pathname.split("/").reduce((prev, curr) => {
    const currPath = `${prev}/${curr}`
    paths.push({
      name: curr,
      path: currPath,
    })
    return currPath
  })
  return paths
}

const isDefined = (v?: any) =>
  v !== undefined && v !== null && v !== false && String(v).length > 0

export interface RouteMapping {
  to: string
  routName: string
}

/**
 * Hook builds dynamic route mapping hierarchy
 * @param routes
 */
export const useRouteMapping = (
  routes: Dictionary<string>,
  routeMatcherRegex?: string,
): RouteMapping[] => {
  const location = window.location
  const paths = getPaths(location?.pathname)
  const placeholderMatcher = /:[^\s/]+/g

  const getDynamicValues = (url: string, key: string) => {
    const placeholders = key.match(placeholderMatcher)
    if (!placeholders) return null
    const routeMatcher = new RegExp(
      "^" +
        key.replace(placeholderMatcher, routeMatcherRegex || "([\\w-]+)") +
        "$",
    )
    const match = url.match(routeMatcher)
    if (!match) return null
    return placeholders.reduce(
      (memo, placeholder, index, array, value = match[index + 1] || "") =>
        Object.assign(memo, {
          [placeholder]: value,
          [placeholder.substring(1)]: value,
        }),
      {},
    )
  }

  const matchRouteName = (
    url: string,
    routesCollection: Dictionary<string>,
  ) => {
    let fRouteName: string | null = ""

    const paths = Object.keys(routesCollection).sort((a, b) => {
      const aTokenCount = (a.match(placeholderMatcher) || []).length
      const bTokenCount = (b.match(placeholderMatcher) || []).length
      switch (true) {
        case aTokenCount === bTokenCount:
          return a.length > b.length ? 1 : -1 //longest routes have the priority
        default:
          return aTokenCount < bTokenCount ? 1 : -1 //among dynamic routes the one with less placeholders take priority
      }
    })
    for (const key of paths.filter((v) => routesCollection.hasOwnProperty(v))) {
      const routeName = routesCollection[key]
      if (key.indexOf(":") !== -1) {
        const match = getDynamicValues(url, key)
        if (match) {
          if (!isDefined(routeName)) {
            fRouteName = null
          } else {
            fRouteName = Object.keys(match).reduce(
              (routeName, placeholder) =>
                routeName.replace(placeholder, match[placeholder]),
              routeName,
            )
          }
        }
      } else {
        if (key === url) {
          if (!isDefined(routeName)) {
            fRouteName = null
          } else {
            fRouteName = routeName
          }
        }
      }
    }
    return fRouteName
  }

  return paths
    .filter((path) => matchRouteName(path.path, routes) != null)
    .map((path) => ({
      to: path.path || "",
      routName: matchRouteName(path.path, routes) || path.name,
    }))
}
