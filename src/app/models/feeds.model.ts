export interface Feed {
  id: number;
  video: string;
  username: string;
  soundTrack: string;
  description: string;
  actions: Actions;
}

export interface Actions {
  likes: number;
  comments: number;
  bookmarks: number;
  bookmarked: boolean;
  liked: boolean;
}
