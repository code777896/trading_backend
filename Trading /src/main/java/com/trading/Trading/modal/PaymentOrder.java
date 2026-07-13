package com.trading.Trading.modal;


import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.annotation.Id;

import com.trading.Trading.domain.PaymentMethod;
import com.trading.Trading.domain.PaymentOrderStatus;

import lombok.Data;

@Data
@EntityScan
public class PaymentOrder {
	
	@Id
	private Long id;
	
	private Long amount;
	
	private PaymentOrderStatus status;
	
	private PaymentMethod paymentMethod;
	
	private User user;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getAmount() {
		return amount;
	}

	public void setAmount(Long amount) {
		this.amount = amount;
	}

	public PaymentOrderStatus getStatus() {
		return status;
	}

	public void setStatus(PaymentOrderStatus status) {
		this.status = status;
	}

	public PaymentMethod getPaymentMethod() {
		return paymentMethod;
	}

	public void setPaymentMethod(PaymentMethod paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}
