export interface threadInterface {
  authorId: string;
  title: string;
  content: string;
}
export interface threadCreateInterface {
  authorId: string;
  title: string;
  content: string;
  authData: { userId: string; accessToken?: string };
}

export interface threadUpdateInterface {
  authorId?: string;
  title?: string;
  content?: string;
  authData: { userId: string; accessToken?: string };
}
