import { ReactNode } from "react";

export type FormProps = {
  onSubmit: () => void;
  onReset: () => void;
  children: ReactNode;
  className?: string;
};

export const Form = (props: FormProps) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.onSubmit();
      }}
      onReset={(e) => {
        e.preventDefault();
        props.onReset();
      }}
      className={props.className}
    >
      {props.children}
    </form>
  );
};
