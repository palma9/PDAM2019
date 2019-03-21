import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuService } from '../menu/menu.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  providers: [MenuService]
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();

  constructor(public menuService: MenuService, public translate: TranslateService) { }

  ngOnInit() {
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
}
