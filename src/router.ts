import { createRouter, createWebHistory } from "vue-router";

export function AppCreateRouter(paths: string[], component: any) {

  return createRouter({
    history: createWebHistory(),
    routes: paths.map(
      path => { return { 
                    name: component.name, 
                    path : path,
                    component : component } }
    )
  });
};