export interface postInterface {
  authorId: string;
  title: string;
  content: string;
}

export interface postUpdateInterface {
  authorId?: string;
  title?: string;
  content?: string;
}
