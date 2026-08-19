package com.trading.Trading.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trading.Trading.modal.Coin;
import com.trading.Trading.modal.User;
import com.trading.Trading.modal.Watchlist;
import com.trading.Trading.repository.WatchlistRepository;

@Service
public class WatchlistServiceImpl implements WatchlistService{
	
	@Autowired
	private WatchlistRepository watchlistRepository;

	@Override
	public Watchlist findUserWatchlist(String userId) throws Exception {
		Watchlist watchlist = watchlistRepository.findByUserId(userId);
		if(watchlist == null) {
			throw new Exception("watchlist not found...");
		}
		return watchlist;
	}

	@Override
	public Watchlist createWatchlist(User user) {
		Watchlist watchlist = new Watchlist();
		watchlist.setUser(user);
		return watchlistRepository.save(watchlist);
	}

	@SuppressWarnings("null")
	@Override
	public Watchlist findById(String id) throws Exception {
		Optional<Watchlist> watchlistOptional = watchlistRepository.findById(id);
		if(watchlistOptional.isEmpty()) {
			throw new Exception("watchlist not found");
		}
		return watchlistOptional.get();
	}

	@Override
	public Coin addItemToWatchlist(Coin coin, User user) {
		try {
			Watchlist watchlist = findUserWatchlist(user.getId());
			if(watchlist.getCoins().contains(coin)) {
				watchlist.getCoins().remove(coin);
			}
			else watchlist.getCoins().add(coin);
			watchlistRepository.save(watchlist);
		} catch (Exception e) {
			throw new RuntimeException("Could not find user watchlist", e);
		}
		return coin;
	}

}
