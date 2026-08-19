package com.trading.Trading.modal;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.trading.Trading.domain.USER_ROLE;

@Document(collection = "users")
public class User {
	@Id
	private String id;
	private String fullName;
	private String email;
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String password;

	private TwoFactorAuth twoFactorAuth = new TwoFactorAuth();
	private USER_ROLE role = USER_ROLE.ROLE_CUSTOMER;

	public String getId() { return id; }
	public void setId(String id) { this.id = id; }

	public String getFullName() { return fullName; }
	public void setFullName(String fullName) { this.fullName = fullName; }

	public String getEmail() { return email; }
	public void setEmail(String email) { this.email = email; }

	public String getPassword() { return password; }
	public void setPassword(String password) { this.password = password; }

	public TwoFactorAuth getTwoFactorAuth() { return twoFactorAuth; }
	public void setTwoFactorAuth(TwoFactorAuth twoFactorAuth) { this.twoFactorAuth = twoFactorAuth; }

	public USER_ROLE getRole() { return role; }
	public void setRole(USER_ROLE role) { this.role = role; }
}
