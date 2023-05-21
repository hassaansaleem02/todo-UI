import axios from "axios";
import {
  create_task,
  fetch_task,
  delete_task,
  update_task,
  create_sub_task,
  update_sub_task,
} from "./apiRoutes";

export default {
  createTask: async (payload) => {
    const response = await axios.post(create_task, payload);
    return response;
  },
  createSubTask: async (payload) => {
    const response = await axios.post(create_sub_task, payload);
    return response;
  },
  fetchTask: async (category_id) => {
    const response = await axios.get(`${fetch_task}/${category_id}`);
    return response;
  },
  deleteTask: async (payload) => {
    const response = await axios.post(delete_task, payload);
    return response;
  },
  updateTask: async (payload) => {
    const response = await axios.post(update_task, payload);
    return response;
  },
  updateSubTask: async (payload) => {
    const response = await axios.post(update_sub_task, payload);
    return response;
  },
};
