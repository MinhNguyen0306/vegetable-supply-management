package com.example.vegetablemanagementsupplybackend;

import com.example.vegetablemanagementsupplybackend.Config.AppConstants;
import com.example.vegetablemanagementsupplybackend.Entity.Role;
import com.example.vegetablemanagementsupplybackend.Repository.RoleRepository;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "Vegetable Supply Management Api",
		version = "1.0", description = "Vegetable Supply Management Api document"))
@SecurityScheme(name = "vegetableApi", scheme = "basic", type = SecuritySchemeType.APIKEY, in = SecuritySchemeIn.HEADER)
public class VegetableManagementSupplyBackendApplication implements CommandLineRunner {
	@Autowired
	private RoleRepository roleRepository;

	public static void main(String[] args) {
		SpringApplication.run(VegetableManagementSupplyBackendApplication.class, args);
	}

	@Bean
	public ModelMapper modelMapper() {return new ModelMapper();}


	@Override
	public void run(String... args) throws Exception {
		try {
			Role adminRole = new Role();
			adminRole.setId(AppConstants.ADMIN_USER);
			adminRole.setName("ROLE_ADMIN");

			Role martRole = new Role();
			martRole.setId(AppConstants.MART_USER);
			martRole.setName("ROLE_MART");

			Role providerRole = new Role();
			providerRole.setId(AppConstants.PROVIDER_USER);
			providerRole.setName("ROLE_PROVIDER");

			List<Role> roles = List.of(adminRole, martRole, providerRole);
			this.roleRepository.saveAll(roles);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
