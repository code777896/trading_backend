package com.trading.Trading.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.trading.Trading.config.JwtProvider;
import com.trading.Trading.domain.VerificationType;
import com.trading.Trading.modal.TwoFactorAuth;
import com.trading.Trading.modal.User;
import com.trading.Trading.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public User findUserProfileByJwt(String jwt) throws Exception {
		String email = JwtProvider.getEmailFromToken(jwt);
		User user = userRepository.findByEmail(email);
		
		if(user == null) {
			throw new Exception("User not found");
		}
		return user;
	}
    
	@Override
	public User findUserByEmail(String email) throws Exception {
		 User user = userRepository.findByEmail(email);
				
		 if(user == null) {
			 throw new Exception("User not found");
		 }
		 return user;
	}

	@Override
	public User findUserById(String userId) throws Exception {
		if (userId == null) {
			throw new Exception("User ID must not be null");
		}
		Optional<User> user = userRepository.findById(userId);
		
		if(user.isEmpty()) {
			throw new Exception("User not found");
		}
		return user.get();
	}

	@Override
	public User updatePassword(User user, String newPassword) {
		user.setPassword(newPassword);
		return userRepository.save(user);
	}

	@Override
	public User enableTwoFactorAuthentication(VerificationType verificationType, String sendTo, User user) {
		TwoFactorAuth twofactorAuth = new TwoFactorAuth();
		twofactorAuth.setEnabled(true);
		twofactorAuth.setSendTo(verificationType);
		user.setTwoFactorAuth(twofactorAuth);
		return userRepository.save(user);
	}

}
