package com.GestionSurveillance.JEE.repositories;

import com.GestionSurveillance.JEE.entities.FerieDay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FerieDayRepository extends JpaRepository<FerieDay, Integer> {

}
