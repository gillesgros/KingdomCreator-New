import { createRouter, createWebHistory } from "vue-router";

export function AppCreateRouter(paths: string[], component: any) {
  return createRouter({
    history: createWebHistory(),
    routes: paths.map(
      path => { return { 
                    path : path,
                    component : component } }
    )
  });
};

export function AppCreateRouterMultiple(routes: { paths: string[], component: any }[]) {

console.log(routes.map(route => {
  const paths = Array.isArray(route.paths) ? route.paths : [route.paths];
  const routeRecords = paths.map(path => ({ path, component: route.component }));
  return routeRecords;
}).flat())

  const localRouter= createRouter({
    history: createWebHistory(),
    routes: routes.map(route => {
      const paths = Array.isArray(route.paths) ? route.paths : [route.paths];
      const routeRecords = paths.map(path => ({ path, component: route.component }));
      return routeRecords;
    }).flat()
  });
console.log ("localRouter", localRouter)
  return localRouter;
};