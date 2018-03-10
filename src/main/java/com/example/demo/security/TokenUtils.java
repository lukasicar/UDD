package com.example.demo.security;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class TokenUtils {
	
	@Value("car_insurance_2017")
	private String secret;
	
	@Value("18000")
	private Long expiration;
	
	/**
	 * This method returns user name from token
	 * @param token
	 * @return String user name
	 */
	public String getUsernameFromToken(String token) {
		String username;
		try {
			Claims claims = this.getClaimsFromToken(token);
			username = claims.getSubject();
		} catch (Exception e) {
			username = null;
		}
			
		return username;
	}
	
	/**
	 * This method returns object Claims from token
	 * @param token
	 * @return Claims
	 */
	private Claims getClaimsFromToken(String token) {
		Claims claims;
		//System.out.println(token);
		try {
			claims = Jwts.parser().setSigningKey("secretkey")
					.parseClaimsJws(token).getBody();
		} catch (Exception e) {
			claims = null;
		}
		return claims;
	}
	
	/**
	 * This method returns date of expiration token
	 * @param token
	 * @return Date Expiration date 
	 */
	public Date getExpirationDateFromToken(String token) {
		Date expirationDate;
		try {
			final Claims claims = this.getClaimsFromToken(token);
			expirationDate = claims.getExpiration();
		} catch (Exception e) {
			expirationDate = null;
		}
		return expirationDate;
	}
	
	/**
	 * This method checks is token expired
	 * @param token
	 * @return boolean true if token is not expired, else false
	 */
	private boolean isTokenExpired(String token) {
	    final Date expirationDate = this.getExpirationDateFromToken(token);
	    return expirationDate.before(new Date(System.currentTimeMillis()));
	  }
	
	
	/**
	 * This method checks if token is valid
	 * @param token
	 * @param userDetails
	 * @return boolean true if token is valid, else false
	 */
	public boolean validateToken(String token, UserDetails userDetails) {
		final String username = getUsernameFromToken(token);
		return username.equals(userDetails.getUsername())
				&& !isTokenExpired(token);
	}
	
	/**
	 * This method generates token and returns string that represents token for user
	 * @param userDetails
	 * @return token
	 */
	public String generateToken(UserDetails userDetails) {
		Map<String, Object> claims = new HashMap<>();
		claims.put("sub", userDetails.getUsername());
		claims.put("created", new Date(System.currentTimeMillis()));
		return Jwts.builder().setClaims(claims)
				.setExpiration(new Date(System.currentTimeMillis() + expiration * 1000))
				.signWith(SignatureAlgorithm.HS512, secret).compact();
	}


}
