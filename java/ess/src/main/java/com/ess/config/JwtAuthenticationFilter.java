package com.ess.config;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ess.serviceImpl.UserDetailsServiceImpl;

import io.jsonwebtoken.ExpiredJwtException;

@Service
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	
	@Autowired
	private UserDetailsServiceImpl userDetailsService;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		final String requestTokenHeader = request.getHeader("Authorization");

		String username=null;
		String jwttoken=null;
		if(requestTokenHeader!=null && requestTokenHeader.startsWith("Bearer ")) {
			
			jwttoken = requestTokenHeader.substring(7);
			try {
				
				username = this.jwtUtil.extractUsername(jwttoken);

			} catch (ExpiredJwtException e) {
				e.printStackTrace();
				System.out.println("jwt token has expired");
				
				
			}catch(Exception e) {
				e.printStackTrace();
				System.out.println("error");
			}
		}else {
			System.out.println("Invalid token, not start with bearer...");
		}
		
		//validated
		if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			
			final UserDetails userdetails = this.userDetailsService.loadUserByUsername(username);
			
			if(this.jwtUtil.validateToken(jwttoken, userdetails)) {
				UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
						userdetails, null, userdetails.getAuthorities());
				usernamePasswordAuthenticationToken
						.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
			}
		} else {
			System.out.println("token is not valid");
		}
//		filterChain.doFilter(request, response);
		
		try {
			filterChain.doFilter(request, response);
		} catch (IllegalStateException e) {
			e.printStackTrace();
			
		}
	}


}
