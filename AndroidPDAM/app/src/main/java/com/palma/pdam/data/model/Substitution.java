package com.palma.pdam.data.model;

import org.joda.time.LocalDate;

public class Substitution {
    private String id;
    private String date;
    private String schedule;

    public Substitution(String id, String date, String schedule) {
        this.id = id;
        this.date = date;
        this.schedule = schedule;
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

    public String getSchedule() {
        return schedule;
    }

    public void setSchedule(String schedule) {
        this.schedule = schedule;
    }
}
