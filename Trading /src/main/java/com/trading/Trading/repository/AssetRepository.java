package com.trading.Trading.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.trading.Trading.modal.Asset;

public interface AssetRepository extends MongoRepository<Asset, String>{
	
	List<Asset> findByUserId(String userId);
	
	Asset findByUserIdAndCoinId(String userId, String coinId);

}
