package com.trading.Trading.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.trading.Trading.modal.TwoFactorOTP;
import com.trading.Trading.modal.User;
import com.trading.Trading.repository.UserRepository;

import com.trading.Trading.config.JwtProvider;
import com.trading.Trading.responce.AuthResponce;
import com.trading.Trading.service.CustomUserDetailsService;
import com.trading.Trading.service.EmailService;
import com.trading.Trading.service.TwoFactorOtpService;

import com.trading.Trading.utils.OtpUtils;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

@RestController
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private CustomUserDetailsService customUserDetailsService;
	
	@Autowired
	private TwoFactorOtpService twoFactorOtpService;
	
	@Autowired
	private EmailService emailService;
	
	@PostMapping("/signup")
	
	public ResponseEntity<AuthResponce> register(@RequestBody User user) throws Exception {
		
		
		User isEmailExist = userRepository.findByEmail(user.getEmail());
		
		if(isEmailExist != null) {
			throw new Exception("Email is already used with another account");
		}
		
		User newUser = new User();
		newUser.setEmail(user.getEmail());
		newUser.setPassword(user.getPassword());
		newUser.setEmail(user.getEmail());
		newUser.setFullName(user.getFullName());
		
		userRepository.save(newUser);
		
		Authentication auth = new UsernamePasswordAuthenticationToken(
				user.getEmail(), 
				user.getPassword()
				);
		SecurityContextHolder.getContext().setAuthentication(auth);
		
		String jwt = JwtProvider.generateToken(auth);
		
		
		
		AuthResponce res = new AuthResponce();
		res.setJwt(jwt);
		res.setStatus(true);
		res.setMessage("registered successful");
		
		return new ResponseEntity<>(res, HttpStatus.CREATED);
	}
	
	@PostMapping("/signin")
		
		public ResponseEntity<AuthResponce> login(@RequestBody User user) throws Exception {
			
			String username = user.getEmail();
			String password = user.getPassword();
			
			Authentication auth = authenticate(username, password);
					
			SecurityContextHolder.getContext().setAuthentication(auth);
			
			String jwt = JwtProvider.generateToken(auth);
			
			User authUser = userRepository.findByEmail(username);
			
			if(user.getTwoFactorAuth().isEnabled()) {
				AuthResponce res = new AuthResponce();
				res.setMessage("Two Factor Auth is Enabled");
				res.setTwoFactorAuthEnable(true);
				String otp = OtpUtils.generateOtp();
				
				TwoFactorOTP oldTwoFactorOtp = twoFactorOtpService.findByUser(authUser.getId());
				if(oldTwoFactorOtp != null) {
					twoFactorOtpService.deleteTwoFactorOtp(oldTwoFactorOtp);
					
				}
				
				TwoFactorOTP newTwoFactorOtp = twoFactorOtpService.createTwoFactorOtp(authUser, otp, jwt);
				
				emailService.sendVerificationOtpEmail(username, otp);
				
				res.setSession(newTwoFactorOtp.getId());
				return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
				
			}
			
			AuthResponce res = new AuthResponce();
			res.setJwt(jwt);
			res.setStatus(true);
			res.setMessage("Login successful");
			
			return new ResponseEntity<>(res, HttpStatus.CREATED);
		}

	private Authentication authenticate(String username, String password) {
		UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
		if(userDetails == null) {
			throw new BadCredentialsException("Invalid Username");
		}
		
		if(!password.equals(userDetails.getPassword())) {
			throw new BadCredentialsException("Invalid Password");
		}
		return new UsernamePasswordAuthenticationToken(userDetails, password, userDetails.getAuthorities());
	}
	
	@PostMapping("/two-factor/otp/{otp}")
	public ResponseEntity<AuthResponce> verifySigningOtp(@PathVariable String otp, @RequestParam String id) throws Exception{
		
		TwoFactorOTP twofactorOTP = twoFactorOtpService.findByID(id);
		
		if(twoFactorOtpService.verifyTwoFactorOtp(twofactorOTP, otp)) {
			AuthResponce res = new AuthResponce();
			res.setMessage("Two Factor Authentication Verified");
			res.setTwoFactorAuthEnable(true);
			res.setJwt(twofactorOTP.getJwt());
			return new ResponseEntity<>(res, HttpStatus.OK);
		}
		
		throw new Exception("Invalid otp");
	}

}
