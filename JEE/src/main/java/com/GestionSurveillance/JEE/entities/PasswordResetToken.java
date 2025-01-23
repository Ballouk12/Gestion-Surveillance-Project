package com.GestionSurveillance.JEE.entities;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class PasswordResetToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id ;
    private String token ;
    private LocalDateTime expiryDate ;
    @OneToOne
    @JoinColumn(name = "user_id",referencedColumnName = "id" ,nullable = false)
    private User user ;

     public int getId() {
         return id;
     }

     public void setId(int id) {
         this.id = id;
     }

     public String getToken() {
         return token;
     }

     public void setToken(String token) {
         this.token = token;
     }

     public LocalDateTime getExpiryDate() {
         return expiryDate;
     }

     public void setExpiryDate(LocalDateTime expiryDate) {
         this.expiryDate = expiryDate;
     }

     public User getUser() {
         return user;
     }

     public void setUser(User user) {
         this.user = user;
     }
 }
