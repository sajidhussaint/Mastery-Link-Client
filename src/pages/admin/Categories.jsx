import React from "react";
import CategoryList from "./CategoryList";
import AdminSidebar from "../../components/adminComponent/AdminSidebar";
import LanguageList from "./LanguageList";
import LevelList from "./LevelList";

const Categories = () => {
  return (
    <div className="bg-gray-100 font-family-karla flex  ">
      <AdminSidebar />
      <div className="flex flex-col py-20 px-20 h-screen overflow-y-auto w-full animate-fade animate-ease-in-out">
        <CategoryList />
        <LanguageList />
        <LevelList />
      </div>
    </div>
  );
};

export default Categories;
