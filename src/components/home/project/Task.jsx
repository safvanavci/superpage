import React, { useState } from "react";
import axios from "axios";
import {
  TagOutlined,
  DesktopOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Avatar, Modal, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { changeTaskStatus, deleteTask } from "../../../redux/slices";

export default function Task({ item, id }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => state.slices.loggedUser);
  const projects = useSelector((state) => state.slices.projects);
  const project = projects.find((project) => project._id === id);
  const allUsers = useSelector((state) => state.slices.allUsers);
  const user = allUsers.find((user) => user._id === item.owner);

  const showModal = () => {
    !isModalOpen ? setIsModalOpen(true) : setIsModalOpen(false);
  };

  const deneme = async (item) => {
    let newStatus;
    if (item.status === "new") {
      newStatus = "working";
    } else if (item.status === "working") {
      newStatus = "testing";
    } else {
      newStatus = "completed";
    }
    const values = {
      id,
      taskId: item.id,
      newStatus,
    };
    try {
      dispatch(changeTaskStatus(values));
      showModal();
      const res = await axios.put(
        process.env.REACT_APP_API_URL + "/project/update-status",
        values
      );
      if (res.status === 200) {
        message.success("Succesfully");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleAgain = async (item) => {
    const values = {
      id,
      taskId: item.id,
      newStatus: "working",
    };
    dispatch(changeTaskStatus(values));
    showModal();
    await axios.put(
      process.env.REACT_APP_API_URL + "/project/update-status",
      values
    );
  };

  const handleDeleteTask = async () => {
    const values = {
      id,
      taskId: item.id,
    };
    try {
      dispatch(deleteTask(values));
      showModal();
      const res = await axios.put(
        process.env.REACT_APP_API_URL + "/project/delete-task",
        values
      );
      if (res.status === 200) {
        message.success("Task deleted");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <>
      <div
        className="border rounded-lg p-3 text-xs text-[#777a7b] select-none cursor-pointer hover:shadow-lg"
        onClick={showModal}
      >
        <h1 className="font-bold text-black">{item.title}</h1>
        <p className="truncate">{item.content}</p>
        <div className="flex justify-between items-center pt-3">
          <div className="flex gap-x-1 items-center">
            <Avatar src={user?.image}>
              {user?.name.slice(0, 1).toUpperCase()}
            </Avatar>
            <p className="">{item.date}</p>
          </div>
          <div className="flex items-center gap-x-1">
            <TagOutlined />
            <p>{item.tag}</p>
          </div>
        </div>
      </div>
      <Modal
        title={item.title}
        open={isModalOpen}
        onOk={showModal}
        onCancel={showModal}
        footer={false}
      >
        <p>{item.content}</p>
        <div className="flex text-[#777a7b] gap-x-1 pt-2">
          <p>Task completion date:</p>
          <p className="">{item.date}</p>
        </div>
        <div className="flex justify-between items-center pt-3 text-[#777a7b]">
          <div className="flex gap-x-1 items-center">
            <Avatar src={user?.image}>
              {user?.name.slice(0, 1).toUpperCase()}
            </Avatar>
            <p className="">{user?.name}</p>
          </div>
          <div className="flex items-center gap-x-1">
            <TagOutlined />
            <p>{item.tag}</p>
          </div>
        </div>
        <div className="flex justify-end mt-3">
          {loggedUser._id === item.owner && item.status === "new" && (
            <Button
              onClick={() => deneme(item)}
              className="border-none hover:bg-[#5bcadf]/30 bg-[#5bcadf]/20 hover:!border-[#5bcadf] text-[#0cd6ff] hover:!text-[#0cd6ff] flex items-center"
            >
              <DesktopOutlined />
              Work
            </Button>
          )}
          {loggedUser._id === item.owner && item.status === "working" && (
            <Button
              onClick={() => deneme(item)}
              className="border-none hover:bg-[#5bcadf]/30 bg-[#5bcadf]/20 hover:!border-[#5bcadf] text-[#0cd6ff] hover:!text-[#0cd6ff] flex items-center"
            >
              <CheckCircleOutlined />
              Submit to Test
            </Button>
          )}
          {loggedUser._id === project?.creater &&
            item.status === "completed" && (
              <Button
                onClick={handleDeleteTask}
                className="border-none hover:!bg-[#E61717]/30 !bg-[#E61717]/20 hover:!border-[#E61717] !text-[#E61717] hover:!text-[#E61717] flex items-center"
              >
                <CloseCircleOutlined />
                Delete
              </Button>
            )}
          {item.status === "testing" && loggedUser._id === project?.creater && (
            <div className="flex gap-x-2">
              <Button
                onClick={() => handleAgain(item)}
                className="border-none hover:!bg-[#E61717]/30 !bg-[#E61717]/20 hover:!border-[#E61717] !text-[#E61717] hover:!text-[#E61717] flex items-center"
              >
                <CloseCircleOutlined />
                Again
              </Button>
              <Button
                onClick={() => deneme(item)}
                className="border-none hover:bg-[#5bcadf]/30 bg-[#5bcadf]/20 hover:!border-[#5bcadf] text-[#0cd6ff] hover:!text-[#0cd6ff] flex items-center"
              >
                <CheckCircleOutlined />
                Completed
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
