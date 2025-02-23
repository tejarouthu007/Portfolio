document.addEventListener("DOMContentLoaded", function () {
    // Intersection Observer for animations
    const sections = document.querySelectorAll(".hidden");

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 } // Trigger when 20% of the section is visible
    );

    sections.forEach(section => observer.observe(section));

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                const headerHeight = document.querySelector("header")?.offsetHeight || 0;
                
                window.scrollTo({
                    top: target.offsetTop - headerHeight,
                    behavior: "smooth"
                });
            }
        });
    });

    // Dark/Light Mode Toggle
    const toggleBtn = document.querySelector("header button");
    const icon = toggleBtn?.querySelector("i");
    const body = document.body;

    if (toggleBtn && icon) {
        // Check local storage for mode
        if (localStorage.getItem("theme") === "light") {
            body.classList.add("light-mode");
            icon.classList.replace("fa-moon", "fa-sun");
        }

        toggleBtn.addEventListener("click", () => {
            body.classList.toggle("light-mode");

            if (body.classList.contains("light-mode")) {
                localStorage.setItem("theme", "light");
                icon.classList.replace("fa-moon", "fa-sun");
            } else {
                localStorage.setItem("theme", "dark");
                icon.classList.replace("fa-sun", "fa-moon");
            }
        });
    }
});
