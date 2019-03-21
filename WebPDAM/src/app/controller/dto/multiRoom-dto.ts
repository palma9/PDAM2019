import { Room } from '../model/room';

export class MultiRoomDto {
    roomForm: Room[];

    constructor(rooms: Room[]) {
        this.roomForm = rooms;
    }
}