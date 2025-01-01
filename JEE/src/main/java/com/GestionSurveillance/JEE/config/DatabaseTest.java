package com.GestionSurveillance.JEE.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
public class DatabaseTest {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostConstruct
    public void testConnection() {
        try {
            jdbcTemplate.execute("SELECT 1");
            System.out.println("✅ Connexion à la base de données réussie !");
        } catch (Exception e) {
            System.err.println("❌ Échec de la connexion à la base de données !");
            e.printStackTrace();
        }
    }
}
