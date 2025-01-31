import React from "react";
import CategoriesTabStats from "./CategoriesTabStats";
import CategoriesTabProducts from "./CategoriesTabProducts";
import AddCategory from "./AddCategory";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import { useQuery } from "@tanstack/react-query";

const CategoriesTab = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: async () =>
      await customAxios.get(endpoints.inventoryCategories).then((res) => res),
    select: (findData) => findData?.data?.results,
  });

  console.log(categories);

  const categoryLength = categories?.length

  return (
    <div>
      <CategoriesTabStats categoryLength={categoryLength} />
      <AddCategory />
      <CategoriesTabProducts />
    </div>
  );
};

export default CategoriesTab;
