package com.trading.Trading.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.trading.Trading.modal.TwoFactorOTP;

public interface TwoFactorOtpRepository extends MongoRepository<TwoFactorOTP, String> {

	TwoFactorOTP findByUserId(String userId);

}
