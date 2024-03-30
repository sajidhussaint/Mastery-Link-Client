import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getLanguageList,
  listLanguage,
  unlistLanguage,
  editLanguage,
  addLanguage,
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

function LanguageList() {
  const {
    data: languageList = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["languages"],
    queryFn: getLanguageList,
  });

  const editLanguageMutation = useMutation({ mutationFn: editLanguage });
  const addLanguageMutation = useMutation({ mutationFn: addLanguage });
  const listLanguageMutation = useMutation({ mutationFn: listLanguage });
  const unlistLanguageMutation = useMutation({ mutationFn: unlistLanguage });

  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [open, setOpen] = useState(false);
  const [LanguageFormData, setLanguageFormData] = useState("");
  const [isNewLanguage, setIsNewLanguage] = useState(false);

  const handleOpen = (Language) => {
    setLanguageFormData(Language.language);
    setSelectedLanguage(Language);
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isNewLanguage) {
        await editLanguageMutation.mutateAsync({
          languageId: selectedLanguage.id,
          value: LanguageFormData,
        });
      } else {
        await addLanguageMutation.mutateAsync(LanguageFormData);
        setIsNewLanguage(false);
      }
      setOpen(false);
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddLanguage = (e) => {
    e.preventDefault();
    setLanguageFormData("");
    setOpen(true);
    setIsNewLanguage(true);
  };

  const handleList = async (id, e) => {
    e.preventDefault();
    await listLanguageMutation.mutateAsync(id);
    refetch();
  };

  const handleUnlist = async (id, e) => {
    e.preventDefault();
    await unlistLanguageMutation.mutateAsync(id);
    refetch();
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4 mt-6">
        <h1 className="font-bold text-lg text-sky-800 ">Languages</h1>
        <Button
          color="green"
          buttonType="filled"
          size="sm"
          rounded={false}
          block={false}
          iconOnly={false}
          ripple="light"
          onClick={handleAddLanguage}
        >
          Add Language
        </Button>
      </div>

      <div className="relative bg-white shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-white-800 rounded-lg overflow-hidden ">
          <thead className="text-xs text-white uppercase bg-green-700 text-white-400">
            <tr>
              <th className="sm:px-6 py-3">Language</th>
              <th className="sm:px-6 py-3">STATUS</th>
              <th className="px-6 py-3">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {isLoading && <h1 className="mx-5 my-5">Loading...</h1>}
            {isError && categoryList.length == 0 && (
              <h1 className="mx-5 my-5">An error occurred</h1>
            )}
            {languageList &&
              languageList.map((Language) => (
                <tr
                  key={Language.id}
                  className="bg-white border-b dark:border-gray-700"
                >
                  <td className="sm:px-6 py-4 font-medium text-black  whitespace-nowrap ">
                    {Language.language}
                  </td>

                  <td className="sm:px-6 py-4 font-medium text-black  whitespace-nowrap ">
                    <Button
                      color={!Language.status ? "red" : "green"}
                      buttonType="filled"
                      size="sm"
                      rounded={false}
                      block={false}
                      iconOnly={false}
                      ripple="light"
                      onClick={(e) => {
                        if (Language.status) {
                          handleUnlist(Language.id, e);
                        } else {
                          handleList(Language.id, e);
                        }
                      }}
                    >
                      {!Language.status ? "Unlisted" : "Listed"}
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
                      onClick={() => handleOpen(Language)}
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
              Edit Language
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
                onChange={(e) => setLanguageFormData(e.target.value)}
                label="Language"
                value={LanguageFormData}
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

export default LanguageList;
