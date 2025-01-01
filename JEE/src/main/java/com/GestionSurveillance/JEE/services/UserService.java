package com.GestionSurveillance.JEE.services;


import com.GestionSurveillance.JEE.entities.AuthoInfo;
import com.GestionSurveillance.JEE.entities.User;
import com.GestionSurveillance.JEE.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User signUp(User user) {
        return userRepository.save(user);
    }
    public User signIn(AuthoInfo infos) {return userRepository.findCompte(infos.getLogin(),infos.getPassword());}

}
