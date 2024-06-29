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

const ImportProductsModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-sm px-6 py-4 font-inter font-normal text-[#344054]">
          Import Products
        </Button>
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

export default ImportProductsModal;
