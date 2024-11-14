package com.integrador.back.services;

import com.integrador.back.model.dtos.PaymentIntentDTO;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface PaymentService {
    public PaymentIntent paymentIntent(PaymentIntentDTO paymentIntentDTO) throws StripeException;

    public PaymentIntent confirm(String id) throws StripeException;

    public PaymentIntent cancel(String id) throws StripeException;


    }
