package com.example.demo.rest;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.LoginDTO;
import com.example.demo.dto.ProfileDTO;
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
			tokenMap.put("category", user.getCategory()!=null? user.getCategory().getName() : null);
			tokenMap.put("type", user.getType());
			
			return new ResponseEntity<Map<String, Object>>(tokenMap, HttpStatus.OK);
		} else {
			tokenMap.put("token", null);
			return new ResponseEntity<Map<String, Object>>(tokenMap, HttpStatus.UNAUTHORIZED);
		}
		
	}
	
	
	@PostMapping("/changePassword")
	public String changePassword(@RequestBody LoginDTO dto) {
		User u=userRepository.findByUsername(dto.getUsername());
		u.setPassword(dto.getPassword());
		userRepository.save(u);
		return "ok";
	}
	
	@PostMapping("/updateProfile")
	public ResponseEntity<User> updateProfile(@RequestBody ProfileDTO dto,HttpServletRequest request) {
		String username=request.getHeader("username");
		User u = userRepository.findByUsername(username);
		u.setUsername(dto.getUsername());
		u.setFirstName(dto.getFirstName());
		u.setLastName(dto.getLastName());
		try {
			userRepository.save(u);
			return new ResponseEntity<User>(u, HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(e.getMessage());
			return new ResponseEntity<User>(u, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping("/getUser")
	public User getUser(@RequestBody String username) {
		return userRepository.findByUsername(username);
	}
	
	@PostMapping("/addUser")
	public ResponseEntity<User> addUser(@RequestBody User user){
			try {
				userRepository.save(user);
				return new ResponseEntity<User>(user, HttpStatus.OK);
			} catch (Exception e) {
				// TODO: handle exception
				return new ResponseEntity<User>(user, HttpStatus.INTERNAL_SERVER_ERROR);
			}
	}
	
	@PreAuthorize("hasAuthority('administrator')")
	@GetMapping("/getUsers")
	public List<User> getUsers(){
		return userRepository.findAll();
	}

}
