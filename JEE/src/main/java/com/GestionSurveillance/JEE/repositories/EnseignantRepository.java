package com.GestionSurveillance.JEE.repositories;

import com.GestionSurveillance.JEE.entities.Enseignant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnseignantRepository extends JpaRepository<Enseignant, Long> {

    List<Enseignant> findByDepartementId(Long departementId);

    List<Enseignant> findByEstDispenseTrue();

    List<Enseignant> findByEstReservisteTrue();

    Enseignant findByEmail(String email);
}
