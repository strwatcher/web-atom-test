import { ReactNode } from "react";

export type FormProps = {
  onSubmit: () => void;
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
      className={props.className}
    >
      {props.children}
    </form>
  );
};
