import { createApi, createStore } from "effector";

export function disclosure(initValue: boolean) {
  const $opened = createStore(initValue);
  const { open, close } = createApi($opened, {
    open: () => true,
    close: () => false,
  });

  return {
    $opened,
    open,
    close,
  };
}
