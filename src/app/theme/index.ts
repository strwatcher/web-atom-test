import { Paper, createTheme } from "@mantine/core";

export const theme = createTheme({
  components: {
    Paper: Paper.extend({}),
  },
});
