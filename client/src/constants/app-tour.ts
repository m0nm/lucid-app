export const JOYRIDE_CONTAINER = "joyride-container";
export const JOYRIDE_CREATE_BUTTON = "joyride-create-button";
export const JOYRIDE_NOTE_EDITOR = "joyride-note-editor";
export const JOYRIDE_NOTE_TITLE = "joyride-note-title";
export const JOYRIDE_EDITOR_TOOLS = "joyride-editor-tools";
export const JOYRIDE_NOTE_CARD = "joyride-note-card";
export const JOYRIDE_SIDEBAR = "joyride-sidebar";

export const JOYRIDE_STEPS = [
  {
    title: "Welcome to Lucid app!",
    content: `Let's take a quick tour of the onboarding process to help you get started.`,
    disableBeacon: true,
    placement: "center" as "center",
    target: "#" + JOYRIDE_CONTAINER,
  },
  {
    title: "Create Your First Note",
    content: `Let's get started by clicking on the button bellow`,
    disableBeacon: true,
    placement: "top" as "top",
    target: "#" + JOYRIDE_CREATE_BUTTON,
  },
  {
    title: "The Note Editor",
    content: `This is where you can compose and edit your notes. Feel free to unleash your creativity.`,
    disableBeacon: true,
    placement: "left" as "left",
    target: "#" + JOYRIDE_NOTE_EDITOR,
  },
  {
    title: "Adding a Note Title",
    content: `You can edit the note title here. It's important to provide a meaningful and descriptive title to help you easily find and identify your notes later.`,
    disableBeacon: true,
    placement: "bottom" as "bottom",
    target: "#" + JOYRIDE_NOTE_TITLE,
  },
  {
    title: "Formatting Tools",
    content: `The editor offers various formatting options, such as text styles, bullet points, and more.`,
    disableBeacon: true,
    placement: "bottom" as "bottom",
    target: "#" + JOYRIDE_EDITOR_TOOLS,
  },
  {
    title: "Working with Note Cards",
    content: `You can right-click on the note card to access additional options related to the note such as deleting the note, or organizing it into notebooks.`,
    disableBeacon: true,
    placement: "bottom" as "bottom",
    target: "#" + JOYRIDE_NOTE_CARD,
  },
  {
    title: "Sidebar Overview",
    content: `The sidebar provides quick access to various sections, These sections help you efficiently organize and manage your notes.`,
    disableBeacon: true,
    placement: "right" as "right",
    target: "#" + JOYRIDE_SIDEBAR,
  },
  {
    title: "All Done",
    content: `We hope this quick tour has provided you with a solid understanding of the essential features and tools available to enhance your note-taking experience.`,
    disableBeacon: true,
    placement: "center" as "center",
    target: "#" + JOYRIDE_CONTAINER,
  },
];
