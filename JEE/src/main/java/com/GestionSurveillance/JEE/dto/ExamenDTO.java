package com.GestionSurveillance.JEE.dto;

import java.util.Date;
import java.util.List;

public class ExamenDTO {
    private String module;
    private int nbEtudiants;
    private long sessionId;
    private long enseignantId;
    private List<Integer> locauxIds;
    private Date date;
    private String debut;
    private String fin;


    public void setSessionId(long sessionId) {
        this.sessionId = sessionId;
    }

    public void setEnseignantId(long enseignantId) {
        this.enseignantId = enseignantId;
    }

    public long getSessionId() {
        return sessionId;
    }

    public long getEnseignantId() {
        return enseignantId;
    }


    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getDebut() {
        return debut;
    }

    public void setDebut(String debut) {
        this.debut = debut;
    }

    public String getFin() {
        return fin;
    }

    public void setFin(String fin) {
        this.fin = fin;
    }

    public String getModule() {
        return module;
    }

    public void setModule(String module) {
        this.module = module;
    }

    public int getNbEtudiants() {
        return nbEtudiants;
    }

    public void setNbEtudiants(int nbEtudiants) {
        this.nbEtudiants = nbEtudiants;
    }

    public List<Integer> getLocauxIds() {
        return locauxIds;
    }

    public void setLocauxIds(List<Integer> locauxIds) {
        this.locauxIds = locauxIds;
    }
}
