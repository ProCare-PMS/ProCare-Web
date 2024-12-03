import Swal from "sweetalert2";

const SwalToaster = (
  message: string,
  type: "success" | "error" | "info" | "warning",
  title?: string
) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    color: "white",
    background:
      type === "success"
        ? "#7DDA58"
        : type === "error"
        ? "#D20103"
        : type === "warning"
        ? "#FF7701"
        : "#9D9B9B",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  Toast.fire({
    icon: type,
    title: title,
    text: message,
  });
};

export default SwalToaster;
