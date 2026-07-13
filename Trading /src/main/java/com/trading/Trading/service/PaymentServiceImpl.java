package com.trading.Trading.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.trading.Trading.domain.PaymentMethod;
import com.trading.Trading.domain.PaymentOrderStatus;
import com.trading.Trading.modal.PaymentOrder;
import com.trading.Trading.modal.User;
import com.trading.Trading.repository.PaymentOrderRepository;
import com.trading.Trading.responce.PaymentResponce;

@Service
@SuppressWarnings("null")
public class PaymentServiceImpl implements PaymentService {

	@Autowired
	private PaymentOrderRepository paymentOrderRepository;

	@Value("${stripe.api.key}")
	private String stripeSecretKey;

	@Value("${razorpay.api.key}")
	private String apiKey;

	@Value("${razorpay.api.secret}")
	private String apiSecretKey;

	@Override
	public PaymentOrder createOrder(User user, Long amount, PaymentMethod paymentMethod) {
		// TODO Auto-generated method stub
		PaymentOrder paymentOrder = new PaymentOrder();
		paymentOrder.setUser(user);
		paymentOrder.setAmount(amount);
		paymentOrder.setPaymentMethod(paymentMethod);
		return paymentOrderRepository.save(paymentOrder);
	}

	@Override
	public PaymentOrder getPaymentOrderById(Long id) throws Exception {
		// TODO Auto-generated method stub
		return paymentOrderRepository.findById(id).orElseThrow(
				() -> new Exception("Payment order not found"));
	}

	@Override
	public Boolean proceedPaymentOrder(PaymentOrder paymentOrder, String paymentId) throws RazorpayException {
		// TODO Auto-generated method stub
		if (paymentOrder.getStatus().equals(PaymentOrderStatus.PENDING)) {
			if (paymentOrder.getPaymentMethod().equals(PaymentMethod.RAZORPAY)) {
				RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecretKey);
				Payment payment = razorpay.payments.fetch(paymentId);

				@SuppressWarnings("unused")
				Integer amount = payment.get("amount");
				String status = payment.get("status");

				if (status.equals("captured")) {
					paymentOrder.setStatus(PaymentOrderStatus.SUCCESS);
					return true;
				}
				paymentOrder.setStatus(PaymentOrderStatus.FAILED);
				paymentOrderRepository.save(paymentOrder);
				return false;
			}
			paymentOrder.setStatus(PaymentOrderStatus.SUCCESS);
			paymentOrderRepository.save(paymentOrder);
			return true;
		}
		return false;
	}

	@Override
	public PaymentResponce createRazorpayPaymentLink(User user, Long amount) throws RazorpayException {

		Long amountInPaise = amount * 100;

		try {
			RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecretKey);

			JSONObject paymentLinkRequest = new JSONObject();
			paymentLinkRequest.put("amount", amountInPaise);
			paymentLinkRequest.put("currency", "INR");

			JSONObject customer = new JSONObject();
			customer.put("name", user.getFullName());
			customer.put("email", user.getEmail());
			paymentLinkRequest.put("customer", customer);

			JSONObject notify = new JSONObject();
			notify.put("email", true);
			paymentLinkRequest.put("notify", notify);

			paymentLinkRequest.put("reminder_enabled", true);

			paymentLinkRequest.put("callback_url", "https://localhost:1001/wallet");
			paymentLinkRequest.put("callback_method", "get");

			PaymentLink payment = razorpay.paymentLink.create(paymentLinkRequest);

			@SuppressWarnings("unused")
			String paymentLinkId = payment.get("id");
			String paymentLinkUrl = payment.get("short_url");

			PaymentResponce res = new PaymentResponce();
			res.setPayment_url(paymentLinkUrl);

			return res;
		} catch (RazorpayException e) {
			System.out.println("Error creating payment link: " + e.getMessage());
			throw new RazorpayException(e.getMessage());
		}

	}

	@Override
	public PaymentResponce createStripePaymentLink(User user, Long amount, Long orderId) throws StripeException {

		Stripe.apiKey = stripeSecretKey;

		SessionCreateParams params = SessionCreateParams.builder()
				.addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
				.setMode(SessionCreateParams.Mode.PAYMENT)
				.setSuccessUrl("https://localhost:1001/wallet?order_id=" + orderId)
				.setCancelUrl("https://localhost:1001/payment/cancel")
				.addLineItem(SessionCreateParams.LineItem.builder()
						.setQuantity(1L)
						.setPriceData(
								SessionCreateParams.LineItem.PriceData.builder()
										.setCurrency("usd")
										.setUnitAmount(amount * 100)
										.setProductData(
												SessionCreateParams.LineItem.PriceData.ProductData
														.builder().setName("Top up wallet").build())
										.build())
						.build())
				.build();
		Session session = Session.create(params);
		System.out.println("session____" + session);

		PaymentResponce res = new PaymentResponce();
		res.setPayment_url(session.getUrl());
		return res;
	}

}
