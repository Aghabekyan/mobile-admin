import {AfterViewInit, Component, EventEmitter, HostListener, OnDestroy, OnInit, Output, Renderer} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {AuthService} from '../../../../core/services/auth/index';
import {SharedService} from '../../../../core/services/shared/index';
import {Router} from '@angular/router';
import {UserType} from '../../../../infrastructure/enums';


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  }
})
export class TopBarComponent implements OnInit, OnDestroy, AfterViewInit {

  public currentUser: IUserClaim;
  public subscription: Subscription;
  public activeTopBarItem: any;
  public topBarItemClick: boolean;
  public documentClickListener: Function;
  public currentUserFullName: string;
  public display = true;
  public dropDownOpen = false;

  @Output() slideMenuChange = new EventEmitter();

  constructor(public renderer: Renderer, private authService: AuthService, private sharedService: SharedService, private router: Router) {
  }

  ngOnInit() {
    this.sharedService.currentUserObservable.subscribe(value => {
      this.currentUser = value['currentUser'];
      this.currentUserFullName = this.fullName
    })
    this.currentUser = this.sharedService.getData('currentUser');
    this.currentUserFullName = this.fullName;
  }

  ngAfterViewInit() {
    this.documentClickListener = this.renderer.listenGlobal('body', 'click', (event) => {
      if (!this.topBarItemClick) {
        this.activeTopBarItem = null;
      }

      this.topBarItemClick = false;
    });
  }

  public logOut() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

  public clickEvent() {
    this.dropDownOpen = !this.dropDownOpen;
  }

  public onClick(event) {
    if (!event.target.closest('.navbar-nav')) {
      this.dropDownOpen = false;
    }
  }

  private get fullName() {
    return this.currentUser.firstName + ' ' + this.currentUser.lastName;
  }

  public slideMenu() {
    this.display = this.display ? this.display = false : this.display = true;
    this.slideMenuChange.emit(this.display);
  }

  get userIsSuperAdmin() {
    return this.currentUser && this.currentUser.typeID === UserType.SuperAdmin;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
