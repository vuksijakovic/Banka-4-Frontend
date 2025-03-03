"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

type ConfirmDialogProps = {
  title?: string;
  description?: string;
  onConfirm: () => void;
  onCancel?: () => void;
};

export function useConfirmDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<ConfirmDialogProps | null>(null);
  const [triggerKey, setTriggerKey] = useState(0); 

  const confirm = (options: ConfirmDialogProps) => {
    setConfig(options);
    setTriggerKey((prev) => prev + 1); 
    setIsOpen(true);
  };

  const handleConfirm = () => {
    if (config?.onConfirm) config.onConfirm();
    setIsOpen(false);
  };

  const handleCancel = () => {
    if (config?.onCancel) config.onCancel();
    setIsOpen(false);
  };

  const Dialog = (
    <>
     
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger key={triggerKey} className="hidden" />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{config?.title || "Are you sure?"}</AlertDialogTitle>
            <AlertDialogDescription>{config?.description || "This action cannot be undone."}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );

  return { confirm, Dialog };
}
