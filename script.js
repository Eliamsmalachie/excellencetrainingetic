// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Form submission handling
document.getElementById("inscriptionForm").addEventListener("submit", async function (e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(this)
  const data = Object.fromEntries(formData)

  // Basic validation
  if (!data.nom || !data.prenom || !data.email || !data.telephone) {
    alert("Veuillez remplir tous les champs obligatoires.")
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    alert("Veuillez entrer une adresse email valide.")
    return
  }

  // Phone validation (corrected regex)
  const phoneRegex = /^[+]?[0-9\s\-()]{8,}$/
  if (!phoneRegex.test(data.telephone)) {
    alert("Veuillez entrer un numéro de téléphone valide.")
    return
  }

  // Check if conditions are accepted
  if (!data.conditions) {
    alert("Vous devez accepter les conditions générales.")
    return
  }

  // Check USB confirmation
  if (!data["usb-confirm"]) {
    alert("Vous devez confirmer avoir une clé USB de 64 GB minimum.")
    return
  }

  // Submit to backend
  const submitButton = document.querySelector(".submit-button")
  const originalText = submitButton.innerHTML

  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...'
  submitButton.disabled = true

  try {
    const response = await fetch("/api/inscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      // Reset form
      this.reset()

      // Show success modal
      document.getElementById("successModal").style.display = "block"
    } else {
      throw new Error("Erreur lors de l'envoi")
    }
  } catch (error) {
    console.error("Erreur:", error)
    alert("Une erreur s'est produite lors de l'envoi. Veuillez réessayer ou nous contacter directement.")
  } finally {
    // Reset button
    submitButton.innerHTML = originalText
    submitButton.disabled = false
  }
})

// WhatsApp button functionality
document.getElementById("whatsappBtn").addEventListener("click", () => {
  const phoneNumber = "+2250778626777"
  const message = encodeURIComponent(
    "Bonjour, je suis intéressé(e) par la formation \"Développeur Web en 2 semaines\" d'Excellence Training ETIC. Pouvez-vous me donner plus d'informations ?",
  )
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
  window.open(whatsappUrl, "_blank")
})

// Modal functionality
document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("successModal").style.display = "none"
})

// Close modal when clicking outside
window.addEventListener("click", (event) => {
  const modal = document.getElementById("successModal")
  if (event.target === modal) {
    modal.style.display = "none"
  }
})

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.background = "rgba(30, 86, 49, 0.95)"
    header.style.backdropFilter = "blur(10px)"
  } else {
    header.style.background = "linear-gradient(135deg, #1e5631, #2d7a3e)"
    header.style.backdropFilter = "none"
  }
})

// Form field animations
document.querySelectorAll(".form-group input, .form-group select, .form-group textarea").forEach((field) => {
  field.addEventListener("focus", function () {
    this.parentElement.classList.add("focused")
  })

  field.addEventListener("blur", function () {
    if (!this.value) {
      this.parentElement.classList.remove("focused")
    }
  })
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in")
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".detail-card, .programme-item").forEach((el) => {
  observer.observe(el)
})

// Add CSS for animations
const style = document.createElement("style")
style.textContent = `
    .detail-card, .programme-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .detail-card.animate-in, .programme-item.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .form-group.focused label {
        color: #2d7a3e;
        transform: translateY(-2px);
    }
`
document.head.appendChild(style)
