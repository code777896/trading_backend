package com.trading.Trading.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {
	
	@Autowired(required = false)
	private JavaMailSender javaMailSender;
	
	@SuppressWarnings("null")
	public void sendVerificationOtpEmail(String email, String otp) throws MessagingException {
		if (javaMailSender == null) {
			System.err.println("JavaMailSender is not configured. Cannot send email verification to: " + email);
			return;
		}
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		
		MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, "utf-8");
		
		String subject = "Verify Otp";
		
		String text = "Your verification code is" + otp;
		
		mimeMessageHelper.setSubject(subject);
		mimeMessageHelper.setText(text);
		mimeMessageHelper.setTo(email);
		
		try {
			javaMailSender.send(mimeMessage);
		}catch(MailException e) {
			throw new MailSendException(e.getMessage());
		}
	}
}