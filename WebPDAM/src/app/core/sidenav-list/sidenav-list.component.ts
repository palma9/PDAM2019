import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/controller/services/auth.service';

import { MenuService } from '../menu/menu.service';
import { UserResponse } from 'src/app/controller/interfaces/user-response';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  providers: [MenuService]
})
export class SidenavListComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter();

  logout = 'LOGOUT';
  loggedUser: UserResponse;

  constructor(public menuService: MenuService, public translate: TranslateService, public authService: AuthService) {
    translate.setDefaultLang('es');
  }

  ngOnInit() {
    this.loggedUser = this.authService.getUser();
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

}
