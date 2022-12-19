export enum Category {
  TOP_STORIES = 'topstories',
  NEW_STORIES = 'newstories',
  BEST_STORIES = 'beststories',
  ASK_STORIES = 'askstories',
  SHOW_STORIES = 'showstories',
  JOB_STORIES = 'jobstories',
}

export type StoriesResponse = number[];

export type Comment = {
  by: string;
  id: number;
  kids?: number[];
  time: number;
  text: string;
  type: 'comment';
  parent: number;
};

export type Story = {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: 'story';
  url: string;
  text?: string;
};

export type Item = Story | Comment;

export type StoriesResponseDecorated = Story[];
