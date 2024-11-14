package com.integrador.back.controllers;

import com.integrador.back.model.dtos.PaymentIntentDTO;
import com.integrador.back.services.PaymentService;
import com.stripe.exception.StripeException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("payment")
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/paymentintent")
    public ResponseEntity<String> payment(@RequestBody PaymentIntentDTO paymentIntentDto) throws StripeException {
        com.stripe.model.PaymentIntent paymentIntent = paymentService.paymentIntent(paymentIntentDto);
        String paymentStr = paymentIntent.toJson();
        return new ResponseEntity<String>(paymentStr, HttpStatus.OK);
    }

    @PostMapping("/confirm/{id}")
    public ResponseEntity<String> confirm(@PathVariable("id") String id) throws StripeException {
        com.stripe.model.PaymentIntent paymentIntent = paymentService.confirm(id);
        String paymentStr = paymentIntent.toJson();
        return new ResponseEntity<String>(paymentStr, HttpStatus.OK);
    }

    @PostMapping("/cancel/{id}")
    public ResponseEntity<String> cancel(@PathVariable("id") String id) throws StripeException {
        com.stripe.model.PaymentIntent paymentIntent = paymentService.cancel(id);
        String paymentStr = paymentIntent.toJson();
        return new ResponseEntity<String>(paymentStr, HttpStatus.OK);
    }
}
