package com.trading.Trading.service;

import java.util.List;

import com.trading.Trading.modal.User;
import com.trading.Trading.modal.Withdrawal;

public interface WithdrawalService {
	
	Withdrawal requestWithdrawal(Long amount, User user);
	
	Withdrawal proceedWithdrawal(String withdrawalId, boolean accept) throws Exception;
	
	List<Withdrawal> getUsersWithdrawalHistory(User user);
	
	List<Withdrawal> getAllWithdrawalRequest();

}
