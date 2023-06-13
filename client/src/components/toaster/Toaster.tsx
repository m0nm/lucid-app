import { useColorModeValue } from "@chakra-ui/react";
import { Toaster as ReactToaster } from "react-hot-toast";

export const Toaster = () => {
  return useColorModeValue(<LightModeToast />, <DarkModeToast />);
};

function DarkModeToast() {
  return (
    <ReactToaster
      toastOptions={{
        duration: 3000,
        position: "bottom-right",

        style: {
          backgroundColor: "#F7FAFC",
          color: "#111",
        },
      }}
    />
  );
}

function LightModeToast() {
  return (
    <ReactToaster
      toastOptions={{
        duration: 3000,
        position: "bottom-right",

        style: {
          backgroundColor: " #171923",
          color: "#F7FAFC",
        },
      }}
    />
  );
}
