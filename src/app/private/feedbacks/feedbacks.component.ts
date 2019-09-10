import {Component, OnInit} from '@angular/core';
import {GeneralInfoService} from '../shared/services';
import {enumToString, safariDetect} from '../../infrastructure/utils/index';
import {MessageType} from '../../infrastructure/enums';
import {MessageService} from '../../../../node_modules/primeng/api';
import {environment} from '../../../environments/environment';
import {appSettings} from '../../app.settings';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.scss']
})
export class FeedbacksComponent implements OnInit {

  rowsCounts = [
    {label: '10', value: 10},
    {label: '20', value: 20},
    {label: '50', value: 50}
  ];

  rowsCount = this.rowsCounts[0].value;
  natureFeedbacks: INatureFeedback[];
  loader = true;
  imageEnvironmentUrl: string;

  cols = [
    {field: 'name', header: 'Անուն'},
    {field: 'email', header: 'Էլ․հասցե'},
    {field: 'natureName', header: 'Տեսակ'},
    {field: 'subject', header: 'Վերնագիր'},
    {field: 'createDate', header: 'Ամսաթիվ'}];

  constructor(private generalInfoService: GeneralInfoService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.imageEnvironmentUrl = `${environment.userHostingUrl + appSettings.IMAGE_SOURCE}`;
    this.getNaturesFeedbacks();
  }

  getNaturesFeedbacks() {
    this.generalInfoService.naturesFeedbacks().subscribe((res: IResponse<INatureFeedback[]>) => {
      if (res) {
        if (res.success) {
          this.natureFeedbacks = res.data;
          if (safariDetect()) {
            this.natureFeedbacks.forEach(x => {
              const date = new Date(x.createDate);
              date.setUTCHours(date.getUTCHours());
              x.createDate = date;
            });
          } else {
            this.natureFeedbacks.forEach(x => {
              const date = new Date(x.createDate);
              date.setHours(date.getHours() + (-date.getTimezoneOffset() / 60));
              x.createDate = date;
            });
          }
          this.natureFeedbacks.forEach(x => {
            x.natureFeedbacksImages = [];
            x.natureFeedbackImages.forEach(y => {
              x.natureFeedbacksImages.push({source: this.imageEnvironmentUrl + y, thumbnail: this.imageEnvironmentUrl + y});
            });
          });
          this.loader = false;
        } else {
          this.messageService.add({severity: enumToString(MessageType, MessageType.error), detail: res.error.displayMessage});
        }
      }
    });
  }

  changePaginationCount(event) {
    this.rowsCount = event.value;
  }

}
