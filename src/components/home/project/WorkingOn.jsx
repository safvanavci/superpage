import React from "react";
import { DesktopOutlined } from "@ant-design/icons";
import Task from "./Task";

export default function WorkingOn({ working, id }) {
  return (
    <div className="flex flex-col gap-y-3 2xl:w-[300px] w-[250px]">
      <div className="flex justify-between  bg-[#ededed] p-3 rounded-lg">
        <div className="flex items-center gap-x-2 ">
          <DesktopOutlined />
          <h1 className=" text-xs">Working On</h1>
        </div>
      </div>
      <div className="flex flex-col gap-y-3 2xl:w-[300px] w-[250px] max-h-[200px] md:max-h-[600px] overflow-auto">
        {working?.map((item, i) => (
          <Task key={i} item={item} id={id} />
        ))}
      </div>
    </div>
  );
}
