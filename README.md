# 🎓 Excellence Training ETIC - Site Web de Formation

Site web professionnel pour la formation "Développeur Web en 2 semaines" avec système d'inscription automatisé.

## 📁 Structure du Projet

\`\`\`
excellence-training-etic/
├── server.js                 # Serveur backend Express
├── package.json              # Dépendances Node.js
├── .env                      # Variables d'environnement
├── README.md                 # Documentation
└── public/                   # Fichiers frontend
    ├── index.html            # Page principale
    ├── css/
    │   └── styles.css        # Styles CSS
    └── js/
        └── script.js         # JavaScript frontend
\`\`\`

## 🚀 Installation et Configuration

### 1. Installation des dépendances
\`\`\`bash
npm install
\`\`\`

### 2. Configuration Gmail pour les emails
1. Connectez-vous à votre compte Gmail
2. Allez dans "Gérer votre compte Google"
3. Sécurité → Authentification à 2 facteurs (activez-la)
4. Sécurité → Mots de passe des applications
5. Générez un mot de passe pour "Mail"
6. Copiez ce mot de passe dans le fichier `.env`

### 3. Configuration du fichier .env
\`\`\`env
EMAIL_USER=tizieeliemalachie@gmail.com
EMAIL_PASS=votre_mot_de_passe_application_gmail_ici
PORT=3000
\`\`\`

### 4. Démarrage du serveur
\`\`\`bash
# Mode développement (avec rechargement automatique)
npm run dev

# Mode production
npm start
\`\`\`

Le site sera accessible sur : `http://localhost:3000`

## 📧 Fonctionnalités Email

✅ **Notification automatique** à l'administrateur lors d'une inscription
✅ **Email de confirmation** envoyé au candidat
✅ **Design HTML professionnel** pour les emails
✅ **Toutes les informations** du formulaire incluses
✅ **Liens directs** pour contacter le candidat

## 🎯 Informations de Formation

- **Dates** : 
  - 1ère semaine : Lundi 30 juin - Jeudi 3 juillet
  - 2ème semaine : Lundi 7 juillet - Vendredi 11 juillet
- **Horaires** : 9h30 à 13h (4h/jour)
- **Lieu** : Institut Supérieur Saint Cyrile, Abidjan Abobo N'dotre
- **Prix** : 20.000 FCFA (paiement en 2 tranches possible)
- **Matériel requis** : Clé USB 64GB minimum

## 📱 Contact

- **WhatsApp** : +225 0778626777
- **Email** : tizieeliemalachie@gmail.com
- **Lieu** : Abidjan Abobo N'dotre, Institut Supérieur Saint Cyrile

## 🔧 Technologies Utilisées

- **Frontend** : HTML5, CSS3, JavaScript (Vanilla)
- **Backend** : Node.js, Express.js
- **Email** : Nodemailer avec Gmail
- **Responsive** : Design adaptatif mobile-first

## 📊 Fonctionnalités du Site

✅ **Design responsive** pour tous les appareils
✅ **Formulaire d'inscription** avec validation
✅ **Bouton WhatsApp** intégré
✅ **Animations** et effets visuels
✅ **Modal de confirmation**
✅ **Navigation fluide**
✅ **Backend automatisé**

## 🚀 Déploiement

Pour déployer sur un serveur :

1. Uploadez tous les fichiers sur votre serveur
2. Installez Node.js sur le serveur
3. Exécutez `npm install`
4. Configurez les variables d'environnement
5. Démarrez avec `npm start`

## 🔒 Sécurité

- Variables d'environnement pour les données sensibles
- Validation côté client et serveur
- Protection contre les injections
- CORS configuré

## 📞 Support

Pour toute question ou assistance :
- Email : tizieeliemalachie@gmail.com
- WhatsApp : +225 0778626777

---

© 2024 Excellence Training ETIC - Tous droits réservés
