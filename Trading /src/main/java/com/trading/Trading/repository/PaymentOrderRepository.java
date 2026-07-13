package com.trading.Trading.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.trading.Trading.modal.PaymentOrder;

public interface PaymentOrderRepository extends MongoRepository<PaymentOrder, Long>{

}
