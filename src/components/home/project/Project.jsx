import React, { useState } from "react";
import { Completed, NewTasks, Testing, WorkingOn } from "../../index";
import axios from "axios";
import { Button, Modal, Form, Input, message, Select, Popconfirm } from "antd";
import { PlusOutlined, CopyOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteProject } from "../../../redux/slices";

export default function Project() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams();

  const projects = useSelector((state) => state.slices.projects);
  const otherProjects = useSelector((state) => state.slices.otherProjects);
  const loggedUser = useSelector((state) => state.slices.loggedUser);

  const project = projects.filter((item) => item._id === id)[0];
  const otherProject = otherProjects.filter((item) => item._id === id)[0];

  const tasks = otherProject?.tasks.filter(
    (item) => item.owner === loggedUser._id
  );

  const newTask =
    project?.tasks.filter((item) => item.status === "new") ||
    tasks?.filter((item) => item.status === "new");
  const working =
    project?.tasks.filter((item) => item.status === "working") ||
    tasks?.filter((item) => item.status === "working");
  const testing =
    project?.tasks.filter((item) => item.status === "testing") ||
    tasks?.filter((item) => item.status === "testing");
  const completed =
    project?.tasks.filter((item) => item.status === "completed") ||
    tasks?.filter((item) => item.status === "completed");

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL + "/project/add-task",
        {
          ...values,
          id,
          status: "new",
        }
      );
      if (res.status === 200) {
        dispatch(addTask({ ...values, id, status: "new" }));
        message.success("Task added");
        form.resetFields();
        showModal();
      }
    } catch (error) {
      message.error(error.message);
    }
    setLoading(false);
  };

  const confirm = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/project/delete-project?id=${id}`
      );
      dispatch(deleteProject(id));
      navigate("/home");
    } catch (error) {
      message.error(error.message);
    }
  };

  const showModal = () => {
    !isModalOpen ? setIsModalOpen(true) : setIsModalOpen(false);
  };

  return (
    <div className="border p-5 rounded-lg w-full">
      <div className="border-b pb-3 flex items-center justify-between">
        <div className="flex items-center gap-x-3">
          <CopyOutlined />
          <h1>Tasks Board</h1>
        </div>
        {project?.creater === loggedUser._id && (
          <div className="flex gap-x-2">
            <Popconfirm
              placement="bottom"
              title="Are you sure to delete this project?"
              description={`Delete ${project?.name}`}
              onConfirm={() => confirm(project._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button className="border-none hover:!bg-[#E61717]/30 !bg-[#E61717]/20 !hover:!border-[#E61717] !text-[#E61717] hover:!text-[#E61717] flex items-center">
                <DeleteOutlined />
                Delete
              </Button>
            </Popconfirm>
            <Button
              onClick={showModal}
              className="border-none  hover:!border-[#5bcadf] text-[#0cd6ff] hover:!text-[#0cd6ff] flex items-center"
            >
              <PlusOutlined />
              Add
            </Button>
          </div>
        )}
      </div>
      <div className="pt-3 flex sm:justify-between justify-center gap-y-5 text-[20px] flex-wrap">
        <NewTasks newTask={newTask} id={id} />
        <WorkingOn working={working} id={id} />
        <Testing testing={testing} id={id} />
        <Completed completed={completed} id={id} />
      </div>
      <Modal
        title="Add New Task"
        footer={false}
        open={isModalOpen}
        onOk={showModal}
        onCancel={showModal}
      >
        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Task Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input title!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Task Content"
            name="content"
            rules={[
              {
                required: true,
                message: "Please input content!",
              },
            ]}
          >
            <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
          </Form.Item>
          <Form.Item
            label="Tag"
            name="tag"
            rules={[
              {
                required: true,
                message: "Please input one tag!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="owner"
            label="Owner"
            rules={[
              {
                required: true,
                message: "Please select one owner!",
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
              {project?.teams.map((user) => (
                <Select.Option label={user.username} key={user.id}>
                  @{user.username}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Date"
            name="date"
            rules={[
              {
                required: true,
                message: "Please select date!",
              },
            ]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
