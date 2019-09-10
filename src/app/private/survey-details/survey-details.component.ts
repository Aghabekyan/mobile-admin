import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {
  FileService,
  SurveysService
} from '../shared/services/index';
import {
  YesNoEnum,
  LanguageEnum
} from '../../infrastructure/enums/index';
import {enumToString, safariDetect} from '../../infrastructure/utils/index';
import {MessageType} from '../../infrastructure/enums/index';
import {ActivatedRoute} from '@angular/router';
import saveAs from 'save-as';

@Component({
  selector: 'app-survey-details',
  templateUrl: './survey-details.component.html',
  styleUrls: ['./survey-details.component.scss']
})
export class SurveyDetailsComponent implements OnInit {

  surveyId: number;
  surveyName: string;

  textQuestions: ISurveyTextQuestion[];
  textAnswers: IQuestionAnswerGet[];
  loader = false;
  questionsLoader = true;
  answersLoader = true;

  radioButtonQuestions: IRadioButtonGet[];
  radioButtonQuestionsResults: IYesNoResult[] = [];

  selectedQuestion: number;

  tableTextCols: ITableColumn[] = [
    {field: 'deviceId', header: 'Սարքի ID'},
    {field: 'answer', header: 'Պատասխան'},
    {field: 'dateTime', header: 'Ամսաթիվ'}
  ];

  tableYesNoCols: ITableColumn[] = [
    {field: 'question', header: 'Հարց'},
    {field: 'yes', header: 'Այո'},
    {field: 'no', header: 'Ոչ'},
    {field: 'ncounto', header: 'Քանակ'}
  ];

  rowsCounts = [
    {label: '10', value: 10},
    {label: '20', value: 20},
    {label: '50', value: 50}
  ];

  rowsCount = this.rowsCounts[0].value;

  constructor(
    private surveysService: SurveysService,
    private fileService: FileService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.surveyId = +this.route.snapshot.paramMap.get('id');
    this.surveyQuestions(this.surveyId);
  }

  surveyQuestions(id: number) {
    this.surveysService.surveyQuestionsBySurveyIdAndLanguageId(id, LanguageEnum.am).subscribe((res: IResponse<ISurveyQuestionGet>) => {
      if (res) {
        if (res.success) {
          const data = res.data;
          this.surveyName = data.surveyName;
          const textQuestionsData = data.freeTextQuestions;
          if (textQuestionsData[0] && textQuestionsData[0].id) {
            this.surveyQuestionAnswers(textQuestionsData[0].id);
            this.selectedQuestion = textQuestionsData[0].id;
          }
          this.textQuestions = textQuestionsData.map(function (item) {
            return {
              value: item['id'],
              label: item['text']
            };
          });

          this.radioButtonQuestions = data.radioButtonQuestions;
          this.radioButtonQuestions.filter(item => {
            let dataYesNo;
            let yes = 0;
            let yesPercent = 0;
            let noPercent = 0;
            let count = 0;
            item['questionAnswers'].filter(answers => {
              count++;
              if (answers['answer'].toLowerCase() === YesNoEnum.yes) {
                yes++;
              }
            });
            if (yes !== 0) {
              yesPercent = (yes / count) * 100;
            } else {
              yesPercent = 50;
            }
            if (count !== 0 && yes === 0) {
              yesPercent = 0;
            }
            noPercent = 100 - yesPercent;
            dataYesNo = {
              question: item['text'],
              yes: yesPercent.toFixed(1),
              no: noPercent.toFixed(1),
              count: count
            };
            this.radioButtonQuestionsResults.push(dataYesNo);
          });
          this.questionsLoader = false;
        } else {
          this.messageService.add({severity: enumToString(MessageType, MessageType.error), detail: res.error.displayMessage});
          this.questionsLoader = false;
        }
      }
    });
  }

  surveyQuestionAnswers(id: number) {
    this.answersLoader = true;
    this.surveysService.questionAnswersByQuestionIdAndLanguageId(id, LanguageEnum.am).subscribe((res: IResponse<IQuestionAnswerGet[]>) => {
      if (res) {
        if (res.success) {
          this.textAnswers = res.data;
          if (safariDetect()) {
            this.textAnswers.forEach(x => {
              const date = new Date(x.createDate);
              date.setUTCHours(date.getUTCHours());
              x.createDate = date;
            });
          } else {
            this.textAnswers.forEach(x => {
              const date = new Date(x.createDate);
              date.setHours(date.getHours() + (-date.getTimezoneOffset() / 60));
              x.createDate = date;
            });
          }
          this.answersLoader = false;
        } else {
          this.messageService.add({severity: enumToString(MessageType, MessageType.error), detail: res.error.displayMessage});
          this.answersLoader = false;
        }
      }
    });
  }


  exportExcelBySurveyId(id: number) {
    this.loader = true;
    this.fileService.exportExcelBySurveyId(id).subscribe((res: IResponse<File>) => {
      if (res) {
        const myBlob: Blob = new Blob([<any>res]);
        saveAs(myBlob, `${this.surveyName}.xlsx`,
          {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
        this.loader = false;
      }
    });
  }


  changeQuestion() {
    this.surveyQuestionAnswers(this.selectedQuestion);
  }

  changePaginationCount(event) {
    this.rowsCount = event.value;
  }
}
