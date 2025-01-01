# 📝 Système de Gestion des Examens

Une application web complète pour la gestion des examens utilisant **Vite.js (React)** pour le frontend et **Spring Boot** pour le backend.

---

## 🚀 Technologies Utilisées

### Backend
- ☕ **Java JDK 17**
- 🖥️ **Spring Boot 3.x**
- 🗄️ **MySQL 8.0**
- ⚙️ **Maven**

### Frontend
- ⚡ **Vite.js + React**
- 🎨 **Material Tailwind**
- 🛠️ **Heroicons**
- 🔀 **React Router DOM**

---

## ⚙️ Installation et Configuration

### 🔧 Configuration du Backend

1. Cloner le repository et naviguer vers le dossier backend :
   ```bash
   git clone [url-du-repo]
   cd [nom-du-projet]/backend
   
2. Créer une base de données MySQL nommée gestion_examens_db.
3. Copy code
   ```bash
   mvn clean install
   mvn spring-boot:run
   
### 🔧 Configuration du Frontend

1. Naviguer vers le dossier frontend :

   ```bash
   Copy code
   cd ../frontend
   Installer les dépendances :

   ```bash
   Copy code
   npm install
   Lancer l'application :
   
   ```bash
   Copy code
   npm run dev
   L'application sera accessible sur http://localhost:5173.

🏗️ Structure du Projet
📂 Backend
plaintext
Copy code
src/
├── main/
│   ├── java/
│   │   └── com/gestionexamens/
│   │       ├── controllers/    # REST Controllers
│   │       ├── models/         # Entités JPA
│   │       ├── repositories/   # Repositories Spring Data
│   │       ├── services/       # Logique métier
│   │       └── GestionExamensApplication.java
│   └── resources/
│       └── application.properties

🌟 Fonctionnalités
📅 Gestion des Sessions
Création et modification des sessions d'examens.
Configuration des périodes d'examens.
Planification temporelle.
📝 Gestion des Examens
Planification des examens.
Attribution des salles.
Gestion des surveillances.
👩‍🏫 Gestion des Enseignants
Gestion des disponibilités.
Attribution des surveillances.
Suivi des charges.
🏢 Gestion des Locaux
Gestion des capacités.
Vérification des disponibilités.
Attribution optimisée.
📊 API Endpoints
📁 Sessions
bash
Copy code
GET    /api/sessions
POST   /api/sessions
PUT    /api/sessions/{id}
DELETE /api/sessions/{id}
📁 Examens
bash
Copy code
GET    /api/examens
POST   /api/examens
PUT    /api/examens/{id}
DELETE /api/examens/{id}
📁 Enseignants
bash
Copy code
GET    /api/enseignants
POST   /api/enseignants
PUT    /api/enseignants/{id}
DELETE /api/enseignants/{id}
📁 Locaux
bash
Copy code
GET    /api/locaux
GET    /api/locaux/available
POST   /api/locaux
PUT    /api/locaux/{id}
DELETE /api/locaux/{id}
🚢 Déploiement

🛠️ Dépannage
❌ Problèmes Courants
Erreur de connexion à la base de données :

Vérifier que MySQL est en cours d'exécution.
Vérifier les identifiants dans application.properties.
Vérifier que la base de données existe.
Erreur de port déjà utilisé :

Vérifier qu'aucune autre application n'utilise les ports 8080 (backend) et 5173 (frontend).
Modifier le port dans application.properties si nécessaire.
Erreurs de compilation frontend :

Vérifier que Node.js est installé correctement.
Supprimer le dossier node_modules et réinstaller avec npm install.
Vérifier la version de Node.js (16.x ou supérieur recommandé).
