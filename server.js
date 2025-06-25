const express = require("express")
const nodemailer = require("nodemailer")
const cors = require("cors")
const path = require("path")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))

// Configuration de l'email
const transporter = nodemailer.createTransporter({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "tizieeliemalachie@gmail.com",
    pass: process.env.EMAIL_PASS, // Mot de passe d'application Gmail
  },
})

// Route pour servir le site
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

// Route pour les inscriptions
app.post("/api/inscription", async (req, res) => {
  try {
    const {
      nom,
      prenom,
      email,
      telephone,
      niveau,
      paiement,
      motivation,
      conditions,
      "usb-confirm": usbConfirm,
    } = req.body

    // Validation des données
    if (!nom || !prenom || !email || !telephone) {
      return res.status(400).json({
        success: false,
        message: "Tous les champs obligatoires doivent être remplis",
      })
    }

    // Créer le contenu de l'email
    const emailContent = `
      <h2>🎓 Nouvelle Inscription - Excellence Training ETIC</h2>
      
      <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
        <h3 style="color: #1e5631;">Informations du candidat :</h3>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 10px; font-weight: bold; color: #2d7a3e;">Nom :</td>
            <td style="padding: 10px;">${nom}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 10px; font-weight: bold; color: #2d7a3e;">Prénom :</td>
            <td style="padding: 10px;">${prenom}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 10px; font-weight: bold; color: #2d7a3e;">Email :</td>
            <td style="padding: 10px;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 10px; font-weight: bold; color: #2d7a3e;">Téléphone :</td>
            <td style="padding: 10px;"><a href="tel:${telephone}">${telephone}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 10px; font-weight: bold; color: #2d7a3e;">Niveau :</td>
            <td style="padding: 10px;">${niveau || "Non spécifié"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 10px; font-weight: bold; color: #2d7a3e;">Mode de paiement :</td>
            <td style="padding: 10px;">${paiement || "Non spécifié"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 10px; font-weight: bold; color: #2d7a3e;">Clé USB 64GB :</td>
            <td style="padding: 10px;">${usbConfirm ? "✅ Confirmé" : "❌ Non confirmé"}</td>
          </tr>
        </table>
      </div>

      ${
        motivation
          ? `
        <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h4 style="color: #1e5631;">💭 Motivation :</h4>
          <p style="font-style: italic;">"${motivation}"</p>
        </div>
      `
          : ""
      }

      <div style="background: #1e5631; color: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <h4>📅 Rappel des dates de formation :</h4>
        <p><strong>1ère semaine :</strong> Lundi 30 juin - Jeudi 3 juillet</p>
        <p><strong>2ème semaine :</strong> Lundi 7 juillet - Vendredi 11 juillet</p>
        <p><strong>Horaires :</strong> 9h30 à 13h (4h/jour)</p>
        <p><strong>Lieu :</strong> Abidjan Abobo N'dotre, Institut Supérieur Saint Cyrile</p>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <p style="color: #666;">📧 Email reçu le ${new Date().toLocaleString("fr-FR")}</p>
      </div>
    `

    // Options de l'email
    const mailOptions = {
      from: process.env.EMAIL_USER || "tizieeliemalachie@gmail.com",
      to: "tizieeliemalachie@gmail.com",
      subject: `🎓 Nouvelle inscription - ${prenom} ${nom}`,
      html: emailContent,
      replyTo: email,
    }

    // Envoyer l'email
    await transporter.sendMail(mailOptions)

    // Email de confirmation au candidat
    const confirmationEmail = {
      from: process.env.EMAIL_USER || "tizieeliemalachie@gmail.com",
      to: email,
      subject: "✅ Confirmation d'inscription - Excellence Training ETIC",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1e5631, #2d7a3e); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1>🎓 EXCELLENCE TRAINING ETIC</h1>
            <h2>Confirmation d'inscription</h2>
          </div>
          
          <div style="padding: 30px; background: white; border-radius: 0 0 10px 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
            <p>Bonjour <strong>${prenom} ${nom}</strong>,</p>
            
            <p>Nous avons bien reçu votre inscription pour la formation <strong>"Développeur Web en 2 semaines"</strong>.</p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e5631;">📅 Dates de formation :</h3>
              <p><strong>1ère semaine :</strong> Lundi 30 juin - Jeudi 3 juillet</p>
              <p><strong>2ème semaine :</strong> Lundi 7 juillet - Vendredi 11 juillet</p>
              <p><strong>Horaires :</strong> 9h30 à 13h (4h/jour)</p>
            </div>

            <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f39c12;">
              <h4 style="color: #d35400;">⚠️ Important - À ne pas oublier :</h4>
              <p>Apportez une <strong>clé USB de 64 GB minimum</strong> pour sauvegarder vos projets.</p>
            </div>

            <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #1e5631;">📍 Lieu de formation :</h4>
              <p>Institut Supérieur Saint Cyrile<br>
              Abidjan Abobo N'dotre<br>
              Non loin du commissariat du 41ème arrondissement</p>
            </div>

            <p>Notre équipe vous contactera bientôt pour finaliser votre inscription et vous donner plus de détails.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://wa.me/2250778626777" style="background: #25d366; color: white; padding: 12px 25px; text-decoration: none; border-radius: 25px; display: inline-block;">
                💬 Nous contacter sur WhatsApp
              </a>
            </div>

            <p>À bientôt,<br>
            <strong>L'équipe Excellence Training ETIC</strong></p>
          </div>
        </div>
      `,
    }

    await transporter.sendMail(confirmationEmail)

    console.log(`📧 Nouvelle inscription reçue: ${prenom} ${nom} (${email})`)

    res.json({
      success: true,
      message: "Inscription enregistrée avec succès",
    })
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error)
    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de l'inscription",
    })
  }
})

// Route de test
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend fonctionnel !" })
})

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`)
  console.log(`📧 Email configuré pour: ${process.env.EMAIL_USER || "tizieeliemalachie@gmail.com"}`)
})
