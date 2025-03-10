export type NavigationItem = {
  name: string;
  url: string;
};

export type HomePagaData = {
  title: string;
  description: string;
  sections: { title: string; text: string }[];
  comparisonTable: {
    name: string;
    speed: string;
    limit: string;
    async: string;
    support: string;
  }[];
  sources: { name: string; url: string }[];
};
