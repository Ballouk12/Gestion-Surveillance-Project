package com.GestionSurveillance.JEE.controllers;

import com.GestionSurveillance.JEE.config.JwtService;
import com.GestionSurveillance.JEE.dto.AuthResponse;
import com.GestionSurveillance.JEE.dto.LoginRequest;
import com.GestionSurveillance.JEE.dto.SignupRequest;
import com.GestionSurveillance.JEE.entities.PasswordResetToken;
import com.GestionSurveillance.JEE.entities.User;
import com.GestionSurveillance.JEE.repositories.TokenRepository;
import com.GestionSurveillance.JEE.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("http://localhost:5173/")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private TokenRepository tokenRepository;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest request) {
        if (userService.getUserByEmail(request.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Email already exists");
        }
        if (request.getPassword() == null) {
            return ResponseEntity.badRequest().body("Mot de passe manquant");
        }

        User user = new User();
        user.setNom(request.getNom());
        user.setEmail(request.getEmail());
        user.setHashedPassword(passwordEncoder.encode(request.getPassword()));
        user.setPrenom(request.getPrenom());

        userService.saveUser(user);

        String token = jwtService.generateToken(user.getEmail());
        return ResponseEntity.ok(new AuthResponse(token, user.getEmail()));
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        User user = userService.getUserByEmail(request.getEmail());

        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getHashedPassword())) {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }

        String token = jwtService.generateToken(user.getEmail());
        return ResponseEntity.ok(new AuthResponse(token, user.getEmail()));
    }
    @PostMapping("/reset")
    public String forgetPasswordProcess(@RequestParam("email") String email ) {
        User user = userService.getUserByEmail(email);
        String output ="";
        if(user!=null) {
            output = userService.sendEmail(user);
        }
        return output;
    }

    @PostMapping("/change")
    public ResponseEntity<?> changePassword(@RequestParam("token") String token,@RequestParam("password") String newPassword){
        String resultValidateToken = userService.validateToken(token);
        if(resultValidateToken==null){
            return ResponseEntity.badRequest().body("Invalid token");
        }
        PasswordResetToken resetToken = tokenRepository.findByToken(token);
        User user = resetToken.getUser();
        userService.changePassword(newPassword,user);
        return ResponseEntity.ok("Mot de passe changer avec succes");
    }
}