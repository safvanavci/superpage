import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import Task from "./Task";

export default function Testing({ testing, id }) {
  return (
    <div className="flex flex-col gap-y-3 2xl:w-[300px] w-[250px]">
      <div className="flex justify-between  bg-[#ededed] p-3 rounded-lg">
        <div className="flex items-center gap-x-2 ">
          <LoadingOutlined />
          <h1 className=" text-xs">Being Tested</h1>
        </div>
      </div>
      <div className="flex flex-col gap-y-3 2xl:w-[300px] w-[250px] max-h-[200px] md:max-h-[600px] overflow-auto opacity-60">
        {testing?.map((item, i) => (
          <Task key={i} item={item} id={id} />
        ))}
      </div>
    </div>
  );
}
