package com.integrador.back.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import java.security.SecureRandom;

@Configuration
public class RandomCodeGenerator {

    @Value("${random.code.characters}")
    private String characters;

    private static final SecureRandom random = new SecureRandom();

    public String generateRandomCode(int length) {
        StringBuilder code = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            int index = random.nextInt(characters.length());
            code.append(characters.charAt(index));
        }
        return code.toString();
    }
}