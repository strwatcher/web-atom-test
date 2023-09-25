import { loginMutation } from "@/shared/api/login";
import { $token, chainAuth } from "@/shared/config/session";
import { disclosure } from "@/shared/lib/disclosure";
import { rules } from "@/shared/lib/forms/rules";
import { routes } from "@/shared/routing";
import { sample } from "effector";
import { createForm, useForm } from "effector-forms";
import { useUnit } from "effector-react";
import { ChangeEvent } from "react";

export const route = chainAuth(routes.login, {
  anonymousRoute: true,
  otherwise: routes.products.open,
});

const loginForm = createForm({
  validateOn: ["submit"],
  fields: {
    username: {
      init: "",
      rules: [rules.required()],
    },
    password: {
      init: "",
      rules: [rules.required()],
    },
  },
});

const loginFailedModal = disclosure(false);

sample({
  clock: loginForm.formValidated,
  target: loginMutation.start,
});

sample({
  clock: loginMutation.finished.success,
  fn: ({ result }) => result.token,
  target: $token,
});

sample({
  clock: loginMutation.finished.failure,
  target: loginFailedModal.open,
});

sample({
  clock: [loginMutation.finished.success, loginFailedModal.close],
  target: loginForm.reset,
});

export function useLoginModel() {
  const form = useForm(loginForm);
  const { failed, closeFailedModal } = useUnit({
    failed: loginFailedModal.$opened,
    closeFailedModal: loginFailedModal.close,
  });

  return {
    submit: form.submit,
    fields: {
      username: {
        value: form.fields.username.value,
        onChange: (e: ChangeEvent<HTMLInputElement>) =>
          form.fields.username.onChange(e.target.value),
        error: form.fields.username.errorText(),
      },
      password: {
        value: form.fields.password.value,
        onChange: (e: ChangeEvent<HTMLInputElement>) =>
          form.fields.password.onChange(e.target.value),
        error: form.fields.password.errorText(),
      },
    },
    failed,
    closeFailedModal,
  };
}
