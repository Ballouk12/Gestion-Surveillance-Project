package com.GestionSurveillance.JEE.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.GestionSurveillance.JEE.entities.Option;
import java.util.List;
public interface OptionRepository extends JpaRepository<Option, Long> {

		List<Option>  findByDepartementId(Long id);
}
