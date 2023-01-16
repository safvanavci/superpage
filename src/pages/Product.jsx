import React from "react";
import Icon from "../assets/icon-white.png";
import Image from "../assets/tasks.gif";
import Image1 from "../assets/1.gif";
import Image2 from "../assets/2.gif";
import Image3 from "../assets/3.gif";
import Image4 from "../assets/4.gif";
import { Logo } from "../components";
import { Link } from "react-router-dom";
import { Button } from "antd";
import {
  RocketOutlined,
  MailOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  PlusOutlined,
  LineChartOutlined,
  UserAddOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";

export default function Product() {
  return (
    <>
      <header className="py-3 border-b px-2 md:px-0">
        <div className="flex justify-between container mx-auto">
          <Logo />
          <div className="flex gap-x-2">
            <Link to="/login">
              <Button
                type="primary"
                className="!bg-white border-[#5bcadf] hover:!bg-slate-400/20"
              >
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button type="primary">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>
      <div className="overflow-hidden relative w-full">
        <div className="flex container mx-auto xl:justify-between justify-center flex-wrap py-5 md:px-0 px-10 gap-y-5">
          <div className=" max-w-[500px] my-auto flex flex-col gap-y-3 ">
            <h1 className="text-5xl">Superpage helps you manage tasks</h1>
            <p>
              Create your projects on superpage, add teammates, manage and track
              tasks easily
            </p>
            <div>
              <Link to="/register">
                <Button type="primary">Sign up - it’s free!</Button>
              </Link>
            </div>
          </div>
          <div className="max-w-[700px] rounded-xl shadow-2xl overflow-hidden">
            <img src={Image} alt="" />
          </div>
        </div>
        <div className="absolute bg-[#5bcadf] h-[1000px] w-[2000px] -rotate-45 top-0 -left-[200px] lg:left-[200px] 2xl:left-[550px] -z-10"></div>
      </div>
      <div className="container mx-auto flex flex-col items-center py-10">
        <div className="flex items-center gap-x-2 text-2xl">
          <RocketOutlined />
          <h1 className="text-xl font-bold">Superpage is really super</h1>
          <RocketOutlined />
        </div>
        <p className="text-sm py-3 px-5">
          Superpage does not welcome you with a complex structure. All you have
          to do is create an account and get started.
        </p>
      </div>
      <div className="max-w-[900px] mx-auto flex flex-col gap-y-10 relative px-10">
        <div className="h-full w-[6px] bg-[#5bcadf] absolute left-1/2 -z-10 -ml-[3px]"></div>
        <div className="flex flex-wrap justify-center lg:justify-between border rounded-xl p-3 hover:bg-[#ebf9fc] duration-500 hover:scale-110 bg-white">
          <div className="rounded-xl shadow-xl overflow-hidden max-w-[400px]">
            <img src={Image2} alt="" />
          </div>
          <div className="w-[350px] px-5 my-auto text-sm pt-5 lg:pt-0">
            <div className="flex items-center text-base font-bold gap-x-1">
              <PlusSquareOutlined />
              <h1>Create New Project</h1>
            </div>
            <p>
              {
                "Create a new project. Enter a name for your project and specify a color. That's how easy it is."
              }
            </p>
          </div>
        </div>
        <div className="flex flex-wrap-reverse justify-center lg:justify-between border rounded-xl p-3 hover:bg-[#ebf9fc] duration-500 hover:scale-110 bg-white">
          <div className="w-[350px] px-5 my-auto text-sm pt-5 lg:pt-0">
            <div className="flex items-center text-base font-bold gap-x-1">
              <UserAddOutlined />
              <h1>Expand your team</h1>
            </div>
            <p>
              Add and manage your teammates to the project. Your teammates can
              only see the tasks you have given them. Your teammates cannot add
              or delete tasks to the project.
            </p>
          </div>
          <div className="rounded-xl shadow-xl overflow-hidden max-w-[400px]">
            <img src={Image3} alt="" />
          </div>
        </div>
        <div className="flex flex-wrap justify-center lg:justify-between border rounded-xl p-3 hover:bg-[#ebf9fc] duration-500 hover:scale-110 bg-white">
          <div className="rounded-xl shadow-xl overflow-hidden max-w-[400px]">
            <img src={Image1} alt="" />
          </div>
          <div className="w-[350px] px-5 my-auto text-sm pt-5 lg:pt-0">
            <div className="flex items-center text-base font-bold gap-x-1">
              <PlusOutlined />
              <h1>Add Task</h1>
            </div>
            <p>
              Add a task. Enter descriptive content for successful completion of
              the task. Set a label for the task, it can be useful for grouping
              tasks. Determine who will perform the task. And specify when the
              task should be completed.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap-reverse justify-center lg:justify-between border rounded-xl p-3 hover:bg-[#ebf9fc] duration-500 hover:scale-110 bg-white">
          <div className="w-[350px] px-5 my-auto text-sm pt-5 lg:pt-0">
            <div className="flex items-center text-base font-bold gap-x-1">
              <LineChartOutlined />
              <h1>Review Statistics</h1>
            </div>
            <p>
              {`Review your project statistics. How many tasks have been completed, how many tasks are
              being worked on. Or check your teammates' stats. Teammates cannot
              access this information.`}
            </p>
          </div>
          <div className="rounded-xl shadow-xl overflow-hidden max-w-[400px]">
            <img src={Image4} alt="" />
          </div>
        </div>
      </div>
      <section className="max-w-[600px] mx-auto py-10 px-3 text-center">
        <p className="py-3 text-2xl font-bold">
          {
            "Using Superpage is that easy. If you haven't started yet, try Superpage. I'm curious about your ideas, don't forget to contact me."
          }
        </p>
        <Link to="/register">
          <Button type="primary">Start Trying</Button>
        </Link>
      </section>
      <footer className="bg-[#5bcadf] py-7 mt-5">
        <div className="container mx-auto">
          <div className="flex flex-col items-center gap-y-3 text-white max-w-[400px] mx-auto text-center">
            <div className="flex items-center gap-x-3 font-bold text-3xl">
              <img src={Icon} alt="" className="w-[40px]" />
              Superpage
            </div>
            <p className="text-xs">
              Superpage is a project/task management application. The purpose of
              this application is to easily share the tasks in the project with
              your teammates with a simple interface.
            </p>
            <p className="text-sm font-semibold">
              Superpage is still in development. If you have tried the
              application and there are features or errors that you want to
              have, please contact me.
            </p>
            <div className="text-2xl flex gap-x-5">
              <a
                href="mailto:safvanavci@gmail.com"
                className="hover:text-[#ec4537] duration-500"
              >
                <MailOutlined />
              </a>
              <a
                href="https://www.linkedin.com/in/safvan-avci/"
                target="blank"
                className="hover:text-[#3970c8] duration-500"
              >
                <LinkedinOutlined />
              </a>
              <a
                href="https://twitter.com/safvanavci"
                target="blank"
                className="hover:text-[#4d9cf1] duration-500"
              >
                <TwitterOutlined />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
