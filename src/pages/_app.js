import "@/styles/globals.css";

import { QueryClient, QueryClientProvider } from "react-query";

import { ThemeProvider } from "styled-components";

import { store } from "@/redux/store";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={store.getState().theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}
