package com.GestionSurveillance.JEE.repositories;

import com.GestionSurveillance.JEE.entities.ExamLocal;
import com.GestionSurveillance.JEE.entities.Local;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface ExamLocalRepository extends JpaRepository<ExamLocal, Integer> {
    List<ExamLocal> findByLocalAndDateAndDebutBeforeAndFinAfter(Local local, Date date, String fin, String debut);
}
