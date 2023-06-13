import { chakra, shouldForwardProp } from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";

export const MotionBox = chakra(motion.div, {
  shouldForwardProp: (p) => isValidMotionProp(p) || shouldForwardProp(p),
});

export const MotionHeader = chakra(motion.header, {
  shouldForwardProp: (p) => isValidMotionProp(p) || shouldForwardProp(p),
});

export const MotionSpan = chakra(motion.span, {
  shouldForwardProp: (p) => isValidMotionProp(p) || shouldForwardProp(p),
});

export const MotionHeading = chakra(motion.h1, {
  shouldForwardProp: (p) => isValidMotionProp(p) || shouldForwardProp(p),
});
