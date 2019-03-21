package com.palma.pdam.data.dto;

public class EditPasswordDto {
    private String password;

    public EditPasswordDto(String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
