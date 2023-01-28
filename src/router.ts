/*import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);


export function createRouter(paths: string[], component: typeof Vue) {
  return new VueRouter({
    mode: "history",
    routes: paths.map(
      path => { return { name: path, path, component } }
    )
  });
};
*/

import { createRouter, createWebHistory } from "vue-router";

export function createRouter(paths: string[], component: typeof Vue) {
  var router = createRouter({
    history: createWebHistory(),
    routes: paths.map(
      path => { return { name: path, path, component } }
    )
  });
  
  return router
};