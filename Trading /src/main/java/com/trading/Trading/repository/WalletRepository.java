package com.trading.Trading.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.trading.Trading.modal.Wallet;

public interface WalletRepository extends MongoRepository<Wallet, String>{

    Wallet findByUserId(String userId);

}
