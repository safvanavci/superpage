import React, { useState } from "react";
import axios from "axios";
import { Menu, message, Modal, Button, Form, Input, Avatar } from "antd";
import {
  FolderOutlined,
  HomeOutlined,
  LineChartOutlined,
  TeamOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { modalOpen, setProject } from "../../redux/slices";
import Logo from "../Logo";

const { SubMenu } = Menu;

export default function Sidebar() {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const projects = useSelector((state) => state.slices.projects);
  const otherProject = useSelector((state) => state.slices.otherProjects);
  const addProjectModal = useSelector((state) => state.slices.addProjectModal);

  const handleModal = () => {
    dispatch(modalOpen());
  };

  const onFinish = async (values) => {
    setLoading(true);
    const user = localStorage.getItem("user");
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL + "/project/projects",
        {
          ...values,
          creater: user,
        }
      );
      if (res.status === 200) {
        const allProjects = await axios.get(
          process.env.REACT_APP_API_URL + `/project/get-all-projects`
        );
        const projects = await allProjects.data.filter(
          (item) => item.creater === user
        );
        dispatch(setProject(projects));
        handleModal();
        message.success(values.name + " created");
        form.resetFields();
      }
    } catch (error) {
      message.error("Check your username or password");
    }
    setLoading(false);
  };

  return (
    <div className="h-screen bg-[#f9f9f9] border-r px-5 fixed overflow-y-auto">
      <div className="p-2 mb-4 mt-2">
        <Logo />
      </div>
      <Menu
        style={{
          width: 256,
        }}
        defaultOpenKeys={["9", "7"]}
        defaultSelectedKeys={["1"]}
        mode="inline"
      >
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="home">Home</Link>
        </Menu.Item>

        <Menu.Item key="2" icon={<LineChartOutlined />}>
          <Link to="dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<TeamOutlined />}>
          <Link to="teams">Teams</Link>
        </Menu.Item>
        <SubMenu key="7" title="My Projects" icon={<FolderOutlined />}>
          <Menu.Item
            key="8"
            icon={<PlusSquareOutlined />}
            onClick={handleModal}
          >
            New Project
          </Menu.Item>
          {projects.map((project, i) => (
            <Menu.Item
              key={i + 11}
              icon={
                <Avatar size={15} style={{ backgroundColor: project.color }} />
              }
            >
              <Link to={`project/${project._id}`}>{project.name}</Link>
            </Menu.Item>
          ))}
        </SubMenu>
        <SubMenu key="9" title="Other Projects" icon={<FolderOutlined />}>
          {otherProject.map((project, i) => (
            <Menu.Item
              key={i + 20}
              icon={
                <Avatar size={15} style={{ backgroundColor: project.color }} />
              }
            >
              <Link to={`project/${project._id}`}>{project.name}</Link>
            </Menu.Item>
          ))}
        </SubMenu>
      </Menu>
      <Modal
        title="New Project"
        open={addProjectModal}
        onOk={handleModal}
        onCancel={handleModal}
        footer={false}
      >
        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Project Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your porject name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Color"
            name="color"
            rules={[
              {
                required: true,
                message: "Choose a color for your project",
              },
            ]}
          >
            <Input type="color" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
