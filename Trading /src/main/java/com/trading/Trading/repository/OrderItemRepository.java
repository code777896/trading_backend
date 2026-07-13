package com.trading.Trading.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.trading.Trading.modal.OrderItem;

public interface OrderItemRepository extends MongoRepository<OrderItem, String> {
	
	

}
