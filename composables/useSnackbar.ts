import SnackbarImpl from "~/lib/snackbar";

function buildDefaultSnackbar() {
  return new SnackbarImpl({
    duration: 4000,
    snackbarClass: "flex items-center px-2 py-4 space-x-2 bg-black text-white md:rounded-xl md:w-1/2 lg:w-1/3",
    snackbarEnterActiveClass: "animate-slide-up animation-duration-200",
    snackbarEnterLeaveClass: "animate-slide-down animation-duration-200",
    rootClass: "fixed inset-0 flex flex-col justify-end pointer-events-none z-99999 md:items-start md:p-2",
  });
}

export default function useSnackbar() {
	const snackbar = buildDefaultSnackbar();

  return {
    show(...content: HTMLElement[]) {
      return snackbar.show(content);
    },
  };
}
