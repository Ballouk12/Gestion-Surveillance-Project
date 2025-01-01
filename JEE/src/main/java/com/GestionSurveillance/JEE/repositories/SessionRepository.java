package com.GestionSurveillance.JEE.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.GestionSurveillance.JEE.entities.Session;

public interface SessionRepository extends JpaRepository<Session, Long> {

	// Méthode personnalisée : Trouver une session par sa date de début
    Session findByDateDebut(String dateDebut);

    // Méthode personnalisée : Trouver une session par son type
    Session findByTypeSession(String typeSession);
}
