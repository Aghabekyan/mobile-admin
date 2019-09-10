import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SharedService} from '../core/services/shared/index';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent implements OnInit {
  public isOpen = true;

  constructor(private sharedService: SharedService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: { user: IUserClaim }) => {
      this.sharedService.setData(data.user, 'currentUser');
    });
  }

  displayMenuChanged(event) {
    this.isOpen = event;
  }
  onResize(event) {
    if (this.isOpen && event.target.innerWidth <= 768) {
      this.isOpen = false;
    } else if (!this.isOpen && event.target.innerWidth > 768) {
      this.isOpen = true;
    }
  }
}
