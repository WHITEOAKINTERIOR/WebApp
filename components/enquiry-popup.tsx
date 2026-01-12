'use client';

import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { EnquiryForm } from "./enquiry-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

type EnquiryPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
};

export function EnquiryPopup({ isOpen, onClose, title }: EnquiryPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="w-[calc(100%-2rem)] sm:w-[425px] md:w-[42rem] max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-2rem)] max-h-[90vh] overflow-y-auto rounded-lg md:rounded-xl"
      >
        {null} {/* This replaces the default close button */}
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-2xl">{title}</DialogTitle>
            {/* <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 rounded-full"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button> */}
          </div>
        </DialogHeader>
        <div className="py-4">
          <EnquiryForm onSuccess={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
