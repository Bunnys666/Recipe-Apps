import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { api } from "~/utils/api";
import { MantineProvider, createTheme } from "@mantine/core";
import { HeaderMegaMenu } from "~/components/Nav";

import "~/styles/globals.css";
import "@mantine/core/styles.css";

const theme = createTheme({
  fontFamily: "Open Sans, sans-serif",
  primaryColor: "blue",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <MantineProvider theme={theme}>
        <HeaderMegaMenu />
        <Component {...pageProps} />
      </MantineProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
