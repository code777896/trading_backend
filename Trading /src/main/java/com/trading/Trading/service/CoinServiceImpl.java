package com.trading.Trading.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.trading.Trading.modal.Coin;
import com.trading.Trading.repository.CoinRepository;

@Service
@SuppressWarnings("null")
public class CoinServiceImpl implements CoinService{
	
	@Autowired
	private CoinRepository coinRepository;
	
	@Autowired
	private ObjectMapper objectMapper;

	@Override
	public List<Coin> getCoinList(int page) throws Exception {
		String url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10&page="+page;
		
		RestTemplate restTemplate = new RestTemplate();
		
		try {
			HttpHeaders headers = new HttpHeaders();
			
			HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
			
			ResponseEntity<String> response = restTemplate.exchange(url, 
					HttpMethod.GET,entity, String.class);
			
			List<Coin> coinList = objectMapper.readValue(response.getBody(),
					new TypeReference<List<Coin>>(){});
			
			return coinList;
			
		}catch(HttpClientErrorException | HttpServerErrorException e) {
			throw new Exception(e.getMessage());
		}catch(ResourceAccessException e) {
			throw new Exception("Unable to connect to CoinGecko API. Please check your internet connection: " + e.getMessage());
		}
	}

	@Override
	public String getMarketChart(String coinId, int days) throws Exception {
		
		String url = "https://api.coingecko.com/api/v3/coins/"+coinId+"/market_chart?vs_currency=usd&days="+days;
		
		RestTemplate restTemplate = new RestTemplate();
		
		try {
			HttpHeaders headers = new HttpHeaders();
			
			HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
			
			ResponseEntity<String> response = restTemplate.exchange(url,
					HttpMethod.GET,entity, String.class);
			return response.getBody();
			
		}catch(HttpClientErrorException | HttpServerErrorException e) {
			throw new Exception(e.getMessage());
		}catch(ResourceAccessException e) {
			throw new Exception("Unable to connect to CoinGecko API. Please check your internet connection: " + e.getMessage());
		}
	}

	@Override
	public String getCoinDetails(String coinId) throws Exception {
		String url = "https://api.coingecko.com/api/v3/coins/"+coinId;
		
		RestTemplate restTemplate = new RestTemplate();
		
		try {
			HttpHeaders headers = new HttpHeaders();
			
			HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
			
			ResponseEntity<String> response = restTemplate.exchange(url,
					HttpMethod.GET,entity, String.class);
			
			JsonNode jsonNode = objectMapper.readTree(response.getBody());
			
			Coin coin = new Coin();
			
			coin.setId(jsonNode.get("id").asText());
			
			coin.setName(jsonNode.get("name").asText());
			
			coin.setSymbol(jsonNode.get("symbol").asText());
			
			coin.setImage(jsonNode.get("image").get("large").asText());
			
			JsonNode marketData = jsonNode.get("market_data");
			
			coin.setCurrentPrice(getNestedDouble(marketData, "current_price", "usd"));
			coin.setMarketCap(getNestedLong(marketData, "market_cap", "usd"));
			coin.setMarketCapRank(marketData.has("market_cap_rank") && !marketData.get("market_cap_rank").isNull() ? marketData.get("market_cap_rank").asInt() : 0);
			coin.setTotalVolume(getNestedLong(marketData, "total_volume", "usd"));
			coin.setHigh24h(getNestedDouble(marketData, "high_24h", "usd"));
			coin.setLow24h(getNestedDouble(marketData, "low_24h", "usd"));
			coin.setPriceChange24h(marketData.has("price_change_24h") && !marketData.get("price_change_24h").isNull() ? marketData.get("price_change_24h").asDouble() : 0);
			coin.setPriceChangePercentage24h(marketData.has("price_change_percentage_24h") && !marketData.get("price_change_percentage_24h").isNull() ? marketData.get("price_change_percentage_24h").asDouble() : 0);
			coin.setMarketCapChange24h(marketData.has("market_cap_change_24h") && !marketData.get("market_cap_change_24h").isNull() ? marketData.get("market_cap_change_24h").asLong() : 0);
			coin.setMarketCapChangePercentage24h(marketData.has("market_cap_change_percentage_24h") && !marketData.get("market_cap_change_percentage_24h").isNull() ? marketData.get("market_cap_change_percentage_24h").asLong() : 0);
			coin.setTotalSupply(marketData.has("total_supply") && !marketData.get("total_supply").isNull() ? marketData.get("total_supply").asLong() : 0);
			
			coinRepository.save(coin);
			
			return response.getBody();
			
		}catch(HttpClientErrorException | HttpServerErrorException e) {
			throw new Exception(e.getMessage());
		}catch(ResourceAccessException e) {
			throw new Exception("Unable to connect to CoinGecko API. Please check your internet connection: " + e.getMessage());
		}
	
	}

	@Override
	public Coin findByid(String coinId) throws Exception {
		Optional<Coin> optionalCoin = coinRepository.findById(coinId);
		
		if(optionalCoin.isEmpty())throw new Exception("Coin not found");
		
		return optionalCoin.get();
	}

	@Override
	public String searchCoin(String keyword) throws Exception {
		String url = "https://api.coingecko.com/api/v3/search?query="+keyword;
		
		RestTemplate restTemplate = new RestTemplate();
		
		try {
			HttpHeaders headers = new HttpHeaders();
			
			HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
			
			ResponseEntity<String> response = restTemplate.exchange(url,
					HttpMethod.GET,entity, String.class);
			return response.getBody();
			
		}catch(HttpClientErrorException | HttpServerErrorException e) {
			throw new Exception(e.getMessage());
		}catch(ResourceAccessException e) {
			throw new Exception("Unable to connect to CoinGecko API. Please check your internet connection: " + e.getMessage());
		}
	}

	@Override
	public String getTop50CoinByMarketCapRank() throws Exception {
		String url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=50&page=1";
		
		RestTemplate restTemplate = new RestTemplate();
		
		try {
			HttpHeaders headers = new HttpHeaders();
			
			HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
			
			ResponseEntity<String> response = restTemplate.exchange(url,
					HttpMethod.GET,entity, String.class);
			return response.getBody();
			
		}catch(HttpClientErrorException | HttpServerErrorException e) {
			throw new Exception(e.getMessage());
		}catch(ResourceAccessException e) {
			throw new Exception("Unable to connect to CoinGecko API. Please check your internet connection: " + e.getMessage());
		}
	}

	@Override
	public String getTradingCoin() throws Exception {
		String url = "https://api.coingecko.com/api/v3/search/trending";
		
		RestTemplate restTemplate = new RestTemplate();
		
		try {
			HttpHeaders headers = new HttpHeaders();
			
			HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
			
			ResponseEntity<String> response = restTemplate.exchange(url,
					HttpMethod.GET,entity, String.class);
			return response.getBody();
			
		}catch(HttpClientErrorException | HttpServerErrorException e) {
			throw new Exception(e.getMessage());
		}catch(ResourceAccessException e) {
			throw new Exception("Unable to connect to CoinGecko API. Please check your internet connection: " + e.getMessage());
		}
	}

	private double getNestedDouble(JsonNode parent, String field, String currency) {
		JsonNode node = parent.get(field);
		if (node == null || node.isNull()) return 0;
		JsonNode currencyNode = node.get(currency);
		if (currencyNode == null || currencyNode.isNull()) return 0;
		return currencyNode.asDouble();
	}

	private long getNestedLong(JsonNode parent, String field, String currency) {
		JsonNode node = parent.get(field);
		if (node == null || node.isNull()) return 0;
		JsonNode currencyNode = node.get(currency);
		if (currencyNode == null || currencyNode.isNull()) return 0;
		return currencyNode.asLong();
	}

}

