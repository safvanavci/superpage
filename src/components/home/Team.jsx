import React, { useState } from "react";
import axios from "axios";
import { Button, Modal, Select, Avatar, Form, Empty, message } from "antd";
import { TeamOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { addTeamUser, deleteUser } from "../../redux/slices";

export default function Team() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const projects = useSelector((state) => state.slices.projects);
  const allUsers = useSelector((state) => state.slices.allUsers);
  const selectUser = projects.filter((item) => item._id === selectedProject)[0]
    ?.teams;

  const handleChange = (value) => {
    setSelectedProject(value);
  };

  const onFinish = async (values) => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL + "/project/add-team",
        values
      );
      if (res.status === 200) {
        message.success("User added");
        dispatch(addTeamUser(values));
        showModal();
        form.resetFields();
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
    !isModalOpen ? setIsModalOpen(true) : setIsModalOpen(false);
  };

  const handleDeleteUser = async (projectId, userId) => {
    setLoading(true);
    try {
      const res = await axios.put(
        process.env.REACT_APP_API_URL + "/project/delete-user",
        {
          projectId,
          userId,
        }
      );
      if (res.status === 200) {
        dispatch(deleteUser({ projectId, userId }));
        message.success("User deleted");
      }
    } catch (error) {
      message.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="border p-5 rounded-lg w-full">
      <div className="border-b pb-3 flex items-center  justify-between">
        <div className="flex items-center gap-x-3">
          <TeamOutlined />
          <h1>My Teams</h1>
        </div>
        <Button
          onClick={showModal}
          className="border-none hover:bg-[#5bcadf]/30 bg-[#5bcadf]/20 hover:!border-[#5bcadf] text-[#0cd6ff] hover:!text-[#0cd6ff] flex items-center"
        >
          <PlusOutlined />
          Add
        </Button>
      </div>
      {projects.length === 0 ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}>
          <p>Create and start a new project</p>
        </Empty>
      ) : (
        projects.map((project) => (
          <div key={project._id} className="py-3">
            <div className="flex items-center gap-x-2">
              <Avatar
                size={20}
                style={{ backgroundColor: `${project.color}` }}
              />
              {project.name}
            </div>

            <div className="py-3 pt-3 flex flex-wrap gap-3 text-sm">
              {project.teams.length === 0 ? (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  className="flex flex-col justify-center w-full"
                >
                  <p>Add your team co-workers</p>
                </Empty>
              ) : (
                project.teams.map((user) => (
                  <div
                    key={user.id}
                    className="border p-5 rounded-lg w-[150px] flex flex-col items-center gap-y-5 relative"
                  >
                    <Button
                      type="primary"
                      className="absolute top-1 right-1 border-none hover:!bg-[#E61717]/30 !bg-[#E61717]/20 hover:!border-[#E61717] !text-[#E61717] hover:!text-[#E61717] flex items-center justify-center h-6 !w-6"
                      icon={<DeleteOutlined />}
                      onClick={() => handleDeleteUser(project._id, user.id)}
                      loading={loading}
                    ></Button>
                    <Avatar src={user.image} size={64}>
                      {user?.name.slice(0, 1).toUpperCase()}
                    </Avatar>

                    <h1>{user.name}</h1>
                  </div>
                ))
              )}
            </div>
          </div>
        ))
      )}
      <Modal
        title="Add New Team Friend"
        open={isModalOpen}
        onOk={showModal}
        onCancel={showModal}
        footer={false}
      >
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            name={"projectId"}
            rules={[
              {
                required: true,
                message: "Please select one project!",
              },
            ]}
          >
            <Select
              style={{ width: "100%" }}
              placeholder="Please select"
              onChange={handleChange}
            >
              {projects.map((project) => (
                <Select.Option key={project._id}>
                  <Avatar
                    size={20}
                    style={{ backgroundColor: `${project.color}` }}
                    className="mr-2"
                  />
                  {project.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name={"userId"}
            rules={[
              {
                required: true,
                message: "Please select one user!",
              },
            ]}
          >
            <Select
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              style={{
                width: "100%",
              }}
              placeholder="Please select"
            >
              {allUsers.map((user) => (
                <Select.Option
                  label={user.username}
                  key={user._id}
                  disabled={
                    !selectedProject ||
                    selectUser.find((item) => item.id === user._id)
                  }
                >
                  @{user.username}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Kaydol
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
