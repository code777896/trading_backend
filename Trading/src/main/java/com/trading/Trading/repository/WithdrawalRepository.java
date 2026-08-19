package com.trading.Trading.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.trading.Trading.modal.Withdrawal;

public interface WithdrawalRepository extends MongoRepository<Withdrawal, String>{
	
	List<Withdrawal> findByUserId(String userId);

}
