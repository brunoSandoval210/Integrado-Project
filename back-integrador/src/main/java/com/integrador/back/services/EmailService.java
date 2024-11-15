package com.integrador.back.services;

import jakarta.mail.MessagingException;
import org.springframework.scheduling.annotation.Async;

import java.util.List;

public interface EmailService {
    @Async
    void sendMail(String to, String subject, String content) throws MessagingException;

    @Async
    void sendMultipleMail(List<String> to, String subject, String content) throws MessagingException;
}
