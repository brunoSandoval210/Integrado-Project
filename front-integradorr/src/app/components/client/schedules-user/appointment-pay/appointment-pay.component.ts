import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { PayService } from '../../../../services/pay.service';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import Swal from 'sweetalert2';
import { AppointmentService } from '../../../../services/appointment.service';
import { AuthService } from '../../../../services/auth.service';
import { SharingDataService } from '../../../../services/sharing-data.service';

@Component({
  selector: 'app-appointment-pay',
  standalone: true,
  imports: [
    StripeCardComponent,
    ReactiveFormsModule
  ],
  templateUrl: './appointment-pay.component.html',
  styleUrls: ['./appointment-pay.component.scss']
})
export class AppointmentPayComponent {
  
  @Input() schedule: any = null;
  paymentForm: FormGroup;
  isLoading: boolean = false;

  @ViewChild(StripeCardComponent) card!: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '400',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '16px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };
  elementsOptions: StripeElementsOptions = {
    locale: 'es'
  };

  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    private payService: PayService,
    private authService: AuthService,
    private appointmentService: AppointmentService,
    private sharingDataService: SharingDataService
    ) {
    this.paymentForm = this.fb.group({
      amount: 4000,
      currency: 'pen',
      description: 'Cita medica'
    });
  }

  onSubmit(): void {
    if (this.paymentForm.invalid) {
      Swal.fire('Error', 'Por favor complete todos los campos correctamente.', 'warning');
      return;
    }

    this.isLoading = true;

    this.stripeService
      .createPaymentMethod({
        type: 'card',
        card: this.card.element,
        billing_details: {
          name: this.paymentForm.get('name')?.value || 'Nombre del cliente'
        }
      })
      .subscribe((result) => {
        if (result.error) {
          this.isLoading = false;
          console.error(result.error.message);
          Swal.fire('Error', `La tarjeta no es válida: ${result.error.message}`, 'error');
        } else {
          this.createPaymentIntent();
        }
      });
  }

  createPaymentIntent(): void {
    const { amount, currency, description } = this.paymentForm.value;

    this.payService.createPaymentIntent(amount, currency, description).subscribe({
      next: (response) => {
        if (response.client_secret) {
          Swal.fire({
            title: 'Confirmar Pago',
            text: 'El dinero no sera reembolsado en caso cancele la cita ¿Desea confimar el pago?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              this.handleStripe(response.client_secret);
            } else {
              this.cancelPayment(response.id);
              this.isLoading = false;
            }
          });
        } else {
          Swal.fire('Error', 'No se pudo procesar el intento de pago.', 'error');
        }
      },
      error: (err) => {
        console.error('Error creating payment intent:', err);
        Swal.fire('Error', 'No se pudo crear el intento de pago.', 'error');
        this.isLoading = false;
      }
    });
  }

  handleStripe(clientSecret: string): void {
    this.stripeService.confirmCardPayment(clientSecret, {
      payment_method: {
        card: this.card.element,
        billing_details: {
          name: this.paymentForm.get('name')?.value
        }
      }
    }).subscribe((result) => {
      this.isLoading = false;
      if (result.error) {
        console.error(result.error.message);
        Swal.fire('Error', result.error.message, 'error');
      } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
        this.createAppointment();
        Swal.fire('Pago exitoso', 'El pago ha sido procesado correctamente.', 'success');
      } else {
        Swal.fire('Error', 'No se pudo procesar el pago.', 'error');
      }
    });
  }

  cancelPayment(paymentIntentId: string): void {
    if (!paymentIntentId) {
      Swal.fire('Error', 'No hay un intento de pago para cancelar.', 'error');
      return;
    }

    this.isLoading = true;
    this.payService.cancelPaymentIntent(paymentIntentId).subscribe({
      next: (response) => {
        this.sharingDataService.onOpenCloseModal.emit(false);
          Swal.fire('Pago cancelado', 'El intento de pago ha sido cancelado.', 'success');
      },
      error: (err) => {
        console.error('Error canceling payment intent:', err);
        Swal.fire('Error', 'No se pudo cancelar el intento de pago.', 'error');
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  createAppointment(): void {
    const appointment = {
      statusAppointment: 'CONFIRMADA_PAGADA',
      userId: this.authService.getUserId(),
      scheduleId: this.schedule.id
    };
    this.appointmentService.createAppointment(appointment).subscribe(
      response => {
        this.sharingDataService.onScheduleCreated.emit();
      }
    );
  }

  onCanceled(): void {
    this.sharingDataService.onOpenCloseModal.emit(false);
  }
}
