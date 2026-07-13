package com.trading.Trading.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trading.Trading.domain.VerificationType;
import com.trading.Trading.modal.User;
import com.trading.Trading.modal.VerificationCode;
import com.trading.Trading.repository.VerificationCodeRepository;
import com.trading.Trading.utils.OtpUtils;

@Service
@SuppressWarnings("null")
public class VerificationCodeServiceImpl implements VerificationCodeService{
	
	@Autowired
	private VerificationCodeRepository verificationCodeRepository;

	@Override
	public VerificationCode sendVerificationCode(User user, VerificationType verificationType) {
		// TODO Auto-generated method stub
		VerificationCode verificationCode1 = new VerificationCode();
		verificationCode1.setOtp(OtpUtils.generateOtp());
		verificationCode1.setVerificationType(verificationType);
		verificationCode1.setUser(user);
		return verificationCodeRepository.save(verificationCode1);
	}

	@Override
	public VerificationCode getVerificationCodeById(String id) throws Exception {
		// TODO Auto-generated method stub
		Optional<VerificationCode> verificationCode = verificationCodeRepository.findById(id);
		if(verificationCode.isPresent()) {
			return verificationCode.get();
		}
		
		throw new Exception("Verification code nor found");
	}

	@Override
	public VerificationCode getVerificationCodeByUser(String userId) {
		// TODO Auto-generated method stub
		return verificationCodeRepository.findByUserId(userId);
	}

	@Override
	public void deleteVerificationCodeById(VerificationCode verificationCode) {
		// TODO Auto-generated method stub
		if (verificationCode != null) {
			verificationCodeRepository.delete(verificationCode);
		}
	}

}
