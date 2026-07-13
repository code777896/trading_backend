package com.trading.Trading.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.trading.Trading.modal.ForgotPasswordToken;

public interface ForgotPasswordRepository extends MongoRepository<ForgotPasswordToken, String> {

    ForgotPasswordToken findByUserId(String userId);

}
