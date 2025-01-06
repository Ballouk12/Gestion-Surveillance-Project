package com.GestionSurveillance.JEE.services;

import com.GestionSurveillance.JEE.entities.FerieDay;
import com.GestionSurveillance.JEE.repositories.FerieDayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FerieDayService {

    @Autowired
    private FerieDayRepository ferieDayRepository;

    public boolean createFerieDay(FerieDay ferieDay) {
        return ferieDayRepository.save(ferieDay) != null;
    }

    public List<FerieDay> getAllFerieDays() {
        return ferieDayRepository.findAll();
    }

    public boolean updateFerieDay(FerieDay ferieDay) {
        return ferieDayRepository.save(ferieDay) != null;
    }

    public  void deleteFerieDay(int id) {
         ferieDayRepository.deleteById(id);
    }
}
