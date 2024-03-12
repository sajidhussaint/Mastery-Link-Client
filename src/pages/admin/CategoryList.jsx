import React, { useEffect, useState } from "react";
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
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-bold text-lg text-sky-800">Categories</h1>
        <Button
          color="green"
          buttonType="filled"
          size="sm"
          rounded={false}
          block={false}
          iconOnly={false}
          ripple="light"
          onClick={handleAddcategory}
        >
          Add category
        </Button>
      </div>

      <div className="relative bg-white shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-white-800 rounded-lg overflow-hidden">
          <thead className="text-xs text-white uppercase bg-green-700 text-white-400">
            <tr>
              <th className="px-6 py-3">CATEGORY</th>
              <th className="px-6 py-3">STATUS</th>
              <th className="px-6 py-3">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {categoryList.map((category) => (
              <tr
                key={category.id}
                className="bg-white border-b dark:border-gray-700"
              >
                <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
                  {category.category}
                </td>

                <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
                  <Button
                    color={!category.status ? "red" : "green"}
                    buttonType="filled"
                    size="sm"
                    rounded={false}
                    block={false}
                    iconOnly={false}
                    ripple="light"
                    onClick={(e) =>
                      !category.status
                        ? handleList(category.id, e)
                        : handleUnlist(category.id, e)
                    }
                  >
                    {!category.status ? "Unlisted" : "Listed"}
                  </Button>
                </td>

                <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
                  <Button
                    color="blueGray"
                    buttonType="filled"
                    size="sm"
                    rounded={false}
                    block={false}
                    iconOnly={false}
                    ripple="light"
                    onClick={() => handleOpen(category)}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dialog component */}
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
    </>
  );
};

export default CategoryList;
