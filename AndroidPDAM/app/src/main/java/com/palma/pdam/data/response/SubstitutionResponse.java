package com.palma.pdam.data.response;

import org.joda.time.LocalDate;

import java.io.Serializable;

public class SubstitutionResponse implements Serializable {
    private String id;
    private String date;
    private ScheduleResponse schedule;
    private UserResponse newTeacher;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        date = date;
    }

    public ScheduleResponse getSchedule() {
        return schedule;
    }

    public void setSchedule(ScheduleResponse schedule) {
        this.schedule = schedule;
    }

    public UserResponse getNewTeacher() {
        return newTeacher;
    }

    public void setNewTeacher(UserResponse newTeacher) {
        this.newTeacher = newTeacher;
    }
}
