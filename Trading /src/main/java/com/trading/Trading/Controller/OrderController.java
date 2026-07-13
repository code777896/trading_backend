package com.trading.Trading.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.trading.Trading.domain.OrderType;
import com.trading.Trading.modal.Coin;
import com.trading.Trading.modal.Order;
import com.trading.Trading.modal.User;
import com.trading.Trading.service.CoinService;
import com.trading.Trading.service.OrderService;
import com.trading.Trading.service.UserService;

import request.CreateOrderRequest;


@RestController
@RequestMapping("/api/orders")
public class OrderController {
	
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private CoinService coinService;
	
	@PostMapping("/pay")
	public ResponseEntity<Order> payOrderPayment(
			@RequestHeader("Authorization") String jwt,
			@RequestBody CreateOrderRequest req) throws Exception {
		User user = userService.findUserProfileByJwt(jwt);
		Coin coin = coinService.findByid(req.getCoinId());
		Order order = orderService.processOrder(coin, req.getQuantity(), req.getOrderType(), user);
		
		return ResponseEntity.ok(order);
	}
	
	@GetMapping("/{orderId}")
	public ResponseEntity<Order> getOrderById(
			@RequestHeader("Authorization") String jwtToken,
			@PathVariable String orderId) throws Exception {
		if (jwtToken == null) {
			throw new Exception("token missing...");
		}
		User user = userService.findUserProfileByJwt(jwtToken);
		Order order = orderService.getOrderById(orderId);
		if (order.getUser().getId().equals(user.getId())) {
			return ResponseEntity.ok(order);
		} else {
			throw new Exception("You don't have access");
		}
	}
	
	@GetMapping()
	public ResponseEntity<List<Order>> getAllOrdersForUser(
			@RequestHeader("Authorization") String jwt,
			@RequestParam(required = false) OrderType order_type,
			@RequestParam(required = false) String asset_symbol) throws Exception {
		
		String userId = userService.findUserProfileByJwt(jwt).getId();
		List<Order> userOrders = orderService.getAllOrdersOfUser(userId, order_type, asset_symbol);
		return ResponseEntity.ok(userOrders);
	}
	
}
