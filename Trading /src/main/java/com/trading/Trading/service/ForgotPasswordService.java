package com.trading.Trading.service;

import com.trading.Trading.domain.VerificationType;
import com.trading.Trading.modal.ForgotPasswordToken;
import com.trading.Trading.modal.User;

public interface ForgotPasswordService {
	
	ForgotPasswordToken createToken(User user, String id, String otp, VerificationType verificationType, String sendTo);
	
	ForgotPasswordToken findById(String id);
	
	ForgotPasswordToken findByUser(String userId);
	
	void deleteToken(ForgotPasswordToken token);

}
