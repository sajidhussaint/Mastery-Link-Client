import React, { useEffect, useState } from "react";
import {
  getAllCategory,
  editCategory,
  addCategory,
  listCategory,
  unlistCategory,
} from "../../api/adminApi";
import { useQuery, useMutation } from "@tanstack/react-query";
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
  const {
    data: categoryList = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategory,
  });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [open, setOpen] = useState(false);
  const [categoryFormData, setCategoryFormData] = useState();
  const [isNewCategory, setIsNewCategory] = useState(false);

  const editCategoryMutation = useMutation({ mutationFn: editCategory });
  const addCategoryMutation = useMutation({ mutationFn: addCategory });
  const listCategoryMutation = useMutation({ mutationFn: listCategory });
  const unlistCategoryMutation = useMutation({ mutationFn: unlistCategory });

  const handleOpen = (category) => {
    setCategoryFormData(category.category);
    setSelectedCategory(category);
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isNewCategory) {
        await editCategoryMutation.mutateAsync({
          categoryId: selectedCategory.id,
          value: categoryFormData,
        });
        refetch();
      } else {
        await addCategoryMutation.mutateAsync({ category: categoryFormData });
        refetch();
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

    await listCategoryMutation.mutateAsync(id);
    refetch();
  };

  const handleUnlist = async (id, e) => {
    e.preventDefault();
    await unlistCategoryMutation.mutateAsync(id);
    refetch();
  };

  useEffect(() => {
    refetch();
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
            {isLoading && <h1 className="mx-5 my-5">Loading...</h1>}
            {isError && categoryList.length == 0 && (
              <h1 className="mx-5 my-5">An error occurred</h1>
            )}
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

                <td className="px-6 py-4 font-medium text-black whitespace-nowrap ">
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
                    {/* <svg
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
                    </svg> */}
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
