package com.example.demo.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;



@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	//@Autowired
	//private UserDetailsServiceImpl userDetailsService;

	@Override
	public void configure(AuthenticationManagerBuilder auth) throws Exception {

		//auth.userDetailsService(userDetailsService).passwordEncoder(new BCryptPasswordEncoder());
	}

	/**
	 * This method return instance of AuthenticationManager from super class
	 * 
	 * @throws Exception
	 */
	@Bean
	@Override
	public AuthenticationManager authenticationManager() throws Exception {
		return super.authenticationManager();
	}
	
	/**
	 * This method returns instance of AuthenticationTokenFilter
	 *
	 * @throws Exception
	 */

	@Bean
	public AuthenticationTokenFilter authenticationTokenFilterBean() throws Exception {
		AuthenticationTokenFilter authenticationTokenFilter = new AuthenticationTokenFilter();
		authenticationTokenFilter.setAuthenticationManager(authenticationManagerBean());
		return authenticationTokenFilter;
	}

	@Override
	public void configure(WebSecurity web) throws Exception {

		web.ignoring()
				.antMatchers("/*", "/index.html", "/app/**", "/registration", "/login","/registration/activateProcess","/registration/*", 
						"/favicon.ico", "/confirm_registration*", "/category","/registration/firm/*","/books/*","/search/*");
	}
	
	/*@Bean
    CorsFilter corsFilter() {
        CorsFilter filter = new CorsFilter();
        return filter;
    }*/

	/**
	 * This method configures logic about authority, authentication etc.
	 * 
	 * @param httpSecurity
	 * @throws Exception
	 */
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().and()
				// starts authorizing configurations
				.authorizeRequests().antMatchers("/login", "/registration","/registration/*", "/registration/activateProcess",
						"/confirm_registration*", "/category", "/registration/firm/*","/","/home").permitAll()
				// authenticate all remaining URLS
				.anyRequest().fullyAuthenticated().and()
				// adding JWT filter
				//.addFilterBefore(new CorsFilter(), SessionManagementFilter.class)
				.addFilterBefore(new JWTFilter(), UsernamePasswordAuthenticationFilter.class)
				
				// enabling the basic authentication
				.httpBasic().and()
				// configuring the session as state less. Which means there is
				// no session in the server
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
				// disabling the CSRF - Cross Site Request Forgery
				.csrf().disable();
	}
	
	
	
	

}
