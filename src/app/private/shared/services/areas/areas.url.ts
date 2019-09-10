class AreasApiUrl {
  constructor() {
  }


  public allCategoriesByLanguageId(id: number) {
    return `/api/natureArea/allCategoriesByLanguageId/${id}`;
  }

  public natureAreasByLanguageIdPageSizeAndPage(id: number, size: number, page: number) {
    return `/api/natureArea/natureAreasByLanguageIdPageSizeAndPage/${id}/${size}/${page}`;
  }

  public natureAreasById(id: number) {
    return `/api/natureArea/natureAreasById/${id}`;
  }

  public createNatureAreas(id: number) {
    return `/api/natureArea/createNatureAreas/${id}`;
  }

  public updateNatureAreas(id: number) {
    return `/api/natureArea/updateNatureAreas/${id}`;
  }

  public deleteNatureAreasById(id: number) {
    return `/api/natureArea/deleteNatureAreasById/${id}`;
  }
}

export const AREAS_API_URL = new AreasApiUrl();

