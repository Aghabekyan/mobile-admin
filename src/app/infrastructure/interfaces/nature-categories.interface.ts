interface INatureCategories {
  id: number;
  name: string;
  parentCategoryID?: number;
  childrenCategories: INatureCategories[];
}
