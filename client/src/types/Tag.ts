export type Tag = {
  readonly kind: "Tag"; // to differntiate from Topic

  readonly id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};
