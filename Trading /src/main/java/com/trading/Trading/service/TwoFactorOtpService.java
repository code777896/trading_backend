package com.trading.Trading.service;

import com.trading.Trading.modal.TwoFactorOTP;
import com.trading.Trading.modal.User;

public interface TwoFactorOtpService {
	
	TwoFactorOTP createTwoFactorOtp(User user, String otp, String jwt);
	
	TwoFactorOTP findByUser(String userId);
	
	TwoFactorOTP findByID(String id);
	
	boolean verifyTwoFactorOtp(TwoFactorOTP twoFactorOTP, String otp);
	
	void deleteTwoFactorOtp(TwoFactorOTP twoFactorOTP);

}
