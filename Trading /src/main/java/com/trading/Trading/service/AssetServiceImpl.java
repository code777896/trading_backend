package com.trading.Trading.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trading.Trading.modal.Asset;
import com.trading.Trading.modal.Coin;
import com.trading.Trading.modal.User;
import com.trading.Trading.repository.AssetRepository;

@Service
@SuppressWarnings("null")
public class AssetServiceImpl implements AssetService{
	
	@Autowired
	private AssetRepository assetRepository;

	@Override
	public Asset createAsset(User user, Coin coin, double quantity) {
		// TODO Auto-generated method stub
		Asset asset = new Asset();
		asset.setUser(user);
		asset.setCoin(coin);
		asset.setQuantity(quantity);
		asset.setBuyPrice(coin.getCurrentPrice());
		return assetRepository.save(asset);
	}

	@Override
	public Asset getAssetById(String assetId) throws Exception {
		// TODO Auto-generated method stub
		return assetRepository.findById(assetId).orElseThrow(() -> new Exception("asset not found..."));
	}

	@Override
	public Asset getAssetByUserIdAndId(String userId, String assetId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Asset> getUsersAssets(String userId) {
		// TODO Auto-generated method stub
		return assetRepository.findByUserId(userId);
	}

	@Override
	public Asset updateAsset(String assetId, double quantity) throws Exception {
		// TODO Auto-generated method stub
		Asset oldAsset = getAssetById(assetId);
		oldAsset.setQuantity(quantity + oldAsset.getQuantity());
		return assetRepository.save(oldAsset);
	}

	@Override
	public Asset findAssetByUserIdAndCoinId(String userId, String coinId) {
		// TODO Auto-generated method stub
		return assetRepository.findByUserIdAndCoinId(userId, coinId);
	}

	@Override
	public void deleteAsset(String assetId) {
		// TODO Auto-generated method stub
		assetRepository.deleteById(assetId);
	}

}
