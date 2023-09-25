import { Alert, Modal } from "@mantine/core";
import s from "./s.module.css";

type WrongDataAlertProps = {
  opened: boolean;
  onClose: () => void;
};

export const WrongDataAlert = (props: WrongDataAlertProps) => {
  return (
    <Modal
      classNames={{ content: s.content, body: s.body }}
      withCloseButton={false}
      centered
      {...props}
    >
      <Alert variant="filled" color="red">
        Password or username is incorrect. Try to pass your data again.
      </Alert>
    </Modal>
  );
};
