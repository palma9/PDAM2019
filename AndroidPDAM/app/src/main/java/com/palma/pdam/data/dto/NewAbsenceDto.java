package com.palma.pdam.data.dto;

import java.util.List;

public class NewAbsenceDto {
    private String date;
    private List<String> schedule;

    public NewAbsenceDto(String date, List<String> schedule) {
        this.date = date;
        this.schedule = schedule;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public List<String> getSchedule() {
        return schedule;
    }

    public void setSchedule(List<String> schedule) {
        this.schedule = schedule;
    }
}
