import React, { useState, useEffect } from "react";
import {
  getLanguageList,
  listLanguage,
  unlistLanguage,
  editLanguage,
  addLanguage
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
  const [LanguageList, setLanguageList] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [open, setOpen] = useState(false);
  const [LanguageFormData, setLanguageFormData] = useState("");
  const [isNewLanguage, setIsNewLanguage] = useState(false);

  const getLanguages = async () => {
    try {
      const Languages = await getLanguageList();
      console.log(Languages);
      setLanguageList(Languages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpen = (Language) => {
    setLanguageFormData(Language.language);
    setSelectedLanguage(Language);
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isNewLanguage) {
        await editLanguage(selectedLanguage.id, LanguageFormData);
        const updatedList = LanguageList.map((Language) =>
          Language.id === selectedLanguage.id
            ? { ...Language, language: LanguageFormData }
            : Language
        );
        setLanguageList(updatedList);
        console.log('running edit language');
      } else {
        const newdata = await addLanguage(LanguageFormData);

        const updatedList = [
          ...LanguageList,
          { Language: LanguageFormData, status: true },
        ];

        console.log(updatedList, "kkkkkkk");
        setLanguageList(updatedList);
        setIsNewLanguage(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setOpen(false);
    }
  };

  const handleAddLanguage = (e) => {
    e.preventDefault();
    try {
      setLanguageFormData("");
      setOpen(true);
      setIsNewLanguage(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleList = async (id, e) => {
    e.preventDefault();

    const response = await listLanguage(id);
    if (response) {
      const newList = LanguageList.map((user) =>
        user.id === id ? { ...user, status: true } : user
      );
      setLanguageList(newList);
    }
  };
  const handleUnlist = async (id, e) => {
    e.preventDefault();
    const response = await unlistLanguage(id);

    if (response) {
      const newList = LanguageList.map((Language) =>
        Language.id === id ? { ...Language, status: false } : Language
      );
      setLanguageList(newList);
    }
  };

  useEffect(() => {
    getLanguages();
  }, [isNewLanguage]);

  return (
    <>
      
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-bold text-lg text-sky-800">Languages</h1>
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
            </tr>
          </thead>
          <tbody className="text-black">
            {LanguageList&&LanguageList.map((Language) => (
              <tr
                key={Language.id}
                className="bg-white border-b dark:border-gray-700"
              >
                <td className="sm:px-6 py-4 font-medium text-black  whitespace-nowrap ">
                  {Language.language}
                </td>

                <td className="sm:px-6 py-4 font-medium text-black  whitespace-nowrap ">
                  {/* <button className="inline-block border-e px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:relative">
                      Listed
                    </button> */}

                  <button
                    type="button"
                    onClick={(e) => {
                      if (Language.status) {
                        handleUnlist(Language.id, e);
                      } else {
                        handleList(Language.id, e);
                      }
                    }}
                    className={`text-white mt-2 ${
                      !Language.status
                        ? "bg-red-700 hover:bg-red-800"
                        : "bg-green-700 hover:bg-green-800"
                    } font-medium rounded-sm text-sm px-5 py-1 mr-2 mb-2`}
                  >
                    {!Language.status ? "Unlisted" : "Listed"}
                  </button>

                  <button
                    className="inline-block px-4 py-2 text-gray-700 hover:bg-gray-50 focus:relative"
                    title="Edit"
                    onClick={() => handleOpen(Language)}
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
