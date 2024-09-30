import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import ProductsTopSection from "../_addProductsComponents/ProductsTopSection";
import ProductsMiddleSection from "../_addProductsComponents/ProductsMiddleSection";
import ProductsBottomSection from "../_addProductsComponents/ProductsBottomSection";
import ProductMiddleBottomSection from "../_addProductsComponents/ProductMiddleBottomSection";

const formSchema = z.object({
  productName: z.string({
    required_error: "Product Name is required",
  }),
  productStrength: z.string({
    required_error: "Product Strength is required",
  }),
  unit: z.string().min(1, "Unit is required"),
  quantity: z.coerce.number({
    required_error: "Quantity is required",
    invalid_type_error: "Must be a valid number",
  }),
  expiryDate: z.date({
    required_error: "Date is required",
    invalid_type_error: "Format invalid",
  }),
  reOrderLevel: z.coerce.number({
    required_error: "Re-Order Level is required",
    invalid_type_error: "Must be a valid number",
  }),
  costPrice: z.coerce.number({
    required_error: "Cost Price is required",
  }),
  markUp: z.coerce.number({
    required_error: "Mark Up Percentage is required",
    invalid_type_error: "Must be a valid number",
  }),
  sellingPrice: z.coerce.number({
    required_error: "Selling Price is required",
    invalid_type_error: "Must be a valid number",
  }),
  category: z.string({
    required_error: "Category is required",
  }),
  supplier: z.string({
    required_error: "Supplier is required",
  }),
  brandName: z.string({
    required_error: "Brand Name is required",
  }),
});

type ProductSchema = z.infer<typeof formSchema>;

interface AddProductProps {
  title: string;
  className?: string;
}

const AddProducts = ({ title, className }: AddProductProps) => {
  const form = useForm<ProductSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      expiryDate: new Date(),
    },
  });

  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={className}>{title}</Button> 
      </DialogTrigger>
      <DialogContent className="max-w-[900px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-inter pb-6 font-bold text-[#202224]">
            Add Product
          </DialogTitle>
          <hr className="pb-6" />
          <DialogDescription className="font-inter text-base font-bold text-[#202224]">
            Products Details
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form>
            <div className="grid gap-4">
              <ProductsTopSection />
              <ProductsMiddleSection />
              <ProductMiddleBottomSection />
              <ProductsBottomSection />
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button
            className="text-white w-[140px] font-inter rounded"
            variant="secondary"
            type="submit"
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddProducts;
