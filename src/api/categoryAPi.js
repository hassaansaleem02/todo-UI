import axios from "axios";
import { create_category, fetch_category, delete_category } from "./apiRoutes";

export default {
  createCategory: async (payload) => {
    const response = await axios.post(create_category, payload);
    return response;
  },
  fetchCategory: async (payload) => {
    const response = await axios.get(fetch_category, payload);
    return response;
  },
  deleteCategory: async (payload) => {
    const response = await axios.post(delete_category, payload);
    return response;
  },
};
