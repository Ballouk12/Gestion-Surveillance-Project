package com.GestionSurveillance.JEE.services;

import com.GestionSurveillance.JEE.repositories.DepartementRepository;
import com.GestionSurveillance.JEE.repositories.EnseignantRepository;
import com.GestionSurveillance.JEE.repositories.ExamenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class StatisquesService {

    @Autowired
    ExamenRepository examenRepository;
    @Autowired
    DepartementRepository departementRepository;
    @Autowired
    EnseignantRepository enseignantRepository;


    public Map<String,Long> getStatisques(long id){
        Map<String,Long> statisques = new HashMap<String,Long>();
        statisques.put("dept",departementRepository.count());
        statisques.put("enseignant",enseignantRepository.count());
        statisques.put("examen",examenRepository.countBySessionId(id));
        return statisques;
    }
}
