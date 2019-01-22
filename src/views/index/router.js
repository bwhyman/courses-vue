import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

let route = [
  // {
  //   path: "/",
  //   component: () => import("./components/admin/Courses.vue")
  // },
  {
    path: "/courses/:cid",
    props: true,
    component: () => import("./components/Courses.vue")
  },
  {
    path: "/courses/:cid/experiments",
    props: true,
    component: () => import("./components/Experiments.vue")
  },
  {
    path: "/courses/:cid/homeworks",
    props: true,
    component: () => import("./components/Homeworks.vue")
  }
];

let adminRoutes = [
  {
    path: "/admin/experiments/:expid/unsubmited",
    props: true,
    component: () => import("./components/admin/ExpUnsubmited.vue")
  },
  {
    path: "/admin/courses/:cid/students",
    props: true,
    component: () => import("./components/admin/Students.vue")
  },
  {
    path: "/admin/homeworks/:hid/unsubmited",
    props: true,
    component: () => import("./components/admin/HomeworkUnsubmited.vue")
  }
];

if (sessionStorage.getItem("role") == 1) {
  route = route.concat(adminRoutes);
}

export default new Router({
  routes: route
});
