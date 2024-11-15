package com.integrador.back.model.dtos;

public class PaymentIntentDTO {
    public enum Currency{
        usd, eur, pen;
    }

    private String description;
    private int amount;
    private Currency currency;


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public Currency getCurrency() {
        return currency;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }
}