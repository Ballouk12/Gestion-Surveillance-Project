package com.GestionSurveillance.JEE.repositories;

import com.GestionSurveillance.JEE.entities.Surveillance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.Optional;

@Repository
public interface SurveillanceRepository extends JpaRepository<Surveillance, Integer> {

    @Query("SELECT s FROM Surveillance s " +
            "WHERE s.session.id = :sessionId " +
            "AND s.enseignant.id = :enseignantId " +
            "AND EXISTS (SELECT el FROM ExamLocal el " +
            "WHERE el.local = s.local " +
            "AND el.date = :date " +
            "AND el.debut = :debut)")
    Optional<Surveillance> findBySessionIdAndEnseignantIdAndDateAndCreneau(
            @Param("sessionId") Long sessionId,
            @Param("enseignantId") Long enseignantId,
            @Param("date") Date date,
            @Param("debut") String debut
    );
}
