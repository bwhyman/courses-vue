import * as types from "./types";
import axios from "@/util/Myaxios";

const ADMIN = "/admin";
export const adminmodule = {
  namespaced: true,
  state: {
    user: { name: null, number: null },
    cid: 0,
    expid: 0,
    hid: 0,
    hdid: 0,
    edid: 0,
    courses: [{ id: null, name: null }],
    expNum: 0,
    homeworkNum: 0,
    studentNum: 0,
    exps: [{ id: null, name: null, insertTime: null, course: { id: null } }],
    homeworks: [
      {
        id: null,
        title: null,
        content: null,
        insertTime: null,
        deadLineTime: null,
        course: { id: null }
      }
    ],
    course: { id: null, name: null, insertTime: null },
    students: [{ id: null, name: null, insertTime: null }],
    expDetails: [
      {
        id: null,
        solution: null,
        experiment: { id: null },
        completeTime: null
      }
    ],
    homeworkDetails: [
      { id: null, homework: { id: null }, solution: null, completeTime: null }
    ],
    loading: false,
    loaded: null
  },
  mutations: {
    [types.LIST_COURSES](state, courses) {
      state.courses = courses;
    },
    [types.CURRENT_COURSE](state, course) {
      state.course = course;
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
    },
    [types.LIST_EXP_DETAILS](state, expDetails) {
      state.expDetails = expDetails;
    },
    [types.LIST_HOMEWORK_DETAILS](state, details) {
      state.homeworkDetails = details;
    },
    getUser(state, user) {
      state.user = user;
    },
    [types.LOADING](state, loading) {
      state.loading = loading;
    },
    [types.GET_LOADED](state, loaded) {
      state.loaded = loaded;
    }
  },
  // ================  COURSES  =============
  actions: {
    async [types.LIST_COURSES]({ commit }) {
      let resp = await axios.get("/main");
      commit(types.LIST_COURSES, resp.data.courses);
    },

    async [types.GET_COURSE]({ commit }, cid) {
      let resp = await axios.get("/courses/" + cid);
      commit(types.CURRENT_COURSE, resp.data.course);
      commit("expNum", resp.data.expNum);
      commit("homeworkNum", resp.data.homeworkNum);
      commit("studentNum", resp.data.studentNum);
    },

    async [types.ADD_COURSE]({ commit }, course) {
      let resp = await axios.post(ADMIN + "/courses", course);
      commit(types.LIST_COURSES, resp.data.courses);
    },
    async [types.UPDATE_COURSE]({ commit }, data) {
      let resp = await axios.patch(ADMIN + "/courses/" + data.cid, data.course);
      commit(types.LIST_COURSES, resp.data.courses);
    },

    // ===========  EXPERIMENT  =============
    async [types.LIST_EXPS]({ commit }, cid) {
      let resp = await axios.get("/courses/" + cid + "/experiments");

      commit(types.LIST_EXPS, resp.data.exps);
    },
    async [types.ADD_EXP]({ commit }, data) {
      let resp = await axios.post(
        ADMIN + "/courses/" + data.cid + "/experiments",
        data.exp
      );
      commit(types.LIST_EXPS, resp.data.exps);
    },
    async [types.UPDATE_EXP]({ commit }, data) {
      let resp = await axios.patch(
        ADMIN + "/courses/" + data.cid + "/experiments/" + data.expid,
        data.exp
      );
      commit(types.LIST_EXPS, resp.data.exps);
    },
    async [types.DEL_EXP]({ commit }, data) {
      let resp = await axios.delete(
        ADMIN + "/courses/" + data.cid + "/experiments/" + data.expid
      );
      commit(types.LIST_EXPS, resp.data.exps);
    },
    async [types.LIST_EXP_UNSUBMITED](state, data) {
      let resp = await axios.get(
        ADMIN +
          "/courses/" +
          data.cid +
          "/experiments/" +
          data.expid +
          "/unsubmited"
      );
      return Promise.resolve(resp.data.students);
    },
    async [types.DOWNLOAD_ZIP]({ commit }, data) {
      commit(types.LOADING, true);
      axios
        .get(
          ADMIN +
            "/courses/" +
            data.cid +
            "/experiments/" +
            data.expid +
            "/zip",
          {
            responseType: "blob",
            onDownloadProgress: progressEvent => {
              commit(types.GET_LOADED, progressEvent.loaded);
            }
          }
        )
        .then(resp => {
          commit(types.LOADING, false);
          let filename = decodeURIComponent(resp.headers["filename"]);
          let url = window.URL.createObjectURL(new Blob([resp.data]));
          let link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", filename);
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(link);
        });
    },
    async [types.SUBMIT_EXP]({ commit }, data) {
      commit(types.LOADING, true);
      let resp = await axios.post(
        "/courses/" + data.cid + "/experiments/" + data.expid + "/file",
        data.form,
        {
          onUploadProgress: progressEvent => {
            commit(types.GET_LOADED, progressEvent.loaded);
          }
        }
      );
      commit(types.LOADING, false);
      commit(types.LIST_EXP_DETAILS, resp.data.expDetails);
    },
    async [types.DOWNLOAD_EXP]({ commit }, data) {
      commit(types.LOADING, true);
      axios
        .get(
          "/courses/" +
            data.cid +
            "/experiments/" +
            data.expid +
            "/experimentdetails/" +
            data.edid +
            "/file",
          {
            responseType: "blob",
            onDownloadProgress: progressEvent => {
              commit(types.GET_LOADED, progressEvent.loaded);
            }
          }
        )
        .then(resp => {
          commit(types.LOADING, false);
          let filename = decodeURIComponent(resp.headers["filename"]);
          let url = window.URL.createObjectURL(new Blob([resp.data]));
          let link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", filename);
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(link);
        });
    },
    async [types.LIST_EXP_DETAILS]({ commit }, cid) {
      let resp = await axios.get("/courses/" + cid + "/experimentdetails");
      commit(types.LIST_EXP_DETAILS, resp.data.expDetails);
    },

    // ==========  HOMEWORKS  ==
    async [types.LIST_HOMEWORKS]({ commit }, cid) {
      let resp = await axios.get("/courses/" + cid + "/homeworks");

      commit(types.LIST_HOMEWORKS, resp.data.homeworks);
    },
    async [types.ADD_HOMEWORK]({ commit }, data) {
      let resp = await axios.post(
        ADMIN + "/courses/" + data.cid + "/homeworks",
        data.homework
      );
      commit(types.LIST_HOMEWORKS, resp.data.homeworks);
    },
    async [types.UPDATE_HOMEWORK]({ commit }, data) {
      let resp = await axios.patch(
        ADMIN + "/courses/" + data.cid + "/homeworks/" + data.hid,
        data.homework
      );
      commit(types.LIST_HOMEWORKS, resp.data.homeworks);
    },
    async [types.DEL_HOMEWORK]({ commit }, data) {
      let resp = await axios.delete(
        ADMIN + "/courses/" + data.cid + "/homeworks/" + data.hid
      );
      commit(types.LIST_HOMEWORKS, resp.data.homeworks);
    },
    async [types.LIST_HOMEWORK_UNSUBMITED](state, data) {
      let resp = await axios.get(
        ADMIN +
          "/courses/" +
          data.cid +
          "/homeworks/" +
          data.hid +
          "/unsubmited"
      );
      return Promise.resolve(resp.data.students);
    },
    async [types.LIST_HOMEWORK_DETAILS]({ commit }, cid) {
      let resp = await axios.get("/courses/" + cid + "/homeworkdetails");
      commit(types.LIST_HOMEWORK_DETAILS, resp.data.homeworkDetails);
    },

    async [types.SUBMIT_HOMEWORK]({ commit }, data) {
      let resp = await axios.patch(
        "/courses/" + data.cid + "/homeworks/" + data.hid + "/homeworkdetail",
        data.detail
      );
      commit(types.LIST_HOMEWORK_DETAILS, resp.data.homeworkDetails);
    },
    async [types.GET_HOMEWORKDETAIL](state, data) {
      let resp = await axios.get(
        ADMIN +
          "/courses/" +
          data.cid +
          "/homeworks/" +
          data.hid +
          "/students/" +
          data.sid
      );
      return Promise.resolve(resp.data.homeworkDetail);
    },

    // =============  STUDENTS  ======

    async [types.LIST_STUDENTS]({ commit }, cid) {
      let resp = await axios.get(ADMIN + "/courses/" + cid + "/students");
      commit(types.LIST_STUDENTS, resp.data.students);
    },
    async [types.ADD_STUDENTS]({ commit }, data) {
      let resp = await axios.patch(
        ADMIN + "/courses/" + data.cid + "/students",
        data.students
      );
      commit(types.LIST_STUDENTS, resp.data.students);
      return Promise.resolve("");
    },
    async [types.UPDATE_STUDENT_PASSWORD](state, number) {
      await axios.put("/admin/students/" + number + "/password");
      return Promise.resolve("done");
    },

    // =======================

    async [types.GET_SETTING]({ commit }) {
      let resp = await axios.get("/setting");
      commit("getUser", resp.data.user);
    },
    async [types.UPDATE_PASSWORD](state, data) {
      await axios.patch("/updatepassword", data);
    }
  },
  getters: {}
};
