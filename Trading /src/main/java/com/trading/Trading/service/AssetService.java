package com.trading.Trading.service;

import java.util.List;

import com.trading.Trading.modal.Asset;
import com.trading.Trading.modal.Coin;
import com.trading.Trading.modal.User;

public interface AssetService {
	
	Asset createAsset(User user, Coin coin, double quantity);
	
	Asset getAssetById(String assetId) throws Exception;
	
	Asset getAssetByUserIdAndId(String userId, String assetId);
	
	List<Asset> getUsersAssets(String userId);
	
	Asset updateAsset(String assetId, double quantity) throws Exception;
	
	Asset findAssetByUserIdAndCoinId(String userID, String coinId);
	
	void deleteAsset(String assetId);

}
