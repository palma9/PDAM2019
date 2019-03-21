import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MultiSubjectDto } from 'src/app/controller/dto/multiSubject-dto';
import { Subject } from 'src/app/controller/model/subject';
import { SubjectService } from 'src/app/controller/services/subject.service';
import { GradeService } from 'src/app/controller/services/grade.service';
import { Grade } from 'src/app/controller/model/grade';

@Component({
  selector: 'app-add-subjects',
  templateUrl: './add-subjects.component.html'
})
export class AddSubjectsComponent implements OnInit {
  subjectList: Subject;
  gradeList: Grade[];
  subjectArrayForm: FormGroup;
  subjectForm: FormArray;

  constructor(private fb: FormBuilder, public router: Router, private subjectService: SubjectService,
              private gradeService: GradeService) { }

  ngOnInit() {
    this.getData();
    this.subjectArrayForm = this.fb.group({
      subjectForm: this.fb.array([this.createSubject()])
    });
  }

  get formData() { return this.subjectArrayForm.get('subjectForm') as FormArray; }

  getData() {
    this.gradeService.getAll().subscribe(g => this.gradeList = g.rows);
  }

  createSubject(): FormGroup {
    return this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      grade: [null, Validators.compose([Validators.required])]
    });
  }

  addSubject(): void {
    this.subjectForm = this.subjectArrayForm.get('subjectForm') as FormArray;
    this.subjectForm.push(this.createSubject());
  }

  removeLastSubject(): void {
    this.subjectForm = this.subjectArrayForm.get('subjectForm') as FormArray;
    if (this.subjectForm.length > 1) {
      this.subjectForm.removeAt(-1);
    }
  }

  submit() {
    const newSubjectArray: MultiSubjectDto = this.subjectArrayForm.value as MultiSubjectDto;
    this.subjectService.createMany(newSubjectArray.subjectForm).subscribe(r => this.router.navigate(['/subjects']),
      e => console.log(e));
  }
}
