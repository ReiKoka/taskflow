import { toast } from "sonner";

import {
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineExclamationTriangle,
  HiOutlineInformationCircle,
} from "react-icons/hi2";
import { ReactNode } from "react";

type ToastType = "success" | "warning" | "error" | "info";

export const showToast = (type: ToastType, message: string): void => {
  const icons: Record<ToastType, ReactNode> = {
    success: (
      <HiOutlineCheckCircle className="h-6 w-6 text-green-600 dark:text-green-500" />
    ),
    warning: (
      <HiOutlineExclamationTriangle className="h-6 w-6 text-amber-600 dark:text-amber-500" />
    ),
    error: (
      <HiOutlineExclamationCircle className="text-destructive h-6 w-6 dark:text-red-500" />
    ),
    info: (
      <HiOutlineInformationCircle className="text-primary h-6 w-6 dark:text-purple-500" />
    ),
  };

  const textColors = {
    success: "text-green-600 dark:text-green-500",
    warning: "text-amber-600 dark:text-amber-500",
    error: "text-destructive dark:text-red-500",
    info: "text-primary dark:text-purple-500",
  };

  toast.custom(() => (
    <div
      className={`bg-background shadow-toast dark:shadow-toast-dark flex w-auto items-center gap-4 rounded-xl border border-none p-4 sm:min-w-80`}
    >
      {icons[type] || icons.info}
      <div>
        <p
          className={`font-secondary text-sm font-medium ${textColors[type] || textColors.info}`}
        >
          {message}
        </p>
      </div>
    </div>
  ));
};
