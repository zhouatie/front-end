import createRouteMap from './create-route-map.js';
import { createRoute } from './history/base.js';

export default function createMatcher(routes) {
  const { pathList, pathMap } = createRouteMap(routes);
  function addRoute() {}

  function match(location) {
    const r = pathMap[location];
    return createRoute(r, {
      path: location,
    });
  }

  return {
    addRoute,
    match,
  };
}
