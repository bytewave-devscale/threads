export interface threadInterface {
  authorId: string;
  title: string;
  content: string;
}

export interface threadUpdateInterface {
  authorId?: string;
  title?: string;
  content?: string;
}
