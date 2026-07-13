package com.trading.Trading.service;

import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;
import com.trading.Trading.domain.PaymentMethod;
import com.trading.Trading.modal.PaymentOrder;
import com.trading.Trading.modal.User;
import com.trading.Trading.responce.PaymentResponce;

public interface PaymentService {
	
	PaymentOrder createOrder(User user, Long amount, PaymentMethod paymentMethod);
	
	PaymentOrder getPaymentOrderById(Long id) throws Exception;
	
	Boolean proceedPaymentOrder(PaymentOrder paymentOrder, String paymentId) throws RazorpayException;
	
	PaymentResponce createRazorpayPaymentLink(User user, Long amount) throws RazorpayException;
	
	PaymentResponce createStripePaymentLink(User user, Long amount, Long orderId) throws StripeException;

}
