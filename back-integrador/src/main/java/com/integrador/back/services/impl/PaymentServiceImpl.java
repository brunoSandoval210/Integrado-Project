package com.integrador.back.services.impl;

import com.integrador.back.model.dtos.PaymentIntentDTO;
import com.integrador.back.services.PaymentService;
import com.stripe.Stripe;
import com.stripe.exception.*;
import com.stripe.model.PaymentIntent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PaymentServiceImpl implements PaymentService {

    private static final Logger logger = LoggerFactory.getLogger(PaymentServiceImpl.class);

//    @Value("${stripe.key.secret}")
    private String secretKey="sk_test_51QKs8ELXEFPikSfqo3LEMvm1ImAiBRkOcbLVyjTd14qiS1wHTtyOw8JyZvEtdo0MTjvhMW30uAjEswApSB5GFm9O00HcLdI9Jh";

    @Transactional
    @Override
    public PaymentIntent paymentIntent(PaymentIntentDTO paymentIntentDTO) throws StripeException {
        try {
            Stripe.apiKey = secretKey;
            List<String> paymentMethodTypes = new ArrayList<>();
            paymentMethodTypes.add("card");
            Map<String, Object> params = new HashMap<>();
            params.put("amount", paymentIntentDTO.getAmount());
            params.put("currency", paymentIntentDTO.getCurrency());
            params.put("description", paymentIntentDTO.getDescription());
            params.put("payment_method_types", paymentMethodTypes);
            return PaymentIntent.create(params);
        } catch (StripeException e) {
            logger.error("Error creating payment intent: {}", e.getMessage(), e);
            throw e;
        }
    }

    @Transactional
    @Override
    public PaymentIntent confirm(String id) throws StripeException {
        try {
            Stripe.apiKey = secretKey;
            PaymentIntent paymentIntent = PaymentIntent.retrieve(id);
            Map<String, Object> params = new HashMap<>();
            params.put("payment_method", "pm_card_visa");
            paymentIntent.confirm(params);
            return paymentIntent;
        } catch (StripeException e) {
            logger.error("Error confirming payment intent: {}", e.getMessage(), e);
            throw e;
        }
    }

    @Transactional
    @Override
    public PaymentIntent cancel(String id) throws StripeException {
        try {
            Stripe.apiKey = secretKey;
            PaymentIntent paymentIntent = PaymentIntent.retrieve(id);
            if (!paymentIntent.getStatus().equals("succeeded")) {
                paymentIntent.cancel();
                return paymentIntent;
            } else {
                throw new InvalidRequestException("Cannot cancel a succeeded PaymentIntent", null, null, null, null, null);
            }
        } catch (StripeException e) {
            logger.error("Error canceling payment intent: {}", e.getMessage(), e);
            throw e;
        }
    }
}