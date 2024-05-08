import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
  Button,
} from "@material-tailwind/react";
import { addModule } from "../../api/instructorApi";

const AddModulePopup = ({ handleSpinner, refetch }) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [moduleName, setModuleName] = useState("");
  const [moduleDescription, setModuleDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [err, setErr] = useState("");

  const handleFileChange = (e) => {
    setErr("");
    const file = e.target.files && e.target.files[0];
    setVideoFile(file || null);
  };

  const handleOpen = () => setOpen(!open);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", moduleName);
    formData.append("description", moduleDescription);
    formData.append("file", videoFile);
    formData.append("courseId", location.state.courseId);

    setOpen(false);
    handleSpinner(true);
    const response = await addModule(formData);
    refetch();

    handleSpinner(false);
  };
  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Add module
      </Button>
      <Dialog open={open} size="xs" handler={() => setOpen(false)}>
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            <Typography className="mb-1" variant="h5">
              Add Module
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
          <div>
            <form onSubmit={handleSubmit} className="grid gap-3">
              <Input
                onChange={(e) => setModuleName(e.target.value)}
                label="Name"
                value={moduleName}
              />
              <Input
                onChange={(e) => setModuleDescription(e.target.value)}
                label="Description"
                value={moduleDescription}
              />

              <input
                type="file"
                class="block w-full text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4 file:rounded-md
        file:border-0 file:text-sm file:font-semibold
        file:bg-green-50 file:text-green-700
        hover:file:bg-green-100"
                accept="video/*"
                onChange={handleFileChange}
              />

              {err && <p className="text-red-700 italic text-left">*{err}</p>}
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

export default AddModulePopup;