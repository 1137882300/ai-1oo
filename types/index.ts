export interface Item {
  name: string;
  link: string;
  isNew?: boolean;
}

export interface Category {
  title: string;
  icon: string;
  items: Item[];
}

export interface ClaudeArtifact {
    title: string;
    image: string;
    link: string;
  }

export interface NewlyAddedItem {
    name: string;
    category: string;
    link: string;
}

export interface Income {
  _id: string;
  userId: string;
  date: string;
  amount: number;
  note: string | null;
  bonus: number;
  personalIncomeTax: number;
  socialInsurance: number;
  [key: string]: any;
}