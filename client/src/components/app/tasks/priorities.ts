import { Task } from "@/types";

export type PriorityOption = {
  color: string;
  label: string;
  value: Task["priority"];
};

export const priorityOptions: PriorityOption[] = [
  { color: "#FF5630", label: "High", value: "high" },
  { color: "#FFC400", label: "Moderate", value: "moderate" },
  { color: "#0052CC", label: "Low", value: "low" },
  { color: "#999", label: "Non essential", value: "non-essential" },
];
