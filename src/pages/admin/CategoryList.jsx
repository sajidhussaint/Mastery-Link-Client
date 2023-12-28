import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/adminComponent/AdminSidebar";
import {
  getAllCategory,
  editCategory,
  addCategory,
  listCategory,
  unlistCategory,
} from "../../api/adminApi";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
} from "@material-tailwind/react";

const CategoryList = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [open, setOpen] = useState(false);
  const [categoryFormData, setCategoryFormData] = useState("");
  const [isNewCategory, setIsNewCategory] = useState(false);

  const getCategories = async () => {
    try {
      const categories = await getAllCategory();
      console.log(categories);
      setCategoryList(categories);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpen = (category) => {
    setCategoryFormData(category.category);
    setSelectedCategory(category);
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isNewCategory) {
        await editCategory(selectedCategory.id, categoryFormData);
        const updatedList = categoryList.map((category) =>
          category.id === selectedCategory.id
            ? { ...category, category: categoryFormData }
            : category
        );
        setCategoryList(updatedList);
      } else {
        const newdata = await addCategory(categoryFormData);

        const updatedList = [
          ...categoryList,
          { category: categoryFormData, status: true },
        ];

        console.log(updatedList, "kkkkkkk");
        setCategoryList(updatedList);
        setIsNewCategory(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setOpen(false);
    }
  };

  const handleAddcategory = (e) => {
    e.preventDefault();
    try {
      setCategoryFormData("");
      setOpen(true);
      setIsNewCategory(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleList = async (id, e) => {
    e.preventDefault();

    const response = await listCategory(id);
    if (response) {
      const newList = categoryList.map((user) =>
        user.id === id ? { ...user, status: true } : user
      );
      setCategoryList(newList);
    }
  };
  const handleUnlist = async (id, e) => {
    e.preventDefault();
    const response = await unlistCategory(id);

    if (response) {
      const newList = categoryList.map((category) =>
        category.id === id ? { ...category, status: false } : category
      );
      setCategoryList(newList);
    }
  };

  useEffect(() => {
    getCategories();
  }, [isNewCategory]);

  return (
    <div className="bg-gray-100 font-family-karla flex">
      <AdminSidebar />
      <div className="flex flex-col py-20 px-20 h-screen overflow-y-auto w-full text-black">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-lg text-sky-800">Categories</h1>
          </div>
          <div>
            <button
              type="button"
              className={`text-white mt-2 bg-green-600 font-medium rounded-sm text-sm px-5 py-2 mr-2 mb-2`}
              onClick={handleAddcategory}
            >
              Add category
            </button>
          </div>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-white-800 ">
            <thead className="text-xs text-white uppercase bg-green-700 text-white-400">
              <tr>
                <th className="sm:px-6 py-3">CATEGORY</th>
                <th className="sm:px-6 py-3">STATUS</th>
              </tr>
            </thead>
            <tbody className="text-black">
              {categoryList.map((category) => (
                <tr
                  key={category.id}
                  className="bg-white border-b dark:border-gray-700"
                >
                  <td className="sm:px-6 py-4 font-medium text-black  whitespace-nowrap ">
                    {category.category}
                  </td>

                  <td className="sm:px-6 py-4 font-medium text-black  whitespace-nowrap ">
                    {/* <button className="inline-block border-e px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative">
                      Listed
                    </button> */}

                    <button
                      type="button"
                      onClick={(e) => {
                        if (category.status) {
                          handleUnlist(category.id, e);
                        } else {
                          handleList(category.id, e);
                        }
                      }}
                      className={`text-white mt-2 ${
                        !category.status
                          ? "bg-red-700 hover:bg-red-800"
                          : "bg-green-700 hover:bg-green-800"
                      } font-medium rounded-sm text-sm px-5 py-1 mr-2 mb-2`}
                    >
                      {!category.status ? "Unlisted" : "Listed"}
                    </button>

                    <button
                      className="inline-block px-4 py-2 text-gray-700 hover:bg-gray-50 focus:relative"
                      title="Edit"
                      onClick={() => handleOpen(category)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Dialog open={open} size="xs" handler={() => setOpen(false)}>
          <div className="flex items-center justify-between">
            <DialogHeader className="flex flex-col items-start">
              <Typography className="mb-1" variant="h4">
                Edit Category
              </Typography>
            </DialogHeader>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mr-3 h-5 w-5"
              onClick={() => setOpen(false)}
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <DialogBody>
            <div className="grid gap-6">
              <form onSubmit={handleSubmit}>
                <Input
                  onChange={(e) => setCategoryFormData(e.target.value)}
                  label="Category"
                  value={categoryFormData}
                />
              </form>
            </div>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button
              variant="gradient"
              color="gray"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </div>
  );
};

export default CategoryList;
