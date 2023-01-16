import React, { useEffect, useState } from "react";
import { Stats } from "../index";
import { useSelector } from "react-redux";
import { Empty, Select, Tabs } from "antd";
import { Column, Pie } from "@ant-design/plots";
import { UserOutlined, FolderOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

export default function Dashboard() {
  const projects = useSelector((state) => state.slices.projects);

  const [data, setData] = useState([]);
  const [selectedTab, setSelectedTab] = useState();
  const [selectValue, setSelectValue] = useState("Please select");
  const [selectedProject, setSelectedProject] = useState(projects[0]?._id);

  const project = projects.find((project) => project._id === selectedProject);

  useEffect(() => {
    setSelectValue("Please select");
  }, [selectedTab]);

  const deneme = (key) => {
    setData([]);
    setSelectedProject(key);
    setSelectedTab(key);
  };

  const handleChange = async (value) => {
    setSelectValue(value);
    const project = await projects.filter(
      (project) => project._id === selectedProject
    )[0];
    const tasks = await project.tasks.filter((task) => task.owner === value);
    const user = await project.teams.find((user) => user.id === value);
    const newTasks = tasks.filter((task) => task.status === "new");
    const workingTasks = tasks.filter((task) => task.status === "working");
    const testingTasks = tasks.filter((task) => task.status === "testing");
    const completedTasks = tasks.filter((task) => task.status === "completed");

    setData([
      {
        name: user.name,
        status: "New",
        count: newTasks.length,
      },
      {
        name: user.name,
        status: "Working On",
        count: workingTasks.length,
      },
      {
        name: user.name,
        status: "Testing",
        count: testingTasks.length,
      },
      {
        name: user.name,
        status: "Completed",
        count: completedTasks.length,
      },
      {
        name: user.name,
        status: "Total",
        count: tasks.length,
      },
    ]);
  };

  const config = {
    data,
    isGroup: true,
    xField: "name",
    yField: "count",
    seriesField: "status",

    label: {
      position: "middle",
      layout: [
        {
          type: "interval-adjust-position",
        },
        {
          type: "interval-hide-overlap",
        },
        {
          type: "adjust-color",
        },
      ],
    },
  };

  const pieData = [
    {
      type: "Working On",
      value: project?.tasks.filter((task) => task.status === "working").length,
    },
    {
      type: "Completed Tasks",
      value: project?.tasks.filter((task) => task.status === "completed")
        .length,
    },
    {
      type: "New Tasks",
      value: project?.tasks.filter((task) => task.status === "new").length,
    },
    {
      type: "Being Tested",
      value: project?.tasks.filter((task) => task.status === "testing").length,
    },
  ];

  const pieConfig = {
    appendPadding: 10,
    data: pieData,
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
      <div className="border px-5 pb-5 rounded-lg mt-5">
        {projects.length <= 0 ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}>
            <p>Create and start a new project</p>
          </Empty>
        ) : (
          <Tabs centered onChange={deneme} activeKey={selectedTab}>
            {projects.map((project) => (
              <TabPane tab={project.name} key={project._id}>
                <div className="xl:flex justify-between xl:gap-x-3">
                  <div className="xl:w-1/2 w-full">
                    <div className="flex items-center pb-3 gap-x-2">
                      <UserOutlined />
                      User Statistics
                    </div>
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Please select"
                      onChange={handleChange}
                      value={selectValue}
                    >
                      {project.teams.map((user) => (
                        <Select.Option key={user.id}>
                          @{user.username}
                        </Select.Option>
                      ))}
                    </Select>
                    <Column {...config} />
                  </div>
                  <div className="xl:w-1/2 w-full mt-5 xl:mt-0">
                    <div className="flex items-center pb-3 gap-x-2">
                      <FolderOutlined />
                      Project Statistics
                    </div>
                    <Pie {...pieConfig} />
                  </div>
                </div>
              </TabPane>
            ))}
          </Tabs>
        )}
      </div>
    </div>
  );
}
