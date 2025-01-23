package com.GestionSurveillance.JEE.services;

import com.GestionSurveillance.JEE.entities.PasswordResetToken;
import com.GestionSurveillance.JEE.entities.User;
import com.GestionSurveillance.JEE.repositories.TokenRepository;
import com.GestionSurveillance.JEE.repositories.UserRepository;
import org.apache.poi.ss.extractor.ExcelExtractor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    JavaMailSender javaMailSender;
    @Autowired
    TokenRepository tokenRepository;
    @Autowired
    PasswordEncoder passwordEncoder;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(int id) {
        return userRepository.findById(id).orElse(null);
    }

    public User getUserByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.orElse(null);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }

    public String sendEmail(User user) {
        try {
            String resetkLink = generateResetToken(user);

            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("mohamedballouk165@gmail.com");
            message.setTo(user.getEmail());
            message.setSubject("Reset Password");
            message.setText("Bonjour "+user.getNom()+" Voici votre url pour changer votre mot de passe "+resetkLink);
            javaMailSender.send(message);
            return "seccus";
        }catch (Exception e) {
            e.printStackTrace();
            return "erreur";
        }
    }

    private String generateResetToken(User user) {
        UUID uuid = UUID.randomUUID();
        LocalDateTime currentDateTime = LocalDateTime.now();
        LocalDateTime expiryDate = currentDateTime.plusDays(30);
        PasswordResetToken resetToken = new PasswordResetToken() ;
        resetToken.setToken(uuid.toString());
        resetToken.setUser(user);
        resetToken.setExpiryDate(expiryDate);
        PasswordResetToken savedToken = tokenRepository.save(resetToken);
        if(savedToken != null) {
            String endpointUrl = "http://localhost:5173/auth/change";
            return endpointUrl+"?token="+savedToken.getToken();
        }
        return "";
    }

    public String validateToken(String token) {

        PasswordResetToken resetToken = tokenRepository.findByToken(token);
        if(resetToken==null) {
            return "token invalide";
        }
        if(resetToken !=null && resetToken.getExpiryDate().isAfter(LocalDateTime.now())) {
            tokenRepository.delete(resetToken);
            return "token expired";
        }
        return null;
    }

    public User changePassword(String newPassword,User user) {
        user.setHashedPassword(passwordEncoder.encode(newPassword));
       return userRepository.save(user);
    }
}
