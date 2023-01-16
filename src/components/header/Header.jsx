import React, { useState, useEffect } from "react";
import { Sidebar } from "../index";
import { SearchOutlined, PlusOutlined, MenuOutlined } from "@ant-design/icons";
import { Avatar, Button, Drawer, Input, Dropdown } from "antd";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { modalOpen } from "../../redux/slices";

export default function Header() {
  const [title, setTitle] = useState("Tasks Home");
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.slices.loggedUser);
  const projects = useSelector((state) => state.slices.projects);
  const otherProjects = useSelector((state) => state.slices.otherProjects);

  useEffect(() => {
    if (pathname === "/dashboard") {
      setTitle("Dashboard");
    } else if (pathname === "/home") {
      setTitle("Home");
    } else if (pathname === "/teams") {
      setTitle("Teams");
    } else {
      const id = pathname.slice(9);
      const project = projects.find((item) => item._id === id);
      if (!project) {
        const project = otherProjects.find((item) => item._id === id);
        if (!project) {
          navigate("notfound");
          setTitle("Not Found");
        } else {
          setTitle(project.name);
        }
      } else {
        setTitle(project.name);
      }
    }
  }, [pathname]);

  const handleLogOut = () => {
    localStorage.removeItem("user");
  };

  const items = [
    {
      key: "1",
      label: (
        <Link onClick={handleLogOut} to="/">
          Log Out
        </Link>
      ),
    },
  ];

  const showDrawer = () => {
    !open ? setOpen(true) : setOpen(false);
  };

  return (
    <div className="h-[60px] border-b">
      <div className=" max-w-[1400px] mx-auto flex h-full items-center justify-between 2xl:px-0 px-5">
        <div className="flex items-center gap-x-2">
          <Button
            onClick={showDrawer}
            icon={<MenuOutlined />}
            type="primary"
            className="lg:hidden flex justify-center items-center border-[#777a7b]/20 hover:!bg-white !bg-white !text-slate-500"
          />
          <p className="w-[100px] opacity-60">{title}</p>
        </div>
        <div className="max-w-[500px] flex-1 hidden lg:block">
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            className="bg-[#ededed]"
          />
        </div>
        <div className="flex gap-x-3">
          <Avatar
            size={35}
            icon={<PlusOutlined />}
            className="flex items-center justify-center cursor-pointer"
            onClick={() => dispatch(modalOpen())}
          />
          <Dropdown
            menu={{
              items,
            }}
            placement="bottomRight"
            arrow
          >
            {(user.image && <Avatar src={user.image} size={35} />) || (
              <Avatar size={35} className="cursor-pointer">
                {user.name?.slice(0, 1).toUpperCase()}
              </Avatar>
            )}
          </Dropdown>
        </div>
      </div>
      <Drawer
        placement="left"
        closable={false}
        onClose={showDrawer}
        open={open}
        key="left"
        width={295}
        className="!p-0"
      >
        <Sidebar />
      </Drawer>
    </div>
  );
}
