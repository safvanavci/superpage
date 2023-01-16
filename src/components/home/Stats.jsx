import React from "react";
import {
  FileDoneOutlined,
  FormOutlined,
  FileAddOutlined,
  CopyOutlined,
  FolderOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

export default function Stats() {
  const projects = useSelector((state) => state.slices.projects);
  const user = useSelector((state) => state.slices.loggedUser);

  const allTasks = projects.reduce((acc, val) => acc.concat(val.tasks), []);
  const newTasks = allTasks.filter((item) => item.status === "new");
  const workingTasks = allTasks.filter((item) => item.status === "working");
  const completedTasks = allTasks.filter((item) => item.status === "completed");

  return (
    <div className="border p-5 rounded-lg">
      <div className="border-b pb-3 ">
        <h1>Hi {user.name}</h1>
        <p className=" text-[#777a7b] text-sm">
          {"Be proud of what you've done today!"}
        </p>
      </div>
      <div className="flex justify-between flex-wrap">
        <div className="flex pt-3 gap-x-3 min-w-[200px]">
          <div className="min-w-[60px] h-[60px] text-[#5bcadf] text-[25px] rounded-full border border-[#5bcadf] flex items-center justify-center">
            <CopyOutlined />
          </div>
          <div>
            <p className="text-sm text-[#777a7b]">Total Tasks</p>
            <p className="text-xl">{allTasks.length}</p>
          </div>
        </div>
        <div className="flex pt-3 gap-x-3 min-w-[200px]">
          <div className="min-w-[60px] h-[60px] text-[#5bcadf] text-[25px] rounded-full border border-[#5bcadf] flex items-center justify-center">
            <FileDoneOutlined />
          </div>
          <div>
            <p className="text-sm text-[#777a7b]">Completed Tasks</p>
            <p className="text-xl">{completedTasks.length}</p>
          </div>
        </div>
        <div className="flex pt-3 gap-x-3 min-w-[200px]">
          <div className="min-w-[60px] h-[60px] text-[#5bcadf] text-[25px] rounded-full border border-[#5bcadf] flex items-center justify-center">
            <FormOutlined />
          </div>
          <div>
            <p className="text-sm text-[#777a7b]">Working On</p>
            <p className="text-xl">{workingTasks.length}</p>
          </div>
        </div>
        <div className="flex pt-3 gap-x-3 min-w-[200px]">
          <div className="min-w-[60px] h-[60px] text-[#5bcadf] text-[25px] rounded-full border border-[#5bcadf] flex items-center justify-center">
            <FileAddOutlined />
          </div>
          <div>
            <p className="text-sm text-[#777a7b]">New Tasks</p>
            <p className="text-xl">{newTasks.length}</p>
          </div>
        </div>
        <div className="flex pt-3 gap-x-3 min-w-[200px]">
          <div className="min-w-[60px] h-[60px] text-[#5bcadf] text-[25px] rounded-full border border-[#5bcadf] flex items-center justify-center">
            <FolderOutlined />
          </div>
          <div>
            <p className="text-sm text-[#777a7b]">Projects</p>
            <p className="text-xl">{projects.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
