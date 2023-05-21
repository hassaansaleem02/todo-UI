import React, { useEffect, useState } from "react";
import categoryAPi from "../api/categoryAPi";
import taskAPi from "../api/taskAPi";
const Task = ({ data, category_id, handleUpdateTask, handleCreateTask }) => {
  const [task, setTask] = useState("");

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col  items-center">
        {data &&
          data.length > 0 &&
          data.map((task) => {
            return (
              <div key={task._id} className="  mb-3 ml-6 flex items-center w-full  ">
                <input
                  checked={task.status}
                  onChange={(e) => handleUpdateTask(e.target.checked, task._id)}
                  className="accent-[#B5B5BA] w-3 h-3 "
                  type="checkbox"
                ></input>
                <label className={`ml-2 text-[.8rem]  ${task.status ? "line-through": ""} `}>{task.title}</label>
              </div>
            );
          })}
      </div>
      <div className="mt-5 flex items-center w-full ">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="gray"
            class="w-4 h-4"
          >
            <path
              fill-rule="gray"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
        <span className="w-full">
          <input
            value={task}
            onInput={(e) => setTask(e.target.value)}
            onKeyDown={(e) => {
              e.key === "Enter" && handleCreateTask(task, category_id).then(setTask(""));
            }}
            type="text"
            class="bg-[#F4F4F4] outline-none  text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
            placeholder="Write a Task"
          />
        </span>
      </div>
    </div>
  );
};

export default Task;
