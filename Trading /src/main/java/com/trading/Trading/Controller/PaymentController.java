package com.trading.Trading.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trading.Trading.domain.PaymentMethod;
import com.trading.Trading.modal.PaymentOrder;
import com.trading.Trading.modal.User;
import com.trading.Trading.responce.PaymentResponce;
import com.trading.Trading.service.PaymentService;
import com.trading.Trading.service.UserService;

@RestController
@RequestMapping("/api")
public class PaymentController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private PaymentService paymentService;
	
	@PostMapping("/api/payment/{paymentMethod}/amount/{amount}")
	public ResponseEntity<PaymentResponce> paymentHandler(
			@PathVariable PaymentMethod paymentMethod,
			@PathVariable Long amount,
			@RequestHeader("Authorization") String jwt) throws Exception{
		User user = userService.findUserProfileByJwt(jwt);
		PaymentResponce paymentResponce;
		
		PaymentOrder payment = paymentService.createOrder(user, amount, paymentMethod);
		
		if(paymentMethod.equals(PaymentMethod.RAZORPAY)) {
			paymentResponce = paymentService.createRazorpayPaymentLink(user, amount);
		}
		else {
			paymentResponce = paymentService.createStripePaymentLink(user, amount, payment.getId());
		}
		return new ResponseEntity<>(paymentResponce, HttpStatus.CREATED);
	}

}















