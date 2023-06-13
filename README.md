<p align="center">
<img src="./assets/logo.png" />
</p>

<h1 align="center">Lucid</h1>
<h3 align="center">A simple note taking web app.</h3>

<p align="center">
<img src="./assets/landing.png" />
</p>

<p align="center">
<img src="./assets/app.png" />
</p>

<p align="center">
<a href="link">Check out the demo</a>
</P>
<br />

## Table of Content

- [What is Lucid ?](#what-is-lucid)
- [Features](#features)
- [Tech Stack](#tech-stack)
  - [Client](#client)
  - [Server](#server)
- [Running Locally](#running-locally)

## What is Lucid ?

Lucid is a free and secure note-taking app designed with user privacy in mind. It provides a comprehensive set of features to ensure the best note-taking experience while safeguarding your personal information.

Happy note-taking with Lucid!

## Features

- 🔒 Safe and Encrypted Notes: Lucid employs the robust AES-256-CBC Advanced Encryption Standard to encrypt your notes, ensuring that only you have access to their content.

- 🌈 Rich Text Formatting: Customize the appearance of your notes using a variety of formatting options. Lucid supports bold, italics, underline, bullet points, numbered lists, headings, and more, giving you the flexibility to structure your notes as you prefer.

- 📷 Image Support: Lucid allows you to easily include images in your notes. Simply paste the URL of an image, and Lucid will display it within your notes. This feature enables you to enhance your note content with visual elements, making it more engaging and informative.

- ⚡️ Quick Search: Lucid offers a lightning-fast search functionality that allows you to find specific notes effortlessly. Whether you remember a keyword, phrase, or even a partial match, Lucid's search feature will retrieve the relevant notes, saving you time and effort.

- 🗂️ Tags and Notebooks: Keep your notes organized and easily accessible with the help of tags and notebooks. Lucid lets you assign tags and categorize your notes, enabling you to quickly filter and locate specific information within your note collection.

## Tech Stack

The Lucid note-taking web app is built with the following technologies:

### Client:

- React with Vite: The client-side of Lucid is developed using React framework with the fast build tool Vite.

- Typescript: Lucid utilizes TypeScript for static typing, enabling enhanced code quality, better maintainability, and improved developer productivity.

- TipTap Editor: The app leverages the TipTap editor, a modern and extensible WYSIWYG editor built for Vue.js and React, to provide a rich and intuitive note-taking interface.

- Zustand: a minimalistic state management library.

- Chakra UI: a versatile and accessible UI component library.

- React Query: React Query is integrated into Lucid to handle data fetching and state synchronization between the client and server, enabling efficient and optimized data management.

- React Virtuoso: a virtualization library, for smooth scrolling and optimized performance.

### Server:

- Node.js and Express.js: The server-side of Lucid is built on the Node.js runtime using the Express.js framework, providing a robust and scalable foundation for handling HTTP requests and building APIs.

- Typescript: Similar to the client-side, the server-side of Lucid is developed using TypeScript for type safety, better code organization, and improved developer experience.

- Zod: Zod, a TypeScript-first schema validation library, is employed to validate and sanitize user input, ensuring data integrity and security on the server side.

- Mongoose: Lucid utilizes Mongoose, an elegant MongoDB object modeling tool, to interact with the MongoDB database and perform operations such as storing and retrieving user notes.

- Passport.js: a widely used authentication middleware for Node.js, is integrated into Lucid to handle user authentication and provide secure access to the note-taking app.

## Running Locally

To run Lucid locally on your machine, follow these steps:

1. Clone the repository:

```
git clone https://github.com/m0nm/lucid-app.git
```

2. Set up the client:

   - Navigate to the `client` folder in the cloned repository.
   - Follow the instructions in the `README` file located in the `client` folder to set up the client-side of Lucid.

3. Set up the server:

   - Navigate to the `server` folder in the cloned repository.
   - Follow the instructions in the `README` file located in the `server` folder to set up the server-side of Lucid.

Once both the client and server are set up, you can start using Lucid on your local machine.
