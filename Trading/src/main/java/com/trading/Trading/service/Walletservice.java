package com.trading.Trading.service;


import com.trading.Trading.modal.Order;
import com.trading.Trading.modal.User;
import com.trading.Trading.modal.Wallet;

public interface Walletservice {

    Wallet getUserWallet(User user);

    Wallet addBalance(Wallet wallet, Long money);

    Wallet findWalletById(String id) throws Exception;

    Wallet walletToWalletTransfer(User sender, Wallet receiverWallet, Long amount) throws Exception;

    Wallet payOrderPayment(Order order, User user) throws Exception;

}
