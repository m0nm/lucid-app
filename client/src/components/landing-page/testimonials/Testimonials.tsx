import { Testimonial } from "./Testimonial";
import avatar1 from "@/assets/testimonials/avatar-1.jpg";
import avatar2 from "@/assets/testimonials/avatar-2.jpg";
import avatar3 from "@/assets/testimonials/avatar-3.jpg";

import {
  Box,
  Heading,
  Text,
  Stack,
  Container,
  SimpleGrid,
} from "@chakra-ui/react";

const TESTIMONIALS = [
  {
    heading: "Absolutely Love It",
    text: "None of i'm saying is true but I've been using this note taking app for the past few weeks and I absolutely love it! It's quick and easy to use and I love how I can easily keep track of everything I need to remember. I highly recommend it!",
    avatar: avatar1,
    name: "Rio Fake Hogan",
    title: "Senior Bing user at Google",
  },

  {
    heading: "Life Changing App!",
    text: "I may be fake but i still have opinions, I recently started using this note taking app and I'm so glad I did! I love how organized and easy it is to use. I can quickly jot down ideas and tasks, and easily find them when I need them. It's been a great help in staying on top of things",
    avatar: avatar2,
    name: "Barney Fake Finley",
    title: "Windows cleaning technician at Apple",
  },
  {
    heading: "Just like what they said",
    text: "It has allowed me to stay organized and productive. With the app, I can easily store all of my notes in one place, and access them from any device. It's great for keeping track of ideas and organizing information for projects. Highly recommend trust me bro",
    avatar: avatar3,
    name: "Charlie Fake Bowman",
    title: "Cashier at Taco Bell",
  },
];

export const Testimonials = () => {
  return (
    <Box minH={"80vh"}>
      <Container maxW={"7xl"} py={16} as={Stack} spacing={12}>
        <Stack spacing={2} align={"center"}>
          <Heading>Meet Our Testimonials</Heading>
          <Text>They may be fake but their heart is real</Text>
        </Stack>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
          {TESTIMONIALS.map((t, i) => (
            <Testimonial
              key={t.name}
              heading={t.heading}
              text={t.text}
              name={t.name}
              avatar={t.avatar}
              title={t.title}
              delay={i}
            />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};
