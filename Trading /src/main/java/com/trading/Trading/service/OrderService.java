package com.trading.Trading.service;

import java.util.List;

import com.trading.Trading.domain.OrderType;
import com.trading.Trading.modal.Coin;
import com.trading.Trading.modal.Order;
import com.trading.Trading.modal.OrderItem;
import com.trading.Trading.modal.User;

public interface OrderService {
	
	Order createOrder(User user, OrderItem orderItem, OrderType orderType);
	
	Order getOrderById(String orderId) throws Exception;
	
	List<Order> getAllOrdersOfUser(String userId, OrderType orderType, String assetSymbol);
	
	Order processOrder(Coin coin, double quantity, OrderType orderType, User user) throws Exception;

}
