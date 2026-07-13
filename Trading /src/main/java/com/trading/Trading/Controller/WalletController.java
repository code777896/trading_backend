package com.trading.Trading.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.trading.Trading.modal.Order;
import com.trading.Trading.modal.PaymentOrder;
import com.trading.Trading.modal.User;
import com.trading.Trading.modal.Wallet;
import com.trading.Trading.modal.WalletTransaction;

import com.trading.Trading.service.OrderService;
import com.trading.Trading.service.PaymentService;
import com.trading.Trading.service.UserService;
import com.trading.Trading.service.Walletservice;

@RestController
@RequestMapping("/api/wallet")
public class WalletController {
	
	@Autowired
	private Walletservice walletservice;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private PaymentService paymentService;
	
	@GetMapping()
	public ResponseEntity<Wallet> getUserWallet(@RequestHeader("Authorization") String jwt) throws Exception {
		User user = userService.findUserProfileByJwt(jwt);
		Wallet wallet = walletservice.getUserWallet(user);
		return new ResponseEntity<>(wallet, HttpStatus.ACCEPTED);
	}
	
	@PutMapping("/{walletId}/transfer")
	public ResponseEntity<Wallet> walletToWalletTransfer(
			@RequestHeader("Authorization") String jwt,
			@PathVariable String walletId,
			@RequestBody WalletTransaction req) throws Exception {
		
		User senderUser = userService.findUserProfileByJwt(jwt);
		Wallet receiverWallet = walletservice.findWalletById(walletId);
		Wallet wallet = walletservice.walletToWalletTransfer(
				senderUser,
				receiverWallet,
				req.getAmount());
		
		return new ResponseEntity<>(wallet, HttpStatus.ACCEPTED);
	}
	
	@PutMapping("/order/{orderId}/pay")
	public ResponseEntity<Wallet> payOrderPayment(
			@RequestHeader("Authorization") String jwt,
			@PathVariable String orderId
			) throws Exception {
		
		User user = userService.findUserProfileByJwt(jwt);
		
		Order order = orderService.getOrderById(orderId);
		
		Wallet wallet = walletservice.payOrderPayment(order, user);
		
		return new ResponseEntity<>(wallet, HttpStatus.ACCEPTED);
	}
	
	@PutMapping("/deposite")
	public ResponseEntity<Wallet> addBalanceToWallet(
			@RequestHeader("Authorization") String jwt,
			@RequestParam(name="order_id") Long orderId,
			@RequestParam(name="payment_id") String paymentId
			) throws Exception {
		
		User user = userService.findUserProfileByJwt(jwt);
				
		Wallet wallet = walletservice.getUserWallet(user);
		
		PaymentOrder order = paymentService.getPaymentOrderById(orderId);
		
		Boolean status = paymentService.proceedPaymentOrder(order, paymentId);
		
		if(status) {
			wallet = walletservice.addBalance(wallet, order.getAmount());
		}
		
		return new ResponseEntity<>(wallet, HttpStatus.ACCEPTED);
	}

}














