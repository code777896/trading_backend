package com.trading.Trading.service;

import com.trading.Trading.domain.VerificationType;
import com.trading.Trading.modal.User;
import com.trading.Trading.modal.VerificationCode;

public interface VerificationCodeService {
	
	VerificationCode sendVerificationCode(User user, VerificationType verificationType);
	
	VerificationCode getVerificationCodeById(String id) throws Exception;
	
	VerificationCode getVerificationCodeByUser(String userId);
	
	void deleteVerificationCodeById(VerificationCode verificationCode);

}

