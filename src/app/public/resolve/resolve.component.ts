import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {SharedService} from '../../core/services';
import {LocalizationService} from '../../core/services/localization';

@Component({
  selector: 'app-resolve',
  templateUrl: 'resolve.component.html',
  styleUrls: ['resolve.component.scss']
})
export class ResolveComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              protected router: Router,
              private sharedService: SharedService,
              private localizationService: LocalizationService) { }

  ngOnInit() {
    this.route.data.subscribe((res: any)  => {
      this.localizationService.navigateTo('login');
    });
  }
}
