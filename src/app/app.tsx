import { Pages } from "@/pages";
import { MantineProvider } from "@mantine/core";

export const App = () => {
  return (
    <MantineProvider>
      <Pages />
    </MantineProvider>
  );
};
