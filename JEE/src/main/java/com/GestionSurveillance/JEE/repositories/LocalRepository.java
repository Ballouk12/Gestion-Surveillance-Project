package com.GestionSurveillance.JEE.repositories;

import com.GestionSurveillance.JEE.entities.Examen;
import com.GestionSurveillance.JEE.entities.Local;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface LocalRepository extends JpaRepository<Local, Integer>{
	
	List<Local> findByNomContainingIgnoreCase(String nom);
    List<Local> findByEstDisponible(boolean estDisponible);
    @Query("SELECT DISTINCT l FROM Local l WHERE l.id NOT IN " +
            "(SELECT el.local.id FROM ExamLocal el WHERE el.date = :date AND el.debut = :debut AND el.fin = :fin)")
    List<Local> findLocauxByDateTime(Date date, String debut, String fin);
}
