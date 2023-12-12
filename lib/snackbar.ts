type GlobalProps = {
  rootClass: string;
  duration: number;
  snackbarClass: string;
  snackbarEnterActiveClass: string;
  snackbarEnterLeaveClass: string;
};

type SnackbarProps = {
  className: string;
  onOpen?: () => void;
  onClose?: () => void;
};

type AddAnimationClassProps = {
  onanimationend: ((event: AnimationEvent) => void) | undefined;
};

const styleElement = function (element: HTMLElement, className?: string) {
  const classList = className?.split(" ");
  if (classList) element.classList.add(...classList);
};

const addAnimationClass = function (
  element: HTMLElement,
  className: string,
  props?: AddAnimationClassProps
) {
  styleElement(element, className);

  const eventListener = (event: AnimationEvent) => {
    element.classList.remove(...className.split(" "));
    element.removeEventListener("animationend", eventListener);

    if (props?.onanimationend) props.onanimationend(event);
  };

  element.addEventListener("animationend", eventListener);
};

export default class SnackbarImpl {
  static #root: HTMLElement;
  static queue: HTMLElement[] = [];

  private timer?: number;
  private active?: HTMLElement;

  private get root() {
    if (!SnackbarImpl.#root) {
      const root = document.createElement("div");
      styleElement(root, this.props.rootClass);
      document.body.append(root);
      SnackbarImpl.#root = root;
    }

    return SnackbarImpl.#root;
  }

  constructor(private props: GlobalProps) {
    this.root;
  }

  show(nodes: HTMLElement[], props?: Partial<SnackbarProps>) {
    const container = document.createElement("div");

    styleElement(
      container,
      Object.assign(this.props.snackbarClass, props?.className)
    );

    container.append(...nodes);

    if (SnackbarImpl.queue.length === 0) this.showSnackbar(container);

    SnackbarImpl.queue.push(container);

    return () => this.removeSnackbar(container);
  }

  private showSnackbar(snackbar: HTMLElement) {
    this.active = snackbar;

    addAnimationClass(snackbar, this.props.snackbarEnterActiveClass);

    this.timer = window.setTimeout(() => {
      const snackbar = SnackbarImpl.queue.shift()!;
      this.removeSnackbar(snackbar);
    }, this.props.duration);

    this.root.appendChild(snackbar);
  }

  private removeSnackbar(snackbar: HTMLElement) {
    return addAnimationClass(snackbar, this.props.snackbarEnterLeaveClass, {
      onanimationend: () => {
        snackbar.remove();

        if (SnackbarImpl.queue.length > 0)
          this.showSnackbar(SnackbarImpl.queue.at(0)!);
      },
    });
  }

  clearAll() {
    window.clearTimeout(this.timer);

    SnackbarImpl.queue = [];
    if (this.active) this.removeSnackbar(this.active);
  }
}
