export type Task = {
  readonly id: string;
  title: string;
  description?: string;
  priority: "high" | "moderate" | "low" | "non-essential";
  createdAt: string;
  updatedAt: string;
};
