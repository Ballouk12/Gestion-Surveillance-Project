package com.GestionSurveillance.JEE.repositories;

import com.GestionSurveillance.JEE.entities.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TokenRepository extends JpaRepository<PasswordResetToken,Integer> {
    PasswordResetToken findByToken(String token);
}

