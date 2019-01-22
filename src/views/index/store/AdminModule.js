import * as types from "./types";
import axios from "@/util/Myaxios";

const ADMIN = "/admin";
export const adminmodule = {
  namespaced: true,
  state: {
    courses: [],
    expNum: 0,
    homeworkNum: 0,
    studentNum: 0,
    expUnStudents: [],
    exps: [],
    homeworks: [],
    course: null,
    students: []
  },
  mutations: {
    [types.LIST_COURSES](state, courses) {
      state.courses = courses;
    },
    [types.CURRENT_COURSE](state, cid) {
      state.course = state.courses.find(c => c.id == cid);
    },
    expNum(state, num) {
      state.expNum = num;
    },
    homeworkNum(state, num) {
      state.homeworkNum = num;
    },
    studentNum(state, num) {
      state.studentNum = num;
    },
    [types.LIST_EXPS](state, exps) {
      state.exps = exps;
    },
    [types.LIST_HOMEWORKS](state, homeworks) {
      state.homeworks = homeworks;
    },
    [types.LIST_STUDENTS](state, students) {
      state.students = students;
    }
  },
  actions: {
    async [types.LIST_COURSES]({ commit }) {
      let resp = await axios.get("/main");
      commit(types.LIST_COURSES, resp.data.courses);
    },

    async [types.GET_COURSE]({ commit }, data) {
      let resp = await axios.get(data.path);
      commit(types.CURRENT_COURSE, data.cid);
      commit("expNum", resp.data.expNum);
      commit("homeworkNum", resp.data.homeworkNum);
      commit("studentNum", resp.data.studentNum);
    },
    async [types.ADD_COURSE]({ commit }, course) {
      let resp = await axios.post(ADMIN + "/courses", course);
      commit(types.LIST_COURSES, resp.data.courses);
    },
    async [types.UPDATE_COURSE]({ commit }, data) {
      let resp = await axios.patch(ADMIN + data.path, data.course);
      commit(types.LIST_COURSES, resp.data.courses);
    },
    async [types.LIST_EXPS]({ commit }, data) {
      let resp = await axios.get(data.path);
      commit(types.CURRENT_COURSE, data.cid);
      commit(types.LIST_EXPS, resp.data.exps);
    },
    async [types.ADD_EXP]({ commit }, data) {
      let resp = await axios.post(ADMIN + data.path, data.exp);
      commit(types.LIST_EXPS, resp.data.exps);
    },
    async [types.UPDATE_EXP]({ commit }, data) {
      let resp = await axios.patch(ADMIN + data.path, data.exp);
      commit(types.LIST_EXPS, resp.data.exps);
    },
    async [types.DEL_EXP]({ commit }, path) {
      let resp = await axios.delete(ADMIN + path);
      commit(types.LIST_EXPS, resp.data.exps);
    },
    async [types.LIST_EXP_UNSUBMITED](state, path) {
      let resp = await axios.get(path);
      return Promise.resolve(resp.data.students);
    },
    async [types.LIST_HOMEWORKS]({ commit }, data) {
      let resp = await axios.get(data.path);
      commit(types.CURRENT_COURSE, data.cid);
      commit(types.LIST_HOMEWORKS, resp.data.homeworks);
    },
    async [types.ADD_HOMEWORK]({ commit }, data) {
      let resp = await axios.post(ADMIN + data.path, data.homework);
      commit(types.LIST_HOMEWORKS, resp.data.homeworks);
    },
    async [types.UPDATE_HOMEWORK]({ commit }, data) {
      let resp = await axios.patch(data.path, data.homework);
      commit(types.LIST_HOMEWORKS, resp.data.homeworks);
    },
    async [types.DEL_HOMEWORK]({ commit }, path) {
      let resp = await axios.delete(ADMIN + path);
      commit(types.LIST_HOMEWORKS, resp.data.homeworks);
    },
    async [types.LIST_HOMEWORK_UNSUBMITED](state, path) {
      let resp = await axios.get(path);
      return Promise.resolve(resp.data.students);
    },

    async [types.LIST_STUDENTS]({ commit }, path) {
      let resp = await axios.get(path);
      commit(types.LIST_STUDENTS, resp.data.students);
    },
    async [types.ADD_STUDENTS]({ commit }, data) {
      let resp = await axios.patch(data.path, data.students);
      commit(types.LIST_STUDENTS, resp.data.students);
    },
    async [types.UPDATE_STUDENT_PASSWORD](state, number) {
      await axios.put("/admin/students/" + number + "/password");
      return Promise.resolve("done");
    }
  },
  getters: {
    getCourseName: state => cid => {
      let name = "";
      let course = state.courses.find(c => c.id == cid);
      if (course != null) {
        name = course.name;
      }
      return name;
    }
  }
};
