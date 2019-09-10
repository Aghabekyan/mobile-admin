interface ISurveyUpdate {
  id: number;
  isActive: boolean;
  name: string;
  surveys: ISurveyItemUpdate[];
}
