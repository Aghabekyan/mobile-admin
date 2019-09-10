import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {SharedService} from '../../../../core/services/shared/index';
import {UserType} from '../../../../infrastructure/enums/index';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public items: MenuItem[];
  public currentUser: IUserClaim;


  constructor(private sharedService: SharedService) {
  }

  ngOnInit() {
    this.currentUser = this.sharedService.getData('currentUser');
    if (this.currentUser.typeID === UserType.SuperAdmin || this.currentUser.typeID === UserType.Admin) {
      this.items = [
        {
          label: 'Գլխավոր էջ և օգտագործողի ձեռնարկ',
          icon: 'icon-home',
          routerLink: ['/home']
        },
        {
          label: 'Կատեգորիաներ, ընտանիքներ',
          icon: 'icon-categories',
          routerLink: ['/categories']
        },
        {
          label: 'Բույսեր և կենդանիներ',
          icon: 'icon-species',
          routerLink: ['/natures']
        },
        {
          label: 'Հատուկ պահպանվող տարածքներ',
          icon: 'icon-area',
          routerLink: ['/areas']
        },
        {
          label: 'Հետադարձ կապ',
          icon: 'icon-suggestions',
          routerLink: ['/feedbacks']
        },
        {
          label: 'Հարցում',
          icon: 'icon-survey',
          routerLink: ['/surveys']
        }
      ];
    }

    if (this.currentUser.typeID === UserType.User) {
      this.items = [
        {
          label: 'Գլխավոր էջ',
          icon: 'ico ico-home',
          routerLink: ['/home']
        },
        {
          label: 'Կատեգորիաներ, ընտանիքներ',
          icon: 'ico ico-categories',
          routerLink: ['/categories']
        },
        {
          label: 'Բույսեր և կենդանիներ',
          icon: 'ico ico-species',
          routerLink: ['/natures']
        },
        {
          label: 'Հատուկ պահպանվող տարածքներ',
          icon: 'ico ico-area',
          routerLink: ['/areas']
        }
      ];
    }
  }


  // public slideMenuItem() {
  //   this.display = true;
  //   this.slideMenuChange.emit(this.display);
  // }

}
