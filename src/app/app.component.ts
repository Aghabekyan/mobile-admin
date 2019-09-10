import {Component, OnInit} from '@angular/core';
import {LoadingService} from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = '';
  public showLoader: boolean;

  constructor(private loadingService: LoadingService) { }

  ngOnInit() {
    this.loadingService.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });
  }

}
