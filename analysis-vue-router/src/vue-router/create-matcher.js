import creatRouteMap from './create-route-map';
import { createRoute } from './history/base';

export default function createMatcher(routes) {
  const { pathList, pathMap } = creatRouteMap(routes);
  const addRoute = (routes) => {
    creatRouteMap(routes, pathList, pathMap);
  };
  const match = (location) => {
    return createRoute(pathMap[location], { path: location });
  };

  return {
    addRoute,
    match,
  };
}
