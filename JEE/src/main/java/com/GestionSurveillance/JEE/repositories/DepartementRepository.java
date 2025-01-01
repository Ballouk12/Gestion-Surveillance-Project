package com.GestionSurveillance.JEE.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.GestionSurveillance.JEE.entities.Departement;

@Repository
public interface DepartementRepository extends JpaRepository<Departement, Long>{
	
    Departement findByNom(String nom);
}
