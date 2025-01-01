package com.GestionSurveillance.JEE.repositories;

import com.GestionSurveillance.JEE.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT user FROM User user WHERE user.login=:login AND user.password=:password")
    public User findCompte(@Param("login") String login , @Param("password") String password);
}
