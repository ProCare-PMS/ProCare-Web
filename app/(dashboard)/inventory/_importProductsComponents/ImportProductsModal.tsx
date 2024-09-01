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

interface ImportProductsModalProps {
  title: string;
  className?: string
}

const ImportProductsModal = ({ title, className } : ImportProductsModalProps) => {
  return (
    <Dialog> 
      <DialogTrigger asChild>
        <Button className={className}>
         {title}
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

        
      </DialogContent>
    </Dialog>
  );
};

export default ImportProductsModal;
