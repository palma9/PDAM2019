package com.palma.pdam.data.response;

import com.palma.pdam.data.model.Room;
import com.palma.pdam.data.model.Subject;


public class ScheduleResponse {
    private String id;
    private int timeInterval;
    private int dayOfWeek;
    private Room room;
    private Subject subject;
    private UserResponse teacher;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getTimeInterval() {
        return timeInterval;
    }

    public void setTimeInterval(int timeInterval) {
        this.timeInterval = timeInterval;
    }

    public int getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(int dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public UserResponse getTeacher() {
        return teacher;
    }

    public void setTeacher(UserResponse teacher) {
        this.teacher = teacher;
    }

    @Override
    public String toString() {
        return "(" + timeInterval + ") " + subject;
    }
}
