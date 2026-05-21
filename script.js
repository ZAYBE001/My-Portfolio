// script.js

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".project-card");

    cards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            
            // Calculate mouse position relative to card center
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Define tilt intensity (higher number = more rotation)
            const rotateX = -(y / rect.height) * 25; 
            const rotateY = (x / rect.width) * 25;

            // Apply 3D rotation dynamically
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        // Reset the card position instantly when mouse leaves
        card.addEventListener("mouseleave", () => {
            card.style.transform = "rotateX(0deg) rotateY(0deg)";
        });
    });
});
// Scroll Animation using Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-12");
        }
    });
}, { threshold: 0.1 });

// Select all main sections to animate
document.querySelectorAll("section").forEach((section) => {
    // Hide initially via Tailwind classes
    section.classList.add("transform", "transition", "duration-1000", "opacity-0", "translate-y-12");
    observer.observe(section);
});

// script.js

document.addEventListener("DOMContentLoaded", () => {
    const skillsHeading = document.getElementById("skills-heading");
    const skillCards = document.querySelectorAll(".reveal-on-scroll");

    const observerOptions = {
        root: null,
        threshold: 0.2, // Triggers when 20% of the section is visible
    };

    const skillsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // 1. Slide the heading up through the mask
                skillsHeading.classList.add("reveal-text");

                // 2. Cascade in the cards with their inline delays
                skillCards.forEach((card) => {
                    card.classList.add("reveal-card");
                });

                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Start observing the whole skills section
    const skillsSection = document.getElementById("skills");
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
});
const form = document.getElementById('contact-form');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    // Visual feedback for the user
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.innerHTML = "Sending...";
    submitBtn.disabled = true;

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                submitBtn.innerHTML = "Message Sent! 🎉";
                form.reset();
            } else {
                console.log(response);
                submitBtn.innerHTML = "Something went wrong";
            }
        })
        .catch(error => {
            console.log(error);
            submitBtn.innerHTML = "Error occurred";
        })
        .then(function() {
            // Reset button text after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = "Send Message";
                submitBtn.disabled = false;
            }, 3000);
        });
});