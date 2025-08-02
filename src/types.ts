export interface FightHistory {
  opponent: string;
  result: 'Win' | 'Loss' | 'Draw';
  event: string;
}

export interface Fighter {
  id: number;
  name: string;
  nickname: string;
  weight_class: string;
  nationality: string;
  record: {
    wins: number;
    losses: number;
    draws: number;
  };
  stats: {
    height: string;
    weight: string;
    reach: string;
    style: string;
  };
  image: string;
  attributes?: {
    skill: string;
    value: number;
  }[];
  fight_history?: FightHistory[];
}

export interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  main_card: {
    match: string;
    weight_class: string;
  }[];
  image: string;
}

export interface News {
  id: number;
  title: string;
  source: string;
  date: string;
  summary: string;
  image: string;
}

export interface Comment {
  id: number;
  postId: string;
  author: string;
  content: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}
