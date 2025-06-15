document.addEventListener('DOMContentLoaded', () => {

    // --- GSAP & ScrollTrigger Registration ---
    gsap.registerPlugin(ScrollTrigger);
    
    // --- Service Data (Easy to update!) ---
    const servicesData = [
        {
            title: "Real-Time GPS Tracking",
            icon: "img/icon-gps.svg",
            description: "Pinpoint your vehicle's exact location 24/7 from any device. Set geofences and receive alerts when your car enters or leaves a designated area. Essential for theft recovery and fleet management."
        },
        {
            title: "Advanced Alarm Systems",
            icon: "img/icon-alarm.svg",
            description: "Go beyond the standard car alarm. Our systems include shock sensors, motion detectors, and glass-break sensors, all connected to a powerful siren and instant mobile notifications."
        },
        {
            title: "HD Dash & Cabin Cameras",
            icon: "img/icon-camera.svg",
            description: "Record everything happening on the road and inside your vehicle. Crystal clear footage provides indisputable evidence for insurance claims, disputes, and security incidents."
        },
        {
            title: "Blind Spot Detection",
            icon: "img/icon-blindspot.svg",
            description: "Enhance your driving safety with ultrasonic sensors that monitor your blind spots. Receive visual and audible alerts when another vehicle is present, preventing dangerous lane changes."
        },
        {
            title: "Remote Engine Kill Switch",
            icon: "img/icon-gps.svg", // Re-using icon for concept
            description: "In the event of a theft, safely and remotely disable your vehicle's engine from your smartphone, bringing it to a halt and preventing the thief from getting away."
        },
        {
            title: "Anti-Distraction Alerts",
            icon: "img/icon-camera.svg", // Re-using icon for concept
            description: "Using an interior-facing AI camera, our system can detect signs of driver fatigue or phone usage, issuing an alert to help prevent accidents before they happen."
        }
    ];

    const servicesGrid = document.getElementById('services-grid');

    // --- Dynamically Render Services ---
    const renderServices = () => {
        servicesData.forEach(service => {
            // We use fetch to get the SVG content
            fetch(service.icon)
                .then(response => response.text())
                .then(svgData => {
                    const card = document.createElement('div');
                    card.className = 'service-card';
                    card.innerHTML = `
                        <div class="service-card-header">
                            <div class="service-card-icon">${svgData}</div>
                            <h3 class="service-card-title">${service.title}</h3>
                        </div>
                        <div class="service-card-body">
                            <p>${service.description}</p>
                        </div>
                    `;
                    servicesGrid.appendChild(card);
                })
                .catch(error => console.error('Error fetching icon:', error));
        });
    };

    renderServices();

    // --- Animate Service Cards on Scroll ---
    // We need to wait for the cards to be created before animating them
    setTimeout(() => {
        gsap.from(".service-card", {
            scrollTrigger: {
                trigger: ".services-grid",
                start: "top 80%",
            },
            duration: 0.8,
            opacity: 0,
            y: 50,
            stagger: 0.2,
            ease: "power2.out"
        });
    }, 500); // A short delay to ensure SVGs are loaded

    // --- Comment Section Logic ---
    const commentForm = document.getElementById('comment-form');
    const commentList = document.getElementById('comments-list');
    const nameInput = document.getElementById('comment-name');
    const textInput = document.getElementById('comment-text');

    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = nameInput.value.trim();
        const text = textInput.value.trim();

        if (name && text) {
            const newComment = document.createElement('div');
            newComment.className = 'comment';
            newComment.innerHTML = `
                <p class="comment-author"><strong>${name}</strong></p>
                <p class="comment-text">${text}</p>
            `;

            // Add the new comment to the top of the list
            commentList.prepend(newComment);

            // Animate the new comment
            gsap.from(newComment, { duration: 0.5, opacity: 0, y: -20, ease: 'power2.out' });

            // Reset form
            nameInput.value = '';
            textInput.value = '';
        }
    });
});
