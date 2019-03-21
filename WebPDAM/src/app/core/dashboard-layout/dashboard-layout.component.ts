import { Component, ViewChild } from '@angular/core';

const SMALL_WIDTH_BREAKPOINT = 1279;

@Component({
  selector: 'app-layout',
  styles: [`mat-sidenav { minWidth: 250px; }
    .dashboard-container { display: flex; flex-direction: column; position: absolute; top: 0; bottom: 0; left: 0; right: 0; }`],
  templateUrl: './dashboard-layout.component.html'
})
export class DashboardLayoutComponent {

  mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);
  @ViewChild('sidenav') sidenav;
  mode: string;

  isOver(): boolean {
    return this.mediaMatcher.matches;
  }

}
