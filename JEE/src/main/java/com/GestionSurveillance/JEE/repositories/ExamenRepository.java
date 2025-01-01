package com.GestionSurveillance.JEE.repositories;

import com.GestionSurveillance.JEE.entities.Examen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ExamenRepository extends JpaRepository<Examen, Long> {
    @Query("SELECT e FROM Examen e JOIN e.locaux el WHERE el.date = :date " +
            "AND el.debut >= :debut AND el.fin <= :fin")
    List<Examen> findExamensByDateTime(Date date, String debut, String fin);

    Long countBySessionId(Long sessionId);
}
