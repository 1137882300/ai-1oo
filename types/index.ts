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
  }

export interface NewlyAddedItem {
    name: string;
    category: string;
    link: string;
}