package com.integrador.back.validation;

public interface PasswordValid {
    void validUser(String email);
    void isValidPassword(String password, String validPassword,String email);
}
