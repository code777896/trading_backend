package com.trading.Trading.Controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.trading.Trading.domain.VerificationType;
import com.trading.Trading.modal.ForgotPasswordToken;
import com.trading.Trading.modal.User;
import com.trading.Trading.modal.VerificationCode;
import com.trading.Trading.responce.ApiResponse;
import com.trading.Trading.responce.AuthResponce;
import com.trading.Trading.service.EmailService;
import com.trading.Trading.service.ForgotPasswordService;
import com.trading.Trading.service.UserService;
import com.trading.Trading.service.VerificationCodeService;
import com.trading.Trading.utils.OtpUtils;

import request.ResetPasswordRequest;
import request.ForgotPasswordTokenRequest;

@RestController
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private VerificationCodeService verificationCodeService;
	
	@Autowired
	private EmailService emailService;
	
	@Autowired
	private ForgotPasswordService forgotPasswordService;
	
	@GetMapping("/api/users/profile")
	
	public ResponseEntity<User> getUserProfile(@RequestHeader("Authorization") String jwt) throws Exception{
		User user = userService.findUserProfileByJwt(jwt);
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}
	
	@PostMapping("/api/users/verification/{verificationType}/sentOtp")
	public ResponseEntity<String> sendVerificationOtp(@RequestHeader("Authorization") 
	           String jwt, @PathVariable VerificationType verificationType) throws Exception{
		User user = userService.findUserProfileByJwt(jwt);
		
		VerificationCode verificationCode = verificationCodeService.getVerificationCodeByUser(user.getId());
		if(verificationCode == null) {
			verificationCode = verificationCodeService.sendVerificationCode(user, verificationType);
		}
		
		if(verificationType.equals(VerificationType.EMAIL)) {
			emailService.sendVerificationOtpEmail(user.getEmail(), verificationCode.getOtp());
		}
		
		
		return new ResponseEntity<>("Verification otp send successfully", HttpStatus.OK);
	}
	
	@PatchMapping("/api/users/enable-two-factor/verify-otp/{otp}")
	public ResponseEntity<User> enableTwoFactorAuthentication(@PathVariable String otp, @RequestHeader("Authorization") String jwt) throws Exception{
		User user = userService.findUserProfileByJwt(jwt);
		VerificationCode verificationCode = verificationCodeService.getVerificationCodeByUser(user.getId());
		String sendTo = verificationCode.getVerificationType().equals(VerificationType.EMAIL)? verificationCode.getEmail() : verificationCode.getMobile();
		boolean isVerified = verificationCode.getOtp().equals(otp);
		
		if(isVerified){
			User updatedUser = userService.enableTwoFactorAuthentication(verificationCode.getVerificationType(), sendTo, user);
	        verificationCodeService.deleteVerificationCodeById(verificationCode);
	        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
		}
		
		throw new Exception("Wrong otp");
	}
	
	@PostMapping("/auth/users/reset-password/sentOtp")
	public ResponseEntity<AuthResponce> sendForgortPasswordOtp(@RequestBody ForgotPasswordTokenRequest req) throws Exception{
		User user = userService.findUserByEmail(req.getSendTo());
		String otp = OtpUtils.generateOtp();
		UUID uuid = UUID.randomUUID();
		String id = uuid.toString();
		ForgotPasswordToken token = forgotPasswordService.findByUser(user.getId());
		if(token == null) {
			token = forgotPasswordService.createToken(user, id, otp, req.getVerificationType(), req.getSendTo());
		}
		
		if(req.getVerificationType().equals(VerificationType.EMAIL)) {
			emailService.sendVerificationOtpEmail(user.getEmail(), token.getOtp());
		}
		AuthResponce responce = new AuthResponce();
		responce.setSession(token.getId());
		responce.setMessage("Password reset otp send successfully");
		
		return new ResponseEntity<>(responce, HttpStatus.OK);
	}
	
	@PatchMapping("/auth/users/reset-password/verify-otp")
	public ResponseEntity<ApiResponse> resetPassword(
			@RequestParam String id, 
			@RequestBody ResetPasswordRequest req,
			@RequestHeader("Authorization") String jwt) throws Exception{
		
		ForgotPasswordToken forgotPasswordToken = forgotPasswordService.findById(id);
		boolean isVerified = forgotPasswordToken.getOtp().equals(req.getOtp());
		
		if(isVerified) {
			userService.updatePassword(forgotPasswordToken.getUser(), req.getPassword());
			ApiResponse response = new ApiResponse();
			response.setMessage("Password update successfully");
			return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
	}
		throw new Exception("Wrong otp");
}

}







