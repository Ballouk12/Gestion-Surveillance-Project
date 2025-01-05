# 📝 Système de Gestion de Surveillence

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
2.
   ```bash
   Copy code
   npm install
   Lancer l'application :
3.
   ```bash
   Copy code
   npm run dev
   L'application sera accessible sur http://localhost:5173.

### Fonctionnalités
- 📅 Gestion des Sessions
- Création et modification des sessions d'examens.
- Configuration des périodes d'examens.
- Planification temporelle.
- 📝 Gestion des Examens
- Planification des examens.
- Attribution des salles.
- Gestion des surveillances.
- 👩‍🏫 Gestion des Enseignants
- Gestion des disponibilités.
- Attribution des surveillances.
- Suivi des charges.
- 🏢 Gestion des Locaux
- Gestion des capacités.
- Vérification des disponibilités.
- Attribution optimisée.
### Securite

. **JWT** :
   - Ajouté dans la section des technologies backend et détaillé sous "Sécurité et Authentification".
2. **BCrypt** :
   - Mentionné comme algorithme de hashage dans la section backend et détaillé dans la gestion des mots de passe.

### Dépannage

#### Problèmes Courants

##### Erreur de connexion à la base de données :

- Vérifier que MySQL est en cours d'exécution.
- Vérifier les identifiants dans application.properties.- 
- Vérifier que la base de données existe.
- Erreur de port déjà utilisé :

- Vérifier qu'aucune autre application n'utilise les ports 8080 (backend) et 5173 (frontend).
- Modifier le port dans application.properties si nécessaire.
##### Erreurs de compilation frontend :

- Vérifier que Node.js est installé correctement.
- Supprimer le dossier node_modules et réinstaller avec npm install.
- Vérifier la version de Node.js (16.x ou supérieur recommandé).
