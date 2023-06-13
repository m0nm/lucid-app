export const variants = {
  hidden: {
    opacity: 0,
    y: 60,
    transition: {
      when: "afterChildren",
    },
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
      duration: 0.5,
      staggerChildren: 0.7,
      ease: "easeOut",
    },
  },
};
