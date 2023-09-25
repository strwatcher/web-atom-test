import { Form } from "@/shared/ui/form";
import {
  Button,
  Container,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useLoginModel } from "../model";
import { WrongDataAlert } from "./wrong-data-alert";
import s from "./s.module.css";

export const LoginPage = () => {
  const model = useLoginModel();
  return (
    <Container className={s.container}>
      <Paper>
        <Form onSubmit={model.submit}>
          <Stack>
            <Title>Authorization</Title>
            <TextInput label="Username" {...model.fields.username} />
            <PasswordInput label="Password" {...model.fields.password} />
            <Button type="submit">Login</Button>
          </Stack>
        </Form>
      </Paper>
      <WrongDataAlert opened={model.failed} onClose={model.closeFailedModal} />
    </Container>
  );
};
