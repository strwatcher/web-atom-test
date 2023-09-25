import { StorageAdapter } from "effector-storage";
import Cookies from "js-cookie";

export const cookie: StorageAdapter = <State>(key: string) => {
  return {
    get() {
      const value: string | undefined = Cookies.get(key);
      return value === undefined ? undefined : JSON.parse(value);
    },
    set(value: State) {
      Cookies.set(key, JSON.stringify(value), { path: "/" });
    },
  };
};
