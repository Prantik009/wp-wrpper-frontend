"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function AttachmentModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Attach Files</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-3 py-6">
          <Upload className="w-10 h-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Click below to upload documents or images</p>
          <Button className="w-full">Choose Files</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
