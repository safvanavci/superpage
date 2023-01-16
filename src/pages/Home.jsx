import React, { useEffect, useState } from "react";
import {
  Dashboard,
  TasksHome,
  Team,
  Project,
  Header,
  Sidebar,
} from "../components/index";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setProject,
  setAllUsers,
  setUser,
  setOtherProjects,
} from "../redux/slices";
import { Spin } from "antd";
import Notfound from "./Notfound";

export default function Home() {
  const [loader, setLoader] = useState(true);

  const dispatch = useDispatch();

  const user = localStorage.getItem("user");

  const getProjects = async () => {
    const allProjects = await axios.get(
      process.env.REACT_APP_API_URL + `/project/get-all-projects`
    );
    const otherProject = await allProjects.data.filter((project) =>
      project.teams.find((item) => item.id === user)
    );
    const projects = await allProjects.data.filter(
      (item) => item.creater === user
    );
    dispatch(setProject(projects));
    dispatch(setOtherProjects(otherProject));
    setLoader(false);
  };

  const getUsers = async () => {
    const allUsers = await axios.get(
      process.env.REACT_APP_API_URL + "/api/get-all-user"
    );
    const loggedUser = await allUsers.data.find((item) => item._id === user);
    dispatch(setAllUsers(allUsers.data));
    dispatch(setUser(loggedUser));
  };

  useEffect(() => {
    getProjects();
    getUsers();
  }, []);

  return (
    <>
      {loader ? (
        <Spin
          size="large"
          className=" h-screen w-full flex justify-center items-center"
        />
      ) : (
        <div className="flex">
          <div className="h-screen w-[295px] hidden lg:inline ">
            <Sidebar />
          </div>
          <div className="flex-1">
            <Header />
            <div className="max-w-[1400px] mx-auto py-5 2xl:px-0 px-5 ">
              <Routes>
                <Route path="home" element={<TasksHome />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="teams" element={<Team />} />
                <Route path="project/:id" element={<Project />} />
                <Route path="notfound" element={<Notfound />} />
              </Routes>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
