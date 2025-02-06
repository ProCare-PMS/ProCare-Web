import React, { useState } from "react";
import { EllipsisVertical, LayoutGrid } from "lucide-react";
import AntiMalarialTable from "./AntiMalarialTable";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import { useQuery } from "@tanstack/react-query";
import { ProductsType } from "@/components/Tables/products-tab-columns";

export interface CategoryProduct {
  created_at: string;
  id: string;
  modified_at: string;
  name: string;
  pharmacy: string;
  product_count: number;
  products: ProductsType[];
  slug: string;
}

const CategoryCardSkeleton = () => (
  <div className="border border-[#D0D5DD] w-[230px] rounded-[8px] py-8 px-6 animate-pulse">
    <div className="flex justify-between mb-6">
      <div className="rounded-full bg-gray-200 p-2 w-10 h-10"></div>
      <div className="w-6 h-6 bg-gray-200 rounded"></div>
    </div>

    <div>
      <div className="h-7 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-5 bg-gray-200 rounded w-1/2"></div>
    </div>
  </div>
);

const CategoriesTabProducts = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["inventoryCategories"],
    queryFn: async () =>
      await customAxios.get(endpoints.inventoryCategories).then((res) => res),
    select: (findData) => findData?.data?.results,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategoryProducts, setSelectedCategoryProducts] = useState<ProductsType[]>([]);

  const openCategoryTable = (products: ProductsType[]) => {
    setSelectedCategoryProducts(products);
    setIsModalOpen(true);
  };

  const onClose = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="mt-8">
        <div className="grid grid-cols-2 md:grid-cols-3 mx-auto place-items-center lg:grid-cols-5 gap-8">
          {[...Array(10)].map((_, index) => (
            <CategoryCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="grid grid-cols-2 md:grid-cols-3 mx-auto place-items-center lg:grid-cols-5 gap-8">
        {categories?.map((category: CategoryProduct) => (
          <div
            className="border border-[#D0D5DD] w-[230px] rounded-[8px] py-8 px-6"
            key={category.id}
          >
            <div className="flex justify-between mb-6">
              <div className="rounded-full bg-[#E8EBFF] p-2">
                <LayoutGrid className="text-[#2648EA]" />
              </div>
              <div>
                <EllipsisVertical className="text-[#475467]" />
              </div>
            </div>

            <div>
              <h1 className="text-[#344054] mb-2 font-inter font-semibold text-xl">
                {category.name}
              </h1>
              <span
                className="text-left text-[#2648EA] font-medium font-inter text-base cursor-pointer underline"
                onClick={() => openCategoryTable(category.products)}
              >
                View {category.products.length} products
              </span>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <AntiMalarialTable 
          products={selectedCategoryProducts}
          onClose={onClose}
        />
      )}
    </div>
  );
};

export default CategoriesTabProducts;