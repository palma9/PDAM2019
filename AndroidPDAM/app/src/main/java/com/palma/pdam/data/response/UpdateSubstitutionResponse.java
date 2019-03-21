package com.palma.pdam.data.response;

public class UpdateSubstitutionResponse {
    private String id;
    private String date;
    private ScheduleResponse schedule;
    private String newTeacher;

    public UpdateSubstitutionResponse(String id, String date, ScheduleResponse schedule, String newTeacher) {
        this.id = id;
        this.date = date;
        this.schedule = schedule;
        this.newTeacher = newTeacher;
    }

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
        this.date = date;
    }

    public ScheduleResponse getSchedule() {
        return schedule;
    }

    public void setSchedule(ScheduleResponse schedule) {
        this.schedule = schedule;
    }

    public String getNewTeacher() {
        return newTeacher;
    }

    public void setNewTeacher(String newTeacher) {
        this.newTeacher = newTeacher;
    }
}
