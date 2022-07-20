export interface KanbanCard {
  tag: Tag;
  title: string;
  description: string;
  link: string;
  id: string;
}

export interface Tag {
  text: string;
  color: string;
}