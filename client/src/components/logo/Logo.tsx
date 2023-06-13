import { Link } from "react-router-dom";
import { useColorMode } from "@chakra-ui/react";

import logoLightMode from "@/assets/logo/logo-light-mode.png";
import logoDarkMode from "@/assets/logo/logo-dark-mode.png";

type LogoProps = {
  width?: number;
  height?: number;
};

export const Logo = ({ width = 100, height = 60 }: LogoProps) => {
  const { colorMode } = useColorMode();

  return (
    <Link style={{ display: "inline-block" }} to="/">
      {colorMode == "light" ? (
        <img
          alt={"Lucid's website logo"}
          src={logoLightMode}
          width={width}
          height={height}
        />
      ) : (
        <img
          alt={"Lucid's website logo"}
          src={logoDarkMode}
          width={width}
          height={height}
        />
      )}
    </Link>
  );
};
