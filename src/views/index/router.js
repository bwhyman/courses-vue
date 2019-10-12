import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

let route = [
  {
    path: "/courses/:cid",
    props: true,
    component: () => import("./components/Courses"),
    children: [
      {
        path: "/",
        props: true,
        components: {
          button: () => import("./components/admin/EditCourseButton")
        }
      },
      {
        path: "experiments",
        props: true,
        components: {
          default: () => import("./components/Experiments"),
          button: () => import("./components/admin/AddExperimentButton")
        }
      },
      {
        path: "homeworks",
        props: true,
        components: {
          default: () => import("./components/Homeworks"),
          button: () => import("./components/admin/AddHomeworkButton")
        }
      }
    ]
  }
];

let adminRoutes = [
  {
    path: "students",
    props: true,
    components: {
      default: () => import("./components//admin/Students"),
      button: () => import("./components/admin/AddStudentsButton")
    }
  },
  {
    path: "experiments/:expid/unsubmited",
    props: true,
    components: {
      default: () => import("./components/admin/ExpUnsubmited"),
      button: () => import("./components/admin/AddExperimentButton")
    }
  },
  {
    path: "homeworks/:hid/unsubmited",
    props: true,
    components: {
      default: () => import("./components/admin/HomeworkUnsubmited"),
      button: () => import("./components/admin/AddHomeworkButton")
    }
  },
  {
    path: "homeworks/:hid/detail",
    props: true,
    components: {
      default: () => import("./components/admin/ShowHomeworkDetail"),
      button: () => import("./components/admin/AddHomeworkButton")
    }
  }
];

if (sessionStorage.getItem("role") == "6983f953b49c88210cb9") {
  let routeChildren = route[0].children.concat(adminRoutes);
  route[0].children = routeChildren;
}

export default new Router({
  routes: route
});
