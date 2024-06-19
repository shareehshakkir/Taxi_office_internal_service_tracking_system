import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import "@fontsource/poppins/400.css";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const theme = extendTheme({
  colors: {
    brand: {
      purple: "#6E2594",
      purpleHover:"#8344a5",
      yellow: "#ECD444",
      offwhite: "#FCFBF9",
      green:"#19E32D",
      red:"#EA0000"
    },
  },
  fonts: {
    body: `'Poppins', sans-serif`,
    heading: `'Poppins', sans-serif`,
    button: `'Poppins', sans-serif`,
  },
  styles: {
    global: () => ({
      body: {
        bg: "#FCFBF9",
      },
    }),
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
