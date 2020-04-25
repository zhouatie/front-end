import creatRouteMap from './create-route-map';

export default function createMatcher(routes) {
  const { pathList, pathMap } = creatRouteMap(routes);
  console.log(pathList, pathMap, 'xx');
  const addRoute = () => {};
  const match = () => {};

  return {
    addRoute,
    match,
  };
}
