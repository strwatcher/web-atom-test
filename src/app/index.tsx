import { appStarted } from "@/shared/config";
import ReactDOM from "react-dom/client";
import "@mantine/core/styles.css";
import "./theme/index.css";

import { App } from "./app";

appStarted();
ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
