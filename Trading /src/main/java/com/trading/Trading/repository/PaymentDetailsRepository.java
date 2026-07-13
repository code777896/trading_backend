package com.trading.Trading.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.trading.Trading.modal.PaymentDetails;

public interface PaymentDetailsRepository extends MongoRepository<PaymentDetails, Long>{
	
	PaymentDetails findByUserId(String userId);

}
