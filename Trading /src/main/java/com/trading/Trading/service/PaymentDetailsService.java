package com.trading.Trading.service;

import com.trading.Trading.modal.PaymentDetails;
import com.trading.Trading.modal.User;

public interface PaymentDetailsService {
	
	public PaymentDetails addPaymentDetails(String accountNumber,
			String accountHolderName,
			String ifsc,
			String bankName,
			User user);
	
	public PaymentDetails getUsersPaymentDetails(User user);

}
