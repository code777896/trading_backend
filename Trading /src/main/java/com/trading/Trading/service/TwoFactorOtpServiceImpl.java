package com.trading.Trading.service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trading.Trading.modal.TwoFactorOTP;
import com.trading.Trading.modal.User;
import com.trading.Trading.repository.TwoFactorOtpRepository;

@Service
public class TwoFactorOtpServiceImpl implements TwoFactorOtpService {
	
	@Autowired
	private TwoFactorOtpRepository twoFactorOtpRepository;

	@Override
	public TwoFactorOTP createTwoFactorOtp(User user, String otp, String jwt) {
		UUID uuid = UUID.randomUUID();
		
		String id = uuid.toString();
		
		TwoFactorOTP twoFactorOTP = new TwoFactorOTP();
		twoFactorOTP.setOtp(otp);
		twoFactorOTP.setJwt(jwt);
		twoFactorOTP.setId(id);
		twoFactorOTP.setUser(user);
		return twoFactorOtpRepository.save(twoFactorOTP);
	}

	@Override
	public TwoFactorOTP findByUser(String userId) {
		return twoFactorOtpRepository.findByUserId(userId);		
	}

	@Override
	@SuppressWarnings("null")
	public TwoFactorOTP findByID(String id) {
		Optional<TwoFactorOTP> opt = twoFactorOtpRepository.findById(id);
		return opt.orElse(null);
	}

	@Override
	public boolean verifyTwoFactorOtp(TwoFactorOTP twoFactorOTP, String otp) {
		return twoFactorOTP != null && java.util.Objects.equals(twoFactorOTP.getOtp(), otp);
	}

	@Override
	public void deleteTwoFactorOtp(TwoFactorOTP twoFactorOTP) {
		if (twoFactorOTP != null) {
			twoFactorOtpRepository.delete(twoFactorOTP);
		}
	}

}
