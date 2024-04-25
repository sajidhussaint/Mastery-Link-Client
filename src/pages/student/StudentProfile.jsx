import { useEffect, useState } from "react";
import Navbar from "../../components/StudentComponent/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileUpdateSchema } from "../../validations/profileUpdateSchema";
import { updateProfile } from "../../api/studentApi";
import { userActions } from "../../redux/userSlice";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import moment from "moment";

const StudentProfile = () => {
  const user = useSelector((store) => store.user.user);
  const dispatch = useDispatch();
  // const selectedCourse = useSelector((store) => store.selectedCourse.course)
  const [open, setOpen] = useState(false);
  const [openProfileEdit, setOpenProfileEdit] = useState(false);
  const [fname, setFname] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileUpdateSchema),
  });

  const submitData = async (data) => {
    const response = await updateProfile(
      data.fname,
      data.lname,
      data.mob,
      user._id
    );
    if (response) {
      console.log("changed password");
      dispatch(userActions.saveUser({ ...response }));
      setOpenProfileEdit(false);
    }
  };

  const handleRemoveAccount = () => {
    setOpen(!open);
  };
  const handleUpdateProfile = () => {
    setOpenProfileEdit(!open);
  };

  useEffect(() => {
    setFname(user?.firstname);
  }, [openProfileEdit]);
  return (
    <>
      <Navbar />
      <div className=" w-full  pt-6  ">
        {/* <div className="w-full text-white bg-main-color">
          <div
            x-data="{ open: false }"
            className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8"
          ></div>
        </div> */}
        {/* End of Navbar */}

        <div className="container mx-auto my-5 p-5 animate-fade">
          <div className="md:flex no-wrap md:-mx-2 ">
            {/* Left Side */}
            <div className="w-full md:w-3/12 md:mx-2">
              {/* Profile Card */}
              <div className="bg-gray-50 p-3 border-t-4 border-green-400 animate-fade-right shadow rounded-md">
                <div className="image overflow-hidden">
                  <img
                    className="h-40 w-40 mx-auto"
                    src="https://cdn.pixabay.com/photo/2021/06/07/13/46/user-6318011_1280.png"
                    alt=""
                  />
                </div>
                <h1 className="text-gray-900 font-bold text-xl leading-8 my-1 text-center">
                  {user?.firstname} {user?.lastname}
                </h1>
                {/* <h3 className="text-gray-600 font-lg text-semibold leading-6">
                Owner at Her Company Inc.
              </h3> */}
                {/* <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur
                non deserunt
              </p> */}
                <ul className="bg-gray-200 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-xl">
                  <li className="flex items-center py-3">
                    <span>Status</span>
                    <span className="ml-auto">
                      <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                        Active
                      </span>
                    </span>
                  </li>
                  <li className="flex items-center py-3">
                    <span>Member since</span>
                    <span className="ml-auto">
                      {moment(user?.createdAt).format("LL")}
                    </span>
                  </li>
                  <li className="flex items-center py-3">
                    <Link to={"/change-password"}>
                      <button className="text-sm cursor-pointer text-blue-800 underline font-semibold ">
                        Change password
                      </button>
                    </Link>
                    <button
                      className="text-sm ml-auto cursor-pointer text-red-800 underline font-semibold "
                      onClick={handleRemoveAccount}
                    >
                      Remove account
                    </button>
                  </li>
                </ul>
              </div>
              {/* End of profile card */}
              <div className="my-4"></div>
              {/* Friends card */}
              {/* <div className="bg-white p-3 hover:shadow">
              <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                <span className="text-green-500">
                  <svg
                    className="h-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </span>
                <span>Similar Profiles</span>
              </div>
              <div className="grid grid-cols-3">
                <div className="text-center my-2">
                  <img
                    className="h-16 w-16 rounded-full mx-auto"
                    src="https://cdn.australianageingagenda.com.au/wp-content/uploads/2015/06/28085920/Phil-Beckett-2-e1435107243361.jpg"
                    alt=""
                  />
                  <a href="#" className="text-main-color">
                    Kojstantin
                  </a>
                </div>
                <div className="text-center my-2">
                  <img
                    className="h-16 w-16 rounded-full mx-auto"
                    src="https://avatars2.githubusercontent.com/u/24622175?s=60&amp;v=4"
                    alt=""
                  />
                  <a href="#" className="text-main-color">
                    James
                  </a>
                </div>
                <div className="text-center my-2">
                  <img
                    className="h-16 w-16 rounded-full mx-auto"
                    src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                    alt=""
                  />
                  <a href="#" className="text-main-color">
                    Natie
                  </a>
                </div>
                <div className="text-center my-2">
                  <img
                    className="h-16 w-16 rounded-full mx-auto"
                    src="https://bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com/public/images/f04b52da-12f2-449f-b90c-5e4d5e2b1469_361x361.png"
                    alt=""
                  />
                  <a href="#" className="text-main-color">
                    Casey
                  </a>
                </div>
              </div>
            </div> */}
              {/* End of friends card */}
            </div>
            {/* Right Side */}
            <div className="w-full md:w-9/12 mx-2 h-64">
              {/* Profile tab */}
              {/* About Section */}
              <div className="bg-gray-50 p-6 shadow-xl rounded-md  animate-fade-down ">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <span clas="text-green-500">
                    <svg
                      className="h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <span className="tracking-wide">About</span>
                </div>
                <div className="text-gray-700">
                  <div className="grid md:grid-cols-2 text-sm">
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">First Name</div>
                      <div className="px-4 py-2">{user?.firstname}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Last Name</div>
                      <div className="px-4 py-2">{user?.lastname}</div>
                    </div>

                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Contact No.</div>
                      <div className="px-4 py-2">{user?.mobile}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Wallet</div>
                      <div className="px-4 py-2 flex">
                        ₹{user?.wallet}{" "}
                        <h1 className="mx-5 text-blue-800 underline cursor-pointer">
                          WalletHistory
                        </h1>
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">
                        Courses Enrolled
                      </div>
                      <div className="px-4 py-2">{user?.courses.length}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Email.</div>
                      <div className="px-4 py-2">
                        <a
                          className="text-blue-800"
                          href={`mailto:${user?.email}`}
                        >
                          {user?.email}
                        </a>
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Birthday</div>
                      <div className="px-4 py-2">Feb 06, 1998</div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleUpdateProfile}
                  className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
                >
                  Edit
                </button>
              </div>
              {/* End of about section */}
              <div className="my-4"></div>

              {/* Experience and education */}
              {user?.courses?.length > 0 && (
                <div className="bg-gray-50 shadow-xl rounded-md p-6  animate-fade-up">
                  <div>
                    <div className="flex items-center flex-col-2 space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                      <span clas="text-green-500">
                        {/* <svg
                        className="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          strokeWidth="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg> */}
                        <svg
                          className="h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path
                            fill="#fff"
                            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                          />
                        </svg>
                      </span>
                      <span className="tracking-wide">Enrolled Courses</span>
                    </div>

                    <ul className="grid grid-cols-2 list-inside space-y-2">
                      {user?.courses.map((item) => (
                        <li>
                          <div className="text-teal-600 flex">{item?.name}</div>
                          <div className="text-gray-500 text-xs">
                            <i className="fas fa-solid fa-language text-teal-700 mr-1"></i>{" "}
                            {item?.category?.category}(
                            {item?.language?.language})
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* End of Experience and education grid */}
                </div>
              )}

              {/* End of profile tab */}
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        size="xs"
        handler={() => setOpen(false)}
        sx={{ zIndex: 1 }}
      >
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            <Typography className="mb-1" variant="h5">
              Remove Account
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
            <span className="text-sm ">
              Type "CONFIRM" to Remove Permenetly
            </span>
            <form
              // onSubmit={handleSubmit}
              className="grid gap-3"
            >
              <Input
                onChange={(e) => setChapter(e.target.value)}
                className="uppercase"
                // value={chapter}
              />
            </form>
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            variant="gradient"
            color="gray"
            type="submit"
            onClick={() => handleAddChapter()}
          >
            Remove
          </Button>
        </DialogFooter>
      </Dialog>

      {/* edit-profile section */}

      <Dialog
        open={openProfileEdit}
        size="xs"
        handler={() => setOpenProfileEdit(false)}
      >
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            <Typography className="mb-1" variant="h5">
              Edit Profile
            </Typography>
          </DialogHeader>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5 cursor-pointer"
            onClick={() => setOpenProfileEdit(false)}
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
            <form onSubmit={handleSubmit(submitData)} className="grid gap-3">
              <Input
                onChange={() => {
                  console.log("kkk");
                }}
                type="text"
                {...register("fname")}
                label="fname"
                defaultValue={user?.firstname}
              />
              {errors.fname && (
                <span className="text-red-600 text-sm italic">
                  *{errors.fname.message}
                </span>
              )}
              <Input
                type="text"
                {...register("lname")}
                label="lname"
                defaultValue={user?.lastname}
              />
              {errors.lname && (
                <span className="text-red-600 text-sm italic">
                  *{errors.lname.message}
                </span>
              )}
              <Input
                type="text"
                {...register("mob")}
                label="mob"
                defaultValue={user?.mobile}
              />
              {errors.mob && (
                <span className="text-red-600 text-sm italic">
                  *{errors.mob.message}
                </span>
              )}
              <Button variant="gradient" color="gray" type="submit">
                submit
              </Button>
            </form>
          </div>
        </DialogBody>
      </Dialog>
      {/* edit-profile section */}
    </>
  );
};

export default StudentProfile;
