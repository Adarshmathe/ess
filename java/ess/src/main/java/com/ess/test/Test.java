package com.ess.test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Test {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@PostMapping("/create")
	public int create(@RequestBody ent body) {
		
		var query = "insert into demo(name,address) values(?,?)";
		
		int update = jdbcTemplate.update(query,"adarsh","cubbonpark");
		
		return update;
		
	}

}
