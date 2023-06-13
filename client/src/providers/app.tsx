import { Suspense } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { AppRoutes } from "../routes";
import { theme } from "../styles";
import { ErrorBoundary, PageTransition, Toaster } from "../components";

export const AppProvider = () => {
  return (
    <Suspense fallback={<PageTransition />}>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools /> */}

        <ChakraProvider theme={theme}>
          <ErrorBoundary>
            <HelmetProvider>
              <Toaster />

              <BrowserRouter>
                <AppRoutes />
              </BrowserRouter>
            </HelmetProvider>
          </ErrorBoundary>
        </ChakraProvider>
      </QueryClientProvider>
    </Suspense>
  );
};
