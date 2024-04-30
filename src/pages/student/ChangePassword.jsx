import UpdatePasswordForm from "../../components/StudentComponent/UpdatePasswordForm";
import Navbar from "../../components/StudentComponent/Navbar";

const ChangePassword = () => {
  return (
    <>
      <Navbar />
      <div className="h-screen flex justify-center items-center text-black animate-fade">
        <div className="shadow-lg w-full md:w-3/5 border rounded-md py-5">
          <h1 className="text-center font-bold text-sky-800 text-xl">
            Change password
          </h1>
          <UpdatePasswordForm />
        </div>
      </div>
    </>
  );
};

export default ChangePassword;