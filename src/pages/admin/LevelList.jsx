import React, { useState } from "react";
import {
  getLevelList,
  listLevel,
  unlistLevel,
  editLevel,
  addLevel,
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

function LevelList() {
  const {
    data: levelList = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["levels"],
    queryFn: getLevelList,
  });
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [open, setOpen] = useState(false);
  const [levelFormData, setLevelFormData] = useState("");
  const [isNewLevel, setIsNewLevel] = useState(false);

  const editLevelMutation = useMutation({ mutationFn: editLevel });
  const addLevelMutation = useMutation({ mutationFn: addLevel });
  const listLevelMutation = useMutation({ mutationFn: listLevel });
  const unlistLevelMutation = useMutation({ mutationFn: unlistLevel });

  const handleOpen = (level) => {
    setLevelFormData(level.level);
    setSelectedLevel(level);
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isNewLevel) {
        await editLevelMutation.mutateAsync({
          levelId: selectedLevel.id,
          value: levelFormData,
        });
      } else {
        await addLevelMutation.mutateAsync(levelFormData);
        setIsNewLevel(false);
      }
      refetch();
    } catch (error) {
      console.error(error);
    } finally {
      setOpen(false);
    }
  };

  const handleAddLevel = (e) => {
    e.preventDefault();
    setLevelFormData("");
    setOpen(true);
    setIsNewLevel(true);
  };

  const handleList = async (id, e) => {
    e.preventDefault();
    await listLevelMutation.mutateAsync(id);
    refetch();
  };

  const handleUnlist = async (id, e) => {
    e.preventDefault();
    await unlistLevelMutation.mutateAsync(id);
    refetch();
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4 mt-6">
        <h1 className="font-bold text-lg text-sky-800">Levels</h1>
        <Button
          color="green"
          buttonType="filled"
          size="sm"
          rounded={false}
          block={false}
          iconOnly={false}
          ripple="light"
          onClick={handleAddLevel}
        >
          Add Level
        </Button>
      </div>

      <div className="relative bg-white shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-white-800 rounded-lg overflow-hidden ">
          <thead className="text-xs text-white uppercase bg-green-700 text-white-400">
            <tr>
              <th className="sm:px-6 py-3">Level</th>
              <th className="sm:px-6 py-3">STATUS</th>
              <th className="px-6 py-3">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {isLoading && <h1 className="mx-5 my-5">Loading...</h1>}
            {isError && categoryList.length == 0 && (
              <h1 className="mx-5 my-5">An error occurred</h1>
            )}
            {levelList.map((level) => (
              <tr
                key={level.id}
                className="bg-white border-b dark:border-gray-700"
              >
                <td className="sm:px-6 py-4 font-medium text-black  whitespace-nowrap ">
                  {level.level}
                </td>

                <td className="sm:px-6 py-4 font-medium text-black  whitespace-nowrap ">
                  <Button
                    color={!level.status ? "red" : "green"}
                    buttonType="filled"
                    size="sm"
                    rounded={false}
                    block={false}
                    iconOnly={false}
                    ripple="light"
                    onClick={(e) => {
                      if (level.status) {
                        handleUnlist(level.id, e);
                      } else {
                        handleList(level.id, e);
                      }
                    }}
                  >
                    {!level.status ? "Unlisted" : "Listed"}
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
                    onClick={() => handleOpen(level)}
                  >
                    Edit
                  </Button>
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
              Edit Level
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
                onChange={(e) => setLevelFormData(e.target.value)}
                label="Level"
                value={levelFormData}
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
}

export default LevelList;
