import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/controller/model/room';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomService } from 'src/app/controller/services/room.service';
import { MultiRoomDto } from 'src/app/controller/dto/multiRoom-dto';

@Component({
  selector: 'app-add-rooms',
  templateUrl: './add-rooms.component.html'
})
export class AddRoomsComponent implements OnInit {
  roomList: Room;
  roomArrayForm: FormGroup;
  roomForm: FormArray;

  constructor(private fb: FormBuilder, public router: Router, private roomService: RoomService) { }

  ngOnInit() {
    this.roomArrayForm = this.fb.group({
      roomForm: this.fb.array([this.createRoom()])
    });
  }

  get formData() { return this.roomArrayForm.get('roomForm') as FormArray; }

  createRoom(): FormGroup {
    return this.fb.group({
      classNumber: [null, Validators.compose([Validators.required])]
    });
  }

  addRoom(): void {
    this.roomForm = this.roomArrayForm.get('roomForm') as FormArray;
    this.roomForm.push(this.createRoom());
  }

  removeLastRoom(): void {
    this.roomForm = this.roomArrayForm.get('roomForm') as FormArray;
    if (this.roomForm.length > 1) {
      this.roomForm.removeAt(-1);
    }
  }

  submit() {
    const newRoomArray: MultiRoomDto = this.roomArrayForm.value as MultiRoomDto;
    this.roomService.createMany(newRoomArray.roomForm).subscribe(r => this.router.navigate(['/rooms']),
      e => console.log(e));
  }
}
