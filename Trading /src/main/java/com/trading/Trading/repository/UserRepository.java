package com.trading.Trading.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.trading.Trading.modal.User;

public interface UserRepository extends MongoRepository<User, String> {
	
	User findByEmail(String email);
	

}
