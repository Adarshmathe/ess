package com.ess.dto;

import org.springframework.security.core.GrantedAuthority;

@SuppressWarnings("serial")
public class Authority implements GrantedAuthority  {

	private String authority;
	public Authority(String authority) {
		super();
		this.authority = authority;
	}

	public Authority() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String getAuthority() {
		// TODO Auto-generated method stub
		return this.authority;
	}

}
