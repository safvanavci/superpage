import { createSlice } from "@reduxjs/toolkit";

export const slices = createSlice({
  name: "slices",
  initialState: {
    projects: [],
    otherProjects: [],
    allUsers: [],
    loggedUser: {},
    addProjectModal: false,
  },
  reducers: {
    modalOpen: (state) => {
      state.addProjectModal = state.addProjectModal === false ? true : false;
    },
    setProject: (state, action) => {
      state.projects = action.payload;
    },
    setOtherProjects: (state, action) => {
      state.otherProjects = action.payload;
    },
    changeTaskStatus: (state, action) => {
      const project = state.projects.find(
        (item) => item._id === action.payload.id
      );
      const task = project.tasks.find(
        (item) => item.id === action.payload.taskId
      );
      task.status = action.payload.newStatus;
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setUser: (state, action) => {
      state.loggedUser = action.payload;
    },
    deleteProject: (state, action) => {
      const removeItem = state.projects.find(
        (item) => item._id === action.payload.id
      );
      const index = state.projects.indexOf(removeItem);
      state.projects.splice(index, 1);
    },
    deleteTask: (state, action) => {
      const project = state.projects.find(
        (item) => item._id === action.payload.id
      );
      const task = project.tasks.find(
        (item) => item.id === action.payload.taskId
      );
      const index = project.tasks.indexOf(task);
      project.tasks.splice(index, 1);
    },

    addTeamUser: (state, action) => {
      const project = state.projects.find(
        (item) => item._id === action.payload.projectId
      );
      const user = state.allUsers.find(
        (item) => item._id === action.payload.userId
      );
      project.teams.push({
        id: action.payload.userId,
        name: user.name,
        username: user.username,
        image: user.image,
      });
    },

    deleteUser: (state, action) => {
      const project = state.projects.find(
        (item) => item._id === action.payload.projectId
      );
      const user = project.teams.find(
        (item) => item.id === action.payload.userId
      );
      const index = project.teams.indexOf(user);
      project.teams.splice(index, 1);
    },
    addTask: (state, action) => {
      const { title, content, tag, status, date, owner } = action.payload;
      const project = state.projects.find(
        (item) => item._id === action.payload.id
      );
      project.tasks.push({
        id: project.tasks.length + 1,
        title,
        content,
        tag,
        status,
        date,
        owner,
      });
    },
  },
});

export const {
  setProject,
  changeTaskStatus,
  setUser,
  setAllUsers,
  setOtherProjects,
  deleteProject,
  deleteTask,
  deleteUser,
  addTeamUser,
  addTask,
  modalOpen,
} = slices.actions;
export default slices.reducer;
