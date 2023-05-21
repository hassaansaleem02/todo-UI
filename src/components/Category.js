import React, { useEffect, useState } from "react";
import categoryAPi from "../api/categoryAPi";
import taskAPi from "../api/taskAPi";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Task from "./Task";
import { toast } from "react-toastify";

const Category = ({ data, handleDeleteCategory }) => {
  const [task, setTasks] = useState([]);
  const fetchTasks = async (id) => {
    try {
      const response = await taskAPi.fetchTask(id);
      if (response.data.success) {
        toast.success("Tasks were fetched !");
        setTasks(response.data.response);
      }
    } catch (err) {
      toast.error(err.message);
      // alert(err.message);
    }
  };

  const handleUpdateTask = async (event, id) => {
    try {
      const payload = { status: event, _id: id };
      const res = await taskAPi.updateTask(payload);
      if (res.data.success) {
        // let _tasks=task.map((x)=>x)
        setTasks((prevTasks) =>
          prevTasks.map((task) => {
            return task._id === id ? { ...task, status: event } : task;
          })
        );
        toast.success("Task was updated !");
        // fetchTasks(data._id);
      }
    } catch (err) {
      toast.error(err.message);
      // alert(err.message);
    }
  };
  const handleCreateTask = async (task, category_id) => {
    if (task == "") return;
    try {
      const payload = { title: task, category_id: category_id };
      const res = await taskAPi.createTask(payload);
      if (res.data.success) {
        toast.success("Task was created !");
        setTasks((prevTasks) => [...prevTasks, res.data.response]);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div>
      <Accordion
        onChange={(e, expanded) =>
          expanded && task.length == 0 && fetchTasks(data._id)
        } // console.log("im clicked", expanded)}
        sx={{
          backgroundColor: "#F4F4F4",
          boxShadow: "none",
          margin: "0px",
          padding: "0px",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="flex w-full justify-between">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="gray"
                class="w-4 h-4"
              >
                <path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 9h-15a4.483 4.483 0 00-3 1.146z" />
              </svg>
              <p className="text-[.8rem] font-bold ml-2">{data.title}</p>
            </div>
          </div>
        </AccordionSummary>

        <AccordionDetails>
          {task.length == 0 &&
            <div className="flex justify-center font-bold text-xl">
              Your Category is empty!
            </div>
          }
          <Task
          key={data._id}
            data={task}
            category_id={data._id}
            handleUpdateTask={handleUpdateTask}
            handleCreateTask={handleCreateTask}
          />
          <div className="flex justify-end">
            <button onClick={() => handleDeleteCategory(data._id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="red"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                />
              </svg>
            </button>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Category;
