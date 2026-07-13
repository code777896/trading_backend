package com.trading.Trading.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.trading.Trading.modal.VerificationCode;

public interface VerificationCodeRepository extends MongoRepository<VerificationCode, String>{
	
	public VerificationCode findByUserId(String userId);
}

