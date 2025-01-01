package com.GestionSurveillance.JEE.services;

import com.GestionSurveillance.JEE.entities.Departement;
import com.GestionSurveillance.JEE.entities.Enseignant;
import com.GestionSurveillance.JEE.repositories.DepartementRepository;
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
import java.util.List;

@Service
public class DepartementService {
	
	@Autowired
    private DepartementRepository departementRepository;
	
	public List<Departement> getAllDepartements(){
	return departementRepository.findAll();
	}
	
	public Departement getDepartementById(Long id) {
		return departementRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Département introuvable"));
	}

	
	public Departement createDepartement(Departement departement) {

		return this.departementRepository.save(departement);
	}

	public void deleteDepartement(Long id) {
		Departement departement = departementRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Département non trouvé"));
		departementRepository.delete(departement);
	}

	public Departement updateDepartement(Long id, String nouveauNom) {
        Departement departement = departementRepository.findById(id).orElseThrow(() -> new RuntimeException("Département non trouvé"));
        departement.setNom(nouveauNom);
        return departementRepository.save(departement);
    }

	public List<Enseignant> getEnseignantsByDepartementId(Long departementId) {
        Departement departement = departementRepository.findById(departementId)
                .orElseThrow(() -> new RuntimeException("Département introuvable"));
        return departement.getEnseignants();
    }
	public List<Departement> processUploadedFile(MultipartFile file) throws IOException {
		List<Departement> departements = new ArrayList<>();

		if (file.getOriginalFilename().endsWith(".csv")) {
			departements = processCSV(file);
		} else if (file.getOriginalFilename().endsWith(".xlsx")) {
			departements = processExcel(file);
		}

		return departementRepository.saveAll(departements);
	}

	private List<Departement> processCSV(MultipartFile file) throws IOException {
		List<Departement> departements = new ArrayList<>();
		try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
			String line;
			boolean firstLine = true;
			while ((line = br.readLine()) != null) {
				if (firstLine) {
					firstLine = false;
					continue;
				}
				String[] values = line.split(",");
				Departement departement = new Departement();
				departement.setNom(values[0]);
				departements.add(departement);
			}
		}
		return departements;
	}

	private List<Departement> processExcel(MultipartFile file) throws IOException {
		List<Departement> departements = new ArrayList<>();
		try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {
			Sheet sheet = workbook.getSheetAt(0);
			boolean firstRow = true;
			for (Row row : sheet) {
				if (firstRow) {
					firstRow = false;
					continue;
				}
				Departement departement = new Departement();
				departement.setNom(getCellValueAsString(row.getCell(0)));
				departements.add(departement);
			}
		}
		return departements;
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
}
