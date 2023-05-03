import "@/styles/globals.css";

import { QueryClient, QueryClientProvider } from "react-query";

import { ThemeProvider } from "styled-components";

import { store } from "@/redux/store";
import { Provider } from "react-redux";

import { ToastContextProvider } from "@/components/Toast";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51MIbFPKIMXWjyb0RbwrsTmdV1UEMbLbWurChpX4l75ckVcJoa4SjMnaqiNpnryRlBKOtUliJoXKPW5dmOWUfEnTH00RS7kMPO7"
);

export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient();
  return (
    <Elements stripe={stripePromise}>
      <Provider store={store}>
        <ToastContextProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={store.getState().theme}>
              <Component {...pageProps} />
            </ThemeProvider>
          </QueryClientProvider>
        </ToastContextProvider>
      </Provider>
    </Elements>
  );
}
