import React, { useEffect, useState } from "react";
import categoryAPi from "../api/categoryAPi";
import Category from "./Category";
import BaseModel from "../components/BaseModel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateCategory from "../modal/CreateCategoryModel";

const TodoContent = () => {
  useEffect(() => {
    fetchCategories();
  }, []);

  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await categoryAPi.fetchCategory();
      if (response.data.success) {
        setCategories(response.data.response);
        toast.success("Categories were fetched !");
        // if (response.data.response.length == 0) {
        //   toast.info("Please create a category first !");
        // }
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    }
  };
  const handleCreateCategory = async () => {
    if (category == "") return;
    try {
      const payload = { title: category };
      const res = await categoryAPi.createCategory(payload);
      if (res.data.success) {
        toast.success("A new category was created !");
        setCategories((prev) => [...prev, res.data.response]);
        setOpen(false);
      } else {
        toast.error(res.data.message);
      }
      setCategory("");
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    }
  };
  const handleDeleteCategory = async (_id) => {
    try {
      const payload = { _id: _id };
      const res = await categoryAPi.deleteCategory(payload);
      if (res.data.success) {
        toast.success("Your categpory was deleted !");
        setCategories((prev) =>
          prev.filter((cat) => {
            return cat._id != _id;
          })
        );
      } else {
        toast.error(res.data.message);
      }
      setCategory("");
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    }
  };

  return (
    <div>
      <>
        <header className="bg-black p-2 mb-4 rounded flex justify-end">
          <button
            onClick={() => setOpen(true)}
            className="bg-green-500 hover:bg-green-700 text-white text-sm font-bold py-1 px-4 rounded"
          >
            CATEGORY +
          </button>
        </header>
        {open && (
          <CreateCategory
            setCategory={setCategory}
            handleCreateCategory={handleCreateCategory}
            setOpen={setOpen}
          />
        )}
        {categories?.length == 0 && (
          <div className="flex justify-center font-bold text-xl">
            NO CATEGORY FOUND
          </div>
        )}
        {categories &&
          categories.length > 0 &&
          categories.map((cat) => {
            return (
              <div className="mx-10">
                <Category
                  key={cat._id}
                  handleDeleteCategory={handleDeleteCategory}
                  data={cat}
                />
                <hr className="h-px my-2 bg-gray-300 border-0" />
              </div>
            );
          })}
      </>
    </div>
  );
};

export default TodoContent;
