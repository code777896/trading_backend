package com.trading.Trading.service;

import com.trading.Trading.domain.VerificationType;
import com.trading.Trading.modal.User;

public interface UserService {
	public User findUserProfileByJwt(String jwt) throws Exception;
	
	public User findUserByEmail(String email) throws Exception;
	
	public User findUserById(String userId) throws Exception;
	
	public User enableTwoFactorAuthentication(VerificationType verificationType,String sendTo, User user);
	
	User updatePassword(User user, String newPassword);
	
	
}
