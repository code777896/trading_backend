package com.trading.Trading.service;

import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.trading.Trading.modal.Coin;

public interface CoinService {
	
	List<Coin> getCoinList(int page) throws JsonMappingException, JsonProcessingException, Exception;
	
	String getMarketChart(String coinId, int days) throws Exception;
	
	String getCoinDetails(String coinId) throws Exception;
	
	Coin findByid(String coinId) throws Exception;
	
	String searchCoin(String keyword) throws Exception;
	
	String getTop50CoinByMarketCapRank() throws Exception;
	
	String getTradingCoin() throws Exception;
}
