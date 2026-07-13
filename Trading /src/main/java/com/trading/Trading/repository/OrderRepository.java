package com.trading.Trading.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.trading.Trading.modal.Order;

public interface OrderRepository extends MongoRepository<Order, String>{
	
	List<Order> findByUserId(String userId);

}
