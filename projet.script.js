const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("open");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
        });
    });
}

const revealItems = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.18 });

    revealItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 120}ms`;
        revealObserver.observe(item);
    });
} else {
    revealItems.forEach(item => item.classList.add("is-visible"));
}

const form = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");

if (form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const nom = document.getElementById("nom");
        const email = document.getElementById("email");
        const sujet = document.getElementById("sujet");
        const message = document.getElementById("message");

        const nomError = document.getElementById("nomError");
        const emailError = document.getElementById("emailError");
        const sujetError = document.getElementById("sujetError");
        const messageError = document.getElementById("messageError");

        let valid = true;

        nomError.textContent = "";
        emailError.textContent = "";
        sujetError.textContent = "";
        messageError.textContent = "";

        if (!nom.value.trim()) {
            nomError.textContent = "Veuillez saisir votre nom.";
            valid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !emailPattern.test(email.value)) {
            emailError.textContent = "Veuillez saisir un email valide.";
            valid = false;
        }

        if (!sujet.value.trim()) {
            sujetError.textContent = "Veuillez saisir un sujet.";
            valid = false;
        }

        if (!message.value.trim()) {
            messageError.textContent = "Veuillez saisir votre message.";
            valid = false;
        }

        if (valid) {
            form.submit();
            if (successMessage) {
                successMessage.classList.add("visible");
            }
        }
    });
}