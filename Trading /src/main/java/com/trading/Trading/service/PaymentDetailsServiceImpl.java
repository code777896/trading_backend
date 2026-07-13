package com.trading.Trading.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trading.Trading.modal.PaymentDetails;
import com.trading.Trading.modal.User;
import com.trading.Trading.repository.PaymentDetailsRepository;

@Service
public class PaymentDetailsServiceImpl implements PaymentDetailsService{
	
	@Autowired
	private PaymentDetailsRepository paymentDetailsRepository;

	@Override
	public PaymentDetails addPaymentDetails(String accountNumber, String accountHolderName, String ifsc,
			String bankName, User user) {
		// TODO Auto-generated method stub
		PaymentDetails paymentDetails = new PaymentDetails();
		paymentDetails.setAccountNumber(accountNumber);
		paymentDetails.setAccountHolderName(accountHolderName);
		paymentDetails.setIfsc(ifsc);
		paymentDetails.setBankName(bankName);
		paymentDetails.setUser(user);
		return paymentDetailsRepository.save(paymentDetails);
	}

	@Override
	public PaymentDetails getUsersPaymentDetails(User user) {
		// TODO Auto-generated method stub
		return paymentDetailsRepository.findByUserId(user.getId());
	}

}
