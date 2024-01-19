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
  Spinner,
} from "@material-tailwind/react";

import { addModule } from "../../api/instructorApi";

const AddModulePopup = () => {
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
    console.log("courseId", location.state.courseId);
    formData.append("name", moduleName);
    formData.append("description", moduleDescription);
    formData.append("file", videoFile);
    formData.append("courseId", location.state.courseId);
    const response = await addModule(formData);

    setOpen(false);
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
              {/* <input type="file" accept="video/*" onChange={handleFileChange} /> */}
              <label
                class="flex  cursor-pointer appearance-none justify-center rounded-md border border-dashed border-gray-300 bg-white px-3 py-6 text-sm transition hover:border-gray-400 focus:border-solid focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
                tabindex="0"
              >
                <span for="photo-dropbox" class="flex items-center space-x-2">
                  <svg class="h-6 w-6 stroke-gray-400" viewBox="0 0 256 256">
                    <path
                      d="M96,208H72A56,56,0,0,1,72,96a57.5,57.5,0,0,1,13.9,1.7"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></path>
                    <path
                      d="M80,128a80,80,0,1,1,144,48"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></path>
                    <polyline
                      points="118.1 161.9 152 128 185.9 161.9"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></polyline>
                    <line
                      x1="152"
                      y1="208"
                      x2="152"
                      y2="128"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                  </svg>
                  <span class="text-xs font-medium text-gray-600">
                    Drop file to Attach, or
                    <span class="text-blue-600 underline"> browse</span>
                  </span>
                </span>
                <input
                  id="photo-dropbox"
                  type="file"
                  class="sr-only"
                  accept="video/*"
                  onChange={handleFileChange}
                />
              </label>
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
