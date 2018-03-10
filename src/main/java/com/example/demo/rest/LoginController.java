package com.example.demo.rest;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.LoginDTO;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RestController
@RequestMapping(value = "/login")
@CrossOrigin(origins = "http://localhost:4200")
public class LoginController {

	@Autowired
	UserRepository userRepository;

	BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
	
	@PostMapping
	public ResponseEntity<Map<String, Object>> authenticate(@RequestBody LoginDTO loginDTO) {

		String token = null;
		//User user = userService.findOneByUsername(loginDTO.getUsername());
		
		User user=userRepository.findByUsername(loginDTO.getUsername());
		
		Map<String, Object> tokenMap = new HashMap<String, Object>();
		// String password = encoder.encode(loginDTO.getPassword());
		if (user != null && user.getPassword().equals(loginDTO.getPassword())) {
			//CustomUserDetails customUser = new CustomUserDetails(user);
			//List<GrantedAuthority> authorities = (List<GrantedAuthority>) customUser.getAuthorities();
			List<String> roles = new ArrayList<String>();
			//for (GrantedAuthority authority : authorities) {
			//	roles.add(authority.getAuthority());
			//}
			roles.add(user.getType());
			token = Jwts.builder().setSubject(user.getUsername()).claim("roles", roles).setIssuedAt(new Date())
					.signWith(SignatureAlgorithm.HS256, "secretkey").compact();
			//System.out.println(token);
			tokenMap.put("token", token);
			tokenMap.put("user", user.getUsername());
			//tokenMap.put("role", user.getRole());
			
			return new ResponseEntity<Map<String, Object>>(tokenMap, HttpStatus.OK);
		} else {
			tokenMap.put("token", null);
			return new ResponseEntity<Map<String, Object>>(tokenMap, HttpStatus.UNAUTHORIZED);
		}
		
	}
		

}
