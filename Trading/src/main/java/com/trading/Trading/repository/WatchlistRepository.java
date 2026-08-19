package com.trading.Trading.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.trading.Trading.modal.Watchlist;

public interface WatchlistRepository extends MongoRepository<Watchlist, String>{
	
	Watchlist findByUserId(String userId);

}
