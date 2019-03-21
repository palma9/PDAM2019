import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/controller/services/auth.service';

export interface Menu {
  state: string;
  name: string;
  icon: string;
}

const ADMINMENUITEMS = [
  {
    state: 'schools',
    name: 'SCHOOLS',
    icon: 'school'
  }
];

const SCHOOLMANAGERMENUITEM = [
  {
    state: 'substitutions',
    name: 'SUBSTITUTIONS',
    icon: 'notifications'
  }, {
    state: 'teachers',
    name: 'TEACHERS',
    icon: 'people'
  }, {
    state: 'profile',
    name: 'PROFILE',
    icon: 'person'
  }, {
    state: 'schedule',
    name: 'SCHEDULE',
    icon: 'calendar_today'
  }, {
    state: 'subjects',
    name: 'SUBJECTS',
    icon: 'class'
  }, {
    state: 'grades',
    name: 'GRADES',
    icon: 'school'
  }, {
    state: 'classrooms',
    name: 'CLASSROOMS',
    icon: 'meeting_room'
  }
];

const TEACHERMENUITEM = [
  {
    state: 'substitutions',
    name: 'SUBSTITUTIONS',
    icon: 'notifications'
  }, {
    state: 'profile',
    name: 'PROFILE',
    icon: 'person'
  }
];

const NOSCHOOLMENUITEM = [
  {
    state: 'noschool',
    name: 'CREATESCHOOL',
    icon: 'school'
  }
];

@Injectable()
export class MenuService {

  constructor(public authService: AuthService) { }

  getAll(): Menu[] {
    const user = this.authService.getUser();
    if (user.role === 'admin') {
      return ADMINMENUITEMS;
    } else if (user.role === 'schoolManager' && user.school) {
      return SCHOOLMANAGERMENUITEM;
    } else if (user.role === 'schoolManager') {
      return NOSCHOOLMENUITEM;
    } else {
      return TEACHERMENUITEM;
    }
  }
}
