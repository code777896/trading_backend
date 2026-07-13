package com.trading.Trading.modal;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonProperty;

@Document(collection = "two_factor_otps")
public class TwoFactorOTP {

	@Id
	private String id;

	private String otp;

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private User user;

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String jwt;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getOtp() {
		return otp;
	}

	public void setOtp(String otp) {
		this.otp = otp;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getJwt() {
		return jwt;
	}

	public void setJwt(String jwt) {
		this.jwt = jwt;
	}

}

