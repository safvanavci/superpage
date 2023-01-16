import React from "react";
import { Stats, Team } from "../index";
import { Avatar, Empty } from "antd";
import { FolderOutlined, PieChartOutlined } from "@ant-design/icons";
import { Pie } from "@ant-design/plots";
import { useSelector } from "react-redux";

export default function TasksHome() {
  const projects = useSelector((state) => state.slices.projects);

  const allTasks = projects.reduce((acc, val) => acc.concat(val.tasks), []);
  const newTasks = allTasks.filter((item) => item.status === "new");
  const workingTasks = allTasks.filter((item) => item.status === "working");
  const completedTasks = allTasks.filter((item) => item.status === "completed");
  const testingTasks = allTasks.filter((item) => item.status === "testing");

  const data = [
    {
      type: "Working On",
      value: workingTasks.length,
    },
    {
      type: "Completed Tasks",
      value: completedTasks.length,
    },
    {
      type: "New Tasks",
      value: newTasks.length,
    },
    {
      type: "Being Tested",
      value: testingTasks.length,
    },
  ];

  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    legend: {
      position: "bottom",
    },
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };

  return (
    <div>
      <Stats />
      <div className="xl:flex gap-x-5 my-5 block">
        <div className="border p-5 rounded-lg flex-1">
          <div className="border-b pb-3 flex items-center gap-x-3">
            <FolderOutlined />
            <h1>Projects</h1>
          </div>
          <div className="pt-3 flex flex-wrap gap-3 ">
            {projects.length === 0 ? (
              <div className="flex flex-col justify-center w-full">
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}>
                  <p>Create and start a new project</p>
                </Empty>
              </div>
            ) : (
              projects.map((project) => (
                <div
                  key={project._id}
                  className="flex items-center gap-x-3 border rounded-lg p-3 w-fit hover:shadow-lg "
                >
                  <Avatar style={{ backgroundColor: `${project.color}` }} />
                  <div>
                    <h1>{project.name}</h1>
                    <div className="text-[#777a7b] flex items-center gap-x-1 text-xs  w-fit mt-2">
                      <p>{project.createdAt.slice(0, 10)}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="border p-5 rounded-lg xl:w-1/2 mt-5 xl:mt-0 w-full">
          <div className="border-b pb-3 flex items-center gap-x-3">
            <PieChartOutlined />
            <h1>Total Tasks</h1>
          </div>
          <Pie {...config} />
        </div>
      </div>
      <Team />
    </div>
  );
}
