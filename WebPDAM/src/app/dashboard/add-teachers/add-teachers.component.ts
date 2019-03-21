import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MultiTeacherDto } from 'src/app/controller/dto/multiTeacher-dto';
import { Teacher } from 'src/app/controller/model/teacher';
import { TeacherService } from 'src/app/controller/services/teacher.service';

@Component({
  selector: 'app-add-teachers',
  templateUrl: './add-teachers.component.html'
})
export class AddTeachersComponent implements OnInit {
  teacherList: Teacher;
  teacherArrayForm: FormGroup;
  teacherForm: FormArray;

  constructor(private fb: FormBuilder, public router: Router, private teacherService: TeacherService) { }

  ngOnInit() {
    this.teacherArrayForm = this.fb.group({
      teacherForm: this.fb.array([this.createTeacher()])
    });
  }

  get formData() { return this.teacherArrayForm.get('teacherForm') as FormArray; }

  createTeacher(): FormGroup {
    return this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required])],
      number: [null, Validators.compose([Validators.required])],
    });
  }

  addTeacher(): void {
    this.teacherForm = this.teacherArrayForm.get('teacherForm') as FormArray;
    this.teacherForm.push(this.createTeacher());
  }

  removeLastTeacher(): void {
    this.teacherForm = this.teacherArrayForm.get('teacherForm') as FormArray;
    if (this.teacherForm.length > 1) {
      this.teacherForm.removeAt(-1);
    }
  }

  submit() {
    const newTeacherArray: MultiTeacherDto = this.teacherArrayForm.value as MultiTeacherDto;
    this.teacherService.createMany(newTeacherArray.teacherForm).subscribe(r => this.router.navigate(['/teachers']),
      e => console.log(e));
  }
}
