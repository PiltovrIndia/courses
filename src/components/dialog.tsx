import { toast } from "sonner";
export const DialogMessage = (title: string, description: string) => {
  toast(title, {
    description: description,
  });
};
