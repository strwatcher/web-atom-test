import { useSession } from "@/shared/config/session";
import { Show } from "@/shared/lib/show";
import { Button, Stack } from "@mantine/core";
import { ReactNode } from "react";

export type PageLayoutProps = {
  children: ReactNode;
};

export const PageLayout = (props: PageLayoutProps) => {
  const session = useSession();
  return (
    <Stack>
      <Show when={session.isAuth}>
        <>
          <Button color="gray" onClick={session.killSession}>
            Logout
          </Button>
          {props.children}
        </>
      </Show>
    </Stack>
  );
};
