package com.palma.pdam.data.response;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class UserResponse implements Serializable {
    private String id;
    private String email;
    private String name;
    private String role;
    private int number;
    private int substitutionsDone;
    private List<Date> substituted;
    private String picture;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public int getSubstitutionsDone() {
        return substitutionsDone;
    }

    public void setSubstitutionsDone(int substitutionsDone) {
        this.substitutionsDone = substitutionsDone;
    }

    public List<Date> getSubstituted() {
        return substituted;
    }

    public void setSubstituted(List<Date> substituted) {
        this.substituted = substituted;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    @Override
    public String toString() {
        return name;
    }
}
