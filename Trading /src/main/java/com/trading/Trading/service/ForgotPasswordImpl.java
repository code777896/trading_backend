package com.trading.Trading.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trading.Trading.domain.VerificationType;
import com.trading.Trading.modal.ForgotPasswordToken;
import com.trading.Trading.modal.User;
import com.trading.Trading.repository.ForgotPasswordRepository;

@Service
public class ForgotPasswordImpl implements ForgotPasswordService {
	
	@Autowired
	private ForgotPasswordRepository forgotPasswordRepository;

	@Override
	public ForgotPasswordToken createToken(User user, String id, String otp, VerificationType verificationType,
			String sendTo) {
		// TODO Auto-generated method stub
		ForgotPasswordToken token = new ForgotPasswordToken();
		token.setUser(user);
		token.setSendTo(sendTo);
		token.setVerificationType(verificationType);
		token.setOtp(otp);
		token.setId(id);
		return forgotPasswordRepository.save(token);
	}

	@Override
	@SuppressWarnings("null")
	public ForgotPasswordToken findById(String id) {
		// TODO Auto-generated method stub
		Optional<ForgotPasswordToken> token = forgotPasswordRepository.findById(id); 
		return token.orElse(null);
	}

	@Override
	public ForgotPasswordToken findByUser(String userId) {
		// TODO Auto-generated method stub
		return forgotPasswordRepository.findByUserId(userId);
	}

	@Override
	@SuppressWarnings("null")
	public void deleteToken(ForgotPasswordToken token) {
		// TODO Auto-generated method stub
		forgotPasswordRepository.delete(token);
		
	}

}
