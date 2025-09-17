document.addEventListener('DOMContentLoaded', () => {

    // --- GSAP & ScrollTrigger Registration ---
    gsap.registerPlugin(ScrollTrigger);

    // --- tsParticles Initialization ---
    tsParticles.load("particles-js", {
        fpsLimit: 60,
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#00d1ff" },
            shape: { type: "circle" },
            opacity: {
                value: 0.5,
                random: true,
                anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false },
            },
            size: {
                value: 3,
                random: true,
                anim: { enable: false },
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#00d1ff",
                opacity: 0.4,
                width: 1,
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
            },
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "grab" },
                onclick: { enable: true, mode: "push" },
                resize: true,
            },
            modes: {
                grab: { distance: 140, line_opacity: 1 },
                push: { particles_nb: 4 },
            },
        },
        retina_detect: true,
    });


    // --- Hero Section Animation ---
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTl.from('.main-header', { y: -100, duration: 1, opacity: 0 })
          .from('.hero-title', { y: 50, duration: 1, opacity: 0 }, '-=0.5')
          .from('.hero-subtitle', { y: 50, duration: 0.8, opacity: 0 }, '-=0.7')
          .from('.btn-primary', { y: 50, duration: 0.8, opacity: 0, scale: 0.8 }, '-=0.6');


    // --- Scroll-triggered Animations ---
    gsap.utils.toArray('.anim-on-scroll').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power2.out',
        });
    });

    // --- Form Submission Feedback ---
    const form = document.getElementById('estimate-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.textContent = 'Quote Sent!';
        submitButton.style.backgroundColor = '#0b2d39';
        submitButton.style.color = '#00d1ff';
        
        setTimeout(() => {
            form.reset();
            submitButton.textContent = 'Request My Quote';
            submitButton.style.backgroundColor = '';
            submitButton.style.color = '';
        }, 3000);
    });

});
