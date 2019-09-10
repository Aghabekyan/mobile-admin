class CategoriesApiUrl {
  constructor() {
  }

  public allCategoriesByLanguageId(id: number) {
    return `/api/category/allCategoriesByLanguageId/${id}`;
  }

  public natureCategoriesById(id: number) {
    return `/api/category/natureCategoriesById/${id}`;
  }

  public createCategories(id: number) {
    return `/api/category/createCategories/${id}`;
  }

  public updateCategoriesById(id: number) {
    return `/api/category/updateCategoriesById/${id}`;
  }

  public deleteCategoriesById(id: number) {
    return `/api/category/deleteCategoriesById/${id}`;
  }
}

export const CATEGORIES_API_URL = new CategoriesApiUrl();

