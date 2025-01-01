package com.GestionSurveillance.JEE.services;

import com.GestionSurveillance.JEE.dto.OptionDTO;
import com.GestionSurveillance.JEE.entities.Departement;
import com.GestionSurveillance.JEE.repositories.DepartementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.GestionSurveillance.JEE.entities.Option;
import com.GestionSurveillance.JEE.repositories.OptionRepository;

import java.util.List;

@Service
public class OptionService {
	
	@Autowired
	OptionRepository optionRepository;
    @Autowired
    private DepartementRepository departementRepository;

	public Option createOption(Option option) {
		return optionRepository.save(option);
	}
	
	public void deleteOption(Long id) {
		optionRepository.deleteById(id);
	}
	
	public Option getOptionById(Long id) {
		return optionRepository.getById(id);
	}
	
	public List<Option> getAllOptions(){
		return optionRepository.findAll();
	}
	
	public List<Option> getOptionsByDepartementId(Long id){
		return optionRepository.findByDepartementId(id);
	}

	public Option updateOption(Long id, OptionDTO newOption) {
		Option option = getOptionById(id);
		if (option != null) {
			option.setNom(newOption.getNom());
			Departement departement = departementRepository.findById(newOption.getDepartement())
					.orElseThrow(() -> new IllegalArgumentException("Département introuvable avec l'ID : " + newOption.getDepartement()));

			option.setDepartement(departement);
			return optionRepository.save(option);
		}
		throw new IllegalArgumentException("Option introuvable avec l'ID : " + id);
	}


}
