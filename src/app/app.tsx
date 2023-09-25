import { Pages } from "@/pages";
import { LoadingOverlay, MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { RouterProvider } from "atomic-router-react";
import { router } from "@/shared/routing";
import { useUnit } from "effector-react";
import { $pending } from "@/shared/api";

export const App = () => {
  const pending = useUnit($pending);

  return (
    <MantineProvider theme={theme}>
      <RouterProvider router={router}>
        <Pages />
        <LoadingOverlay pos={"fixed"} visible={pending} />
      </RouterProvider>
    </MantineProvider>
  );
};
