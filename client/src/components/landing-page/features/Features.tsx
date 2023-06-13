import { motion } from "framer-motion";
import { useColorMode, Image, SimpleGrid, Heading } from "@chakra-ui/react";
import { Feature } from "./Feature";

import NotebookIcon from "@/assets/features/notebook.svg";
import BulbIcon from "@/assets/features/bulb.svg";
import LockIcon from "@/assets/features/lock.svg";

const FEATURES = [
  {
    title: "Organized and Accessible Notes",
    text: "No more scattered notes or forgotten ideas",
    icon: NotebookIcon,
  },
  {
    title: "Enhance Your Productivity",
    text: "Focus on what's important and get more done in less time",
    icon: BulbIcon,
  },
  {
    title: "Secure and Private",
    text: "We use industry-standard security measures to keep your data secure and encrypted",
    icon: LockIcon,
  },
];

export const Features = () => {
  const { colorMode } = useColorMode();

  const bgColor = colorMode == "light" ? "cyan.100" : undefined;

  const _before = {
    content: '""',
    pos: "absolute",
    inset: 0,
    bgGradient: `linear(to-b, white, ${bgColor})`,
    h: 200,
    w: "full",
  };

  const _after = {
    ..._before,
    top: "100%",
    transform: "scaleY(-1)",
  };

  return (
    <SimpleGrid
      p={16}
      minH={"100vh"}
      pos={"relative"}
      spacing={20}
      textAlign={"center"}
      placeContent={"center"}
      my={_after.h}
      bg={bgColor}
      _before={_before}
      _after={_after}
    >
      <Heading
        as={motion.h2}
        mt={_before.h}
        transition={"200ms"}
        viewport={{ once: true }}
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        Features
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={12}>
        {FEATURES.map((feature, i) => (
          <Feature
            key={feature.icon}
            title={feature.title}
            text={feature.text}
            icon={<Image src={feature.icon} w={12} h={12} />}
            delay={i}
          />
        ))}
      </SimpleGrid>
    </SimpleGrid>
  );
};
