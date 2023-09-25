type Props<T> = {
  when: T | false | null | undefined;
  children: JSX.Element | ((value: T) => JSX.Element);
};
export const Show = <T,>(props: Props<T>) => {
  if (props.when) {
    return typeof props.children === "function"
      ? props.children(props.when)
      : props.children;
  }
  return null;
};
