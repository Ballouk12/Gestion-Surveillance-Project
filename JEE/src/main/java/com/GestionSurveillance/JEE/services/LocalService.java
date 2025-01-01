package com.GestionSurveillance.JEE.services;

import com.GestionSurveillance.JEE.entities.Local;
import com.GestionSurveillance.JEE.repositories.LocalRepository;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class LocalService {
	
	@Autowired 
	LocalRepository localRepository;
	
	public List<Local> getLocaux(){
		return localRepository.findAll();
	}
	
	public Local getLocalById(int id ) {
		return localRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Local introuvable"));
	}
	
	public Local createLocal(Local local) {
		return localRepository.save(local);
	}
	
	public void deleteLocal(int id) {
        Local local = getLocalById(id); 
        localRepository.delete(local); 
    }
	
	public Local updateLocal(int id, Local localDetails) {
		Local local = getLocalById(id);
		local.setNom(localDetails.getNom());
        local.setCapacite(localDetails.getCapacite());
		local.setType(localDetails.getType());
        local.setEstDisponible(localDetails.isEstDisponible());
        local.setNbSurveillance(localDetails.getNbSurveillance());
        return localRepository.save(local); 
	}

	public List<Local> getAllLocal() {
		return localRepository.findAll();
	}
	
	public List<Local> getAvailableLocaux() {
        return localRepository.findByEstDisponible(true);
    }
	public List<Local> findLocauxByNom(String nom) {
        return localRepository.findByNomContainingIgnoreCase(nom);
    }

	public List<Local> processUploadedFile(MultipartFile file) throws IOException {
		List<Local> locals = new ArrayList<>();

		if (file.getOriginalFilename().endsWith(".csv")) {
			locals = processCSV(file);
		} else if (file.getOriginalFilename().endsWith(".xlsx")) {
			locals = processExcel(file);
		}

		return localRepository.saveAll(locals);
	}

	private List<Local> processCSV(MultipartFile file) throws IOException {
		List<Local> locals = new ArrayList<>();
		try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
			String line;
			boolean firstLine = true;
			while ((line = br.readLine()) != null) {
				if (firstLine) {
					firstLine = false;
					continue;
				}
				String[] values = line.split(",");
				Local local = new Local();
				local.setNom(values[0]);
				local.setCapacite(Integer.parseInt(values[1]));
				local.setType(values[2]);
				local.setEstDisponible(true);
				local.setNbSurveillance(0);
				locals.add(local);
			}
		}
		return locals;
	}

	private List<Local> processExcel(MultipartFile file) throws IOException {
		List<Local> locals = new ArrayList<>();
		try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {
			Sheet sheet = workbook.getSheetAt(0);
			boolean firstRow = true;
			for (Row row : sheet) {
				if (firstRow) {
					firstRow = false;
					continue;
				}
				Local local = new Local();
				local.setNom(getCellValueAsString(row.getCell(0)));
				local.setCapacite((int) row.getCell(1).getNumericCellValue());
				local.setType(getCellValueAsString(row.getCell(2)));
				local.setEstDisponible(true);
				local.setNbSurveillance(0);
				locals.add(local);
			}
		}
		return locals;
	}

	private String getCellValueAsString(Cell cell) {
		if (cell == null) return "";
		switch (cell.getCellType()) {
			case STRING:
				return cell.getStringCellValue();
			case NUMERIC:
				return String.valueOf((int) cell.getNumericCellValue());
			default:
				return "";
		}
	}

	public List<Local> getAvailableLocaux(Date date, String debut, String fin) {
		return localRepository.findLocauxByDateTime(date, debut, fin);
	}

}
