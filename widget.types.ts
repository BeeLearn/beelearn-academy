export type FormChange<T, U> = {
  (event: "change", value: T): void;
  (event: "submit", options: U): Promise<void>;
  (event: 'update:submitting', value: boolean): void;
}

export type FormExpose = {
  readonly changed: boolean;
  readonly isCorrect?: boolean;
  submit: () => Promise<void>;
  reset: () => void;
}

export type DeepPartial <T> =  T extends object ? {[P in keyof T]?: DeepPartial<T[P]>} : T;