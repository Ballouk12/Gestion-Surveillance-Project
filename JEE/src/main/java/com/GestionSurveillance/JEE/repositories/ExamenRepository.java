package com.GestionSurveillance.JEE.repositories;

import com.GestionSurveillance.JEE.entities.Examen;
import com.GestionSurveillance.JEE.entities.Surveillance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface ExamenRepository extends JpaRepository<Examen, Long> {
    @Query("SELECT e FROM Examen e JOIN e.locaux el WHERE el.date = :date " +
            "AND el.debut >= :debut AND el.fin <= :fin")
    List<Examen> findExamensByDateTime(Date date, String debut, String fin);
    @Override
    List<Examen> findAll();

    Long countBySessionId(Long sessionId);

    @Query("SELECT e FROM Examen e " +
            "JOIN e.locaux el " +
            "WHERE e.session.id = :sessionId " +
            "AND e.enseignant.id = :enseignantId " +
            "AND el.date = :date " +
            "AND el.debut = :debut")
    Optional<Examen> findBySessionIdAndEnseignantIdAndDateAndCreneau(
            @Param("sessionId") Long sessionId,
            @Param("enseignantId") Long enseignantId,
            @Param("date") Date date,
            @Param("debut") String debut
    );
}

