import {Component, OnInit, ViewChild} from '@angular/core';
import {Validators, FormBuilder, FormGroup, FormArray, FormControl} from '@angular/forms';
import {ConfirmationService} from 'primeng/api';
import {MessageService} from 'primeng/api';
import {
  SurveysService,
  GeneralInfoService
} from '../shared/services/index';
import {MapComponent} from '../shared/components/index';
import {appSettings} from '../../app.settings';
import {LanguageEnum, MessageType, QuestionType} from '../../infrastructure/enums/index';
import {enumToString} from '../../infrastructure/utils/index';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss']
})
export class SurveysComponent implements OnInit {
  @ViewChild(MapComponent) child: MapComponent;
  surveyDefined = {
    surveys: [
      {
        languageID: 2,
        surveyQuestions: [
          {
            text: 'Ձեր տարիքը',
            questionType: QuestionType.RadioButtonAge
          },
          {
            text: 'Ձեր սեռը',
            questionType: QuestionType.RadioButtonGender
          }
        ]
      },
      {
        languageID: 1,
        surveyQuestions: [
          {
            text: 'Your Age',
            questionType: QuestionType.RadioButtonAge
          },
          {
            text: 'Your Gender',
            questionType: QuestionType.RadioButtonGender
          }
        ]

      }
    ]
  };
  public languageEnum = LanguageEnum;

  isUpdate = false;
  submitted = false;
  invalidFormDisplay = false;
  loader = true;
  popupSaveLoader = false;
  surveys: ISurveyGet[];

  surveysForm: FormGroup;

  display = false;

  tableCols: any[] = [
    {field: 'surveyName', header: 'Անվանում'},
    {field: 'action', header: ''},
  ];

  languages: any[] = [
    {id: 2, name: 'Հայերեն', flag: 'arm.png'},
    {id: 1, name: 'English', flag: 'eng.png'},
  ];

  rowsCounts = [
    {label: '10', value: 10},
    {label: '20', value: 20},
    {label: '50', value: 50}
  ];

  types = [
    {label: 'Ազատ տեքստ', value: 1},
    {label: 'Այո/Ոչ', value: 2},
    {label: 'Սեռ', value: 3},
    {label: 'Տարիքային խմբեր', value: 4}
  ];

  rowsCount = this.rowsCounts[0].value;

  selectedLanguage: any = this.languages[0];

  constructor(private surveysService: SurveysService,
              private generalInfoService: GeneralInfoService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.surveysByLanguageIdPageSizeAndPage(this.selectedLanguage.id, appSettings.NATURE_ITEMS_GET_COUNT, appSettings.NATURE_ITEMS_GET_PAGE);
  }

  goToPage(pageName: string, id: number) {
    this.router.navigate([`${pageName}/${id}`]);
  }

  // showCategoryDialog() {
  //   this.categoryDisplay = true;
  // }

  surveysByLanguageIdPageSizeAndPage(id: number, size: number, page: number) {
    this.surveysService.surveysByLanguageIdSizeAndPage(id, size, page).subscribe((res: IResponse<ISurveyGet[]>) => {
      if (res) {
        if (true) {
          this.surveys = res.data;
          this.loader = false;
        } else {
          this.messageService.add({severity: enumToString(MessageType, MessageType.error), detail: res.error.displayMessage});
        }
      }
    });
  }

  initForm() {
    const form = this.fb.group({
      name: [null, [Validators.required]],
      surveys: this.fb.array([])
    });

    if (this.isUpdate) {
      form.addControl('id', new FormControl(0));
    }
    this.surveysForm = form;
  }

  createSurvey(languageID = null): FormGroup {
    return this.fb.group({
      languageID: new FormControl(languageID),
      surveyQuestions: this.fb.array([])
    });
  }

  createQuestion(index?: number): FormGroup {
    const form = this.fb.group({
      questionType: new FormControl(1, [Validators.required]),
      text: new FormControl(null, [Validators.required]),
    });

    if (!this.isUpdate) {
      form.addControl('index', new FormControl(index));
    }

    if (this.isUpdate) {
      form.addControl('id', new FormControl(0));
    }

    return form;
  }

  clickEditItem(id: number) {
    this.surveysService.surveysById(id).subscribe((res: IResponse<ISurveyGetForUpdate>) => {
      if (res) {
        if (res.success) {
          const data = res.data;

          this.isUpdate = true;
          this.initForm();
          res.data.surveys.filter(survey => {
            const surveys = this.surveysForm.get('surveys') as FormArray;
            const surveyCreate = this.createSurvey(survey.languageID);
            surveys.push(surveyCreate);

            survey.surveyQuestions.filter(() => {
              const surveyQuestions = surveyCreate.get('surveyQuestions') as FormArray;
              surveyQuestions.push(this.createQuestion(null));
            });
          });
          this.surveysForm.patchValue(<any>data);
          this.display = true;
        } else {
          this.messageService.add({severity: enumToString(MessageType, MessageType.error), detail: res.error.displayMessage});
        }
      }
    });
  }


  addQuestion() {
    const surveys = this.surveysForm.get('surveys') as FormArray;
    surveys.controls.filter((survey) => {
      const questions = survey.get('surveyQuestions') as FormArray;
      const index = questions && questions.length > 0 ? questions.at(questions.length - 1).get('index').value + 1 : 0;

      const question = this.createQuestion(index);
      question.valueChanges.subscribe((item) => {
        const surveysForChange = this.surveysForm.get('surveys') as FormArray;
        surveysForChange.controls.forEach((surveyForChange: FormGroup) => {
          (surveyForChange.controls.surveyQuestions as FormArray).controls.filter(surveyQuestion => surveyQuestion.get('index').value === item.index).forEach(surveyQuestion => {
            surveyQuestion.get('questionType').patchValue(item.questionType, {emitEvent: false});
          });
        });
      });
      questions.push(question);
      this.surveysForm.markAsDirty();
    });
  }

  deleteQuestion(index) {
    this.confirmationService.confirm({
      message: `Վստա՞հ եք, որ ցանկանում եք հեռացնել այս իմֆորմացիան։`,
      accept: () => {
        const surveys = this.surveysForm.get('surveys') as FormArray;
        surveys.controls.filter(item => {
          const questions = item.get('surveyQuestions') as FormArray;
          questions.removeAt(index);
        });
        this.surveysForm.markAsDirty();
      },
      reject: () => {
        return false;
      }
    });
  }

  getFormByLang(form, control_name, languageID: LanguageEnum) {
    return form['controls'][control_name]['controls'].filter(obj => obj.value.languageID === languageID)[0];
  }

  save() {
    this.submitted = true;
    this.popupSaveLoader = true;
    if (this.surveysForm.invalid) {
      this.invalidFormDisplay = true;
      this.popupSaveLoader = false;
      return;
    }
    if (this.isUpdate) {
      this.surveysService.updateSurveys(this.selectedLanguage.id, this.surveysForm.value).subscribe((res: IResponse<ISurveyGet>) => {
        if (res) {
          if (res.success) {
            const nature = this.surveys.filter(x => x.id === res.data.id)[0];
            const natureIndex = this.surveys.indexOf(nature);
            this.surveys[natureIndex] = res.data;
            this.display = false;
            this.resetForm();
            this.messageService.add({severity: enumToString(MessageType, MessageType.success), detail: res.message});
            this.popupSaveLoader = false;
          } else {
            this.messageService.add({severity: enumToString(MessageType, MessageType.error), detail: res.error.displayMessage});
            this.popupSaveLoader = false;
          }
        }
      });
    } else {
      this.surveysService.createSurveys(this.selectedLanguage.id, this.surveysForm.value).subscribe((res: IResponse<ISurveyGet>) => {
        if (res) {
          if (res.success) {
            this.surveys.unshift(res.data);
            this.display = false;
            this.resetForm();
            this.surveysByLanguageIdPageSizeAndPage(this.selectedLanguage.id, appSettings.NATURE_ITEMS_GET_COUNT, appSettings.NATURE_ITEMS_GET_PAGE);
            this.messageService.add({severity: enumToString(MessageType, MessageType.success), detail: res.message});
            this.popupSaveLoader = false;
          } else {
            this.messageService.add({severity: enumToString(MessageType, MessageType.error), detail: res.error.displayMessage});
            this.popupSaveLoader = false;
          }
        }
      });
    }
    this.submitted = false;
    this.invalidFormDisplay = false;
  }

  cancel() {
    if (this.surveysForm.dirty) {
      this.confirmationService.confirm({
        message: `Վստա՞հ եք, որ ցանկանում եք չեղարկել։ Ձեր կատարած փոփոխությունները չեն պահպանվելու։`,
        accept: () => {
          this.resetForm();
          this.display = false;
          this.submitted = false;
        },
        reject: () => {
          return false;
        }
      });
    } else {
      this.resetForm();
      this.display = false;
      this.submitted = false;
    }
  }

  resetForm() {
    this.initForm();
  }

  addSurvey() {
    this.isUpdate = false;
    this.initForm();
    const surveys = this.surveysForm.get('surveys') as FormArray;

    this.surveyDefined.surveys.filter(survey => {
      const surveyCreate = this.createSurvey(survey.languageID);
      surveys.push(surveyCreate);
      let index = 0;
      survey.surveyQuestions.filter(() => {
        index++;
        const surveyQuestions = surveyCreate.get('surveyQuestions') as FormArray;
        const question = this.createQuestion(index);
        question.valueChanges.subscribe((item) => {
          const surveysForChange = this.surveysForm.get('surveys') as FormArray;

          surveysForChange.controls.forEach((surveyForChange: FormGroup) => {
            (surveyForChange.controls.surveyQuestions as FormArray).controls.filter(surveyQuestion => surveyQuestion.get('index').value === item.index).forEach(surveyQuestion => {
              surveyQuestion.get('questionType').patchValue(item.questionType, {emitEvent: false});
            });
          });
        });
        surveyQuestions.push(question);
      });
    });
    this.surveysForm.patchValue(this.surveyDefined);
    this.display = true;
  }

  activateOrDeactivateSurvey(id: number, isActive: boolean) {
    this.loader = true;
    this.surveysService.activateOrDeactivateSurvey(id, isActive).subscribe((res: IResponse<void>) => {
      if (res) {
        if (res.success) {
          this.surveysByLanguageIdPageSizeAndPage(this.selectedLanguage.id, appSettings.NATURE_ITEMS_GET_COUNT, appSettings.NATURE_ITEMS_GET_PAGE);
          this.messageService.add({severity: enumToString(MessageType, MessageType.success), detail: res.message});
          this.loader = false;
        } else {
          this.messageService.add({severity: enumToString(MessageType, MessageType.error), detail: res.error.displayMessage});
          this.loader = false;
        }
      }
    });
  }

  changePaginationCount(event) {
    this.rowsCount = event.value;
  }
}
