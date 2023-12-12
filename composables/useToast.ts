import { useToast } from "vue-toast-notification";

export default function (...args: Parameters<typeof useToast>) {
  return useToast({
    ...args[0],
    position: "top-left",
  });
}
