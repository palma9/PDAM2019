import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MultiGradeDto } from 'src/app/controller/dto/multiGrade-dto';
import { Grade } from 'src/app/controller/model/grade';
import { GradeService } from 'src/app/controller/services/grade.service';

@Component({
  selector: 'app-add-grades',
  templateUrl: './add-grades.component.html'
})
export class AddGradesComponent implements OnInit {
  gradeList: Grade;
  gradeArrayForm: FormGroup;
  gradeForm: FormArray;

  constructor(private fb: FormBuilder, public router: Router, private gradeService: GradeService) { }

  ngOnInit() {
    this.gradeArrayForm = this.fb.group({
      gradeForm: this.fb.array([this.createGrade()])
    });
  }

  get formData() { return this.gradeArrayForm.get('gradeForm') as FormArray; }

  createGrade(): FormGroup {
    return this.fb.group({
      name: [null, Validators.compose([Validators.required])]
    });
  }

  addGrade(): void {
    this.gradeForm = this.gradeArrayForm.get('gradeForm') as FormArray;
    this.gradeForm.push(this.createGrade());
  }

  removeLastGrade(): void {
    this.gradeForm = this.gradeArrayForm.get('gradeForm') as FormArray;
    if (this.gradeForm.length > 1) {
      this.gradeForm.removeAt(-1);
    }
  }

  submit() {
    const newGradeArray: MultiGradeDto = this.gradeArrayForm.value as MultiGradeDto;
    this.gradeService.createMany(newGradeArray.gradeForm).subscribe(r => this.router.navigate(['/grades']),
      e => console.log(e));
  }
}
