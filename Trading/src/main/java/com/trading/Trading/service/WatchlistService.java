package com.trading.Trading.service;

import com.trading.Trading.modal.Coin;
import com.trading.Trading.modal.User;
import com.trading.Trading.modal.Watchlist;

public interface WatchlistService {
	
	Watchlist findUserWatchlist(String userId) throws Exception;
	
	Watchlist createWatchlist(User user);
	
	Watchlist findById(String id) throws Exception;
	
	Coin addItemToWatchlist(Coin coin, User user);

}
