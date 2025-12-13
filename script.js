// ========================================
// THEME SWITCHER (Clean + Sync)
// ========================================
document.addEventListener("DOMContentLoaded", () => {
    const html = document.documentElement;
    const themeToggle = document.getElementById("themeToggle");

    // Load theme from localStorage
    try {
        const saved = localStorage.getItem("theme");
        if (saved === "dark") {
            html.classList.add("dark-theme");
        }
    } catch (e) { }

    // Set initial toggle button icon
    if (themeToggle) {
        themeToggle.textContent = html.classList.contains("dark-theme") ? "☀️" : "🌙";
    }

    // Toggle theme on click
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const isDark = html.classList.toggle("dark-theme");
            try {
                localStorage.setItem("theme", isDark ? "dark" : "light");
            } catch (e) { }
            themeToggle.textContent = isDark ? "☀️" : "🌙";
        });
    }

    // Sync theme between multiple tabs
    window.addEventListener("storage", (event) => {
        if (event.key === "theme") {
            const newTheme = event.newValue;
            if (newTheme === "dark") {
                html.classList.add("dark-theme");
            } else {
                html.classList.remove("dark-theme");
            }
            // Update button icon in other tabs
            if (themeToggle) {
                themeToggle.textContent = newTheme === "dark" ? "☀️" : "🌙";
            }
        }
    });
});

// ========================================
// DATE AND TIME DISPLAY
// ========================================
function updateDateTime() {
    const datetimeElement = document.getElementById('datetime');
    if (datetimeElement) {
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        datetimeElement.textContent = now.toLocaleDateString('en-US', options);
    }
}

// Initialize date/time if element exists
document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('datetime')) {
        updateDateTime();
        setInterval(updateDateTime, 1000);
    }
});

// ========================================
// FORM VALIDATION AND SUBMISSION
// ========================================
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            let isValid = true;
            const formGroups = contactForm.querySelectorAll('.form-group');

            // Validate all fields
            formGroups.forEach(group => {
                const input = group.querySelector('input, textarea');
                group.classList.remove('error');

                if (!input.value.trim()) {
                    group.classList.add('error');
                    isValid = false;
                }

                if (input.type === 'email' && input.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        group.classList.add('error');
                        isValid = false;
                    }
                }
            });

            if (isValid) {
                // Get form data
                const formData = new FormData(contactForm);

                try {
                    // Submit to Formspree
                    const response = await fetch(contactForm.action, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });

                    if (response.ok) {
                        alert('Thank you for your message! I will get back to you soon at mmik70999@gmail.com');
                        contactForm.reset();
                    } else {
                        alert('Oops! There was a problem sending your message. Please try again or email me directly at mmik70999@gmail.com');
                    }
                } catch (error) {
                    alert('There was an error sending your message. Please email me directly at mmik70999@gmail.com');
                }
            }
        });
    }
});

// ========================================
// SMOOTH ANIMATIONS FOR FEATURE CARDS
// ========================================
document.addEventListener('DOMContentLoaded', function () {
    const featureCards = document.querySelectorAll('.feature-card');
    if (featureCards.length > 0) {
        featureCards.forEach((card, index) => {
            card.style.animation = `fadeInUp 0.6s ease ${index * 0.2}s both`;
        });
    }
});

// ========================================
// PROJECT FILTER FUNCTIONALITY
// ========================================
document.addEventListener('DOMContentLoaded', function () {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;

                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Filter project cards
                projectCards.forEach(card => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
});

// ========================================
// MOBILE NAVIGATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");
        });

        // Close menu when a link is clicked
        document.querySelectorAll(".nav-links a").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navLinks.classList.remove("active");
        }));
    }
});