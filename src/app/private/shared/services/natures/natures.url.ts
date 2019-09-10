class NaturesApiUrl {
  constructor() {
  }

  public allCategoriesByLanguageId(id: number) {
    return `/api/nature/allCategoriesByLanguageId/${id}`;
  }

  public naturesByLanguageIdPageSizeAndPage(id: number, size: number, page: number) {
    return `/api/nature/naturesByLanguageIdPageSizeAndPage/${id}/${size}/${page}`;
  }

  public naturesById(id: number) {
    return `/api/nature/naturesById/${id}`;
  }

  public createNatures(id: number) {
    return `/api/nature/createNatures/${id}`;
  }

  public updateNatures(id: number) {
    return `/api/nature/updateNatures/${id}`;
  }

  public deleteNaturesById(id: number) {
    return `/api/nature/deleteNaturesById/${id}`;
  }
}

export const NATURES_API_URL = new NaturesApiUrl();

