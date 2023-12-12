export type Category = {
  id: number;
  name: string;
  icon: string;
};

export type Tag = {
    id: number,
    name: string,
    category?: Category,
}