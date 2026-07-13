package com.trading.Trading.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.trading.Trading.modal.Coin;

public interface CoinRepository extends MongoRepository<Coin, String> {

}
