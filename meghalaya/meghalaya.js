// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-out-quad',
    once: true
});

document.addEventListener('DOMContentLoaded', () => {
    // Fetch JSON Data
    fetch('meghalaya.json')
        .then(response => response.json())
        .then(data => {
            const state = data.state;

            // Header Animations
            gsap.from('header h1', { x: -100, opacity: 0, duration: 1, ease: 'power2.out' });
            gsap.from('header p', { x: 100, opacity: 0, duration: 1, delay: 0.2, ease: 'power2.out' });

            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('nav-menu');
            if (hamburger && navMenu) {
                hamburger.addEventListener('click', () => {
                    const isActive = hamburger.classList.toggle('active');
                    navMenu.classList.toggle('active');
                    if (isActive) {
                        gsap.fromTo('.nav-menu ul li', 
                            { y: -20, opacity: 0 },
                            { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
                        );
                    } else {
                        gsap.to('.nav-menu ul li', {
                            y: -20,
                            opacity: 0,
                            duration: 0.3,
                            stagger: 0.05,
                            ease: 'power2.in',
                            onComplete: () => navMenu.classList.remove('active')
                        });
                    }
                });
            } else {
                console.error('Hamburger or NavMenu element not found');
            }

            // Populate Top Destinations
            const topDestinations = document.getElementById('top-destinations');
            const popupOverlay = document.getElementById('destination-popup');
            const popupContent = document.querySelector('#destination-popup .popup-content');
            const popupClose = document.getElementById('popup-close');
            const popupImage = document.getElementById('popup-image');
            const popupTitle = document.getElementById('popup-title');
            const popupDescription = document.getElementById('popup-description');
            const popupBestTime = document.getElementById('popup-best-time');
            const popupTravelTips = document.getElementById('popup-travel-tips');
            const popupEntryFee = document.getElementById('popup-entry-fee');

            state.top_destinations.forEach((dest, index) => {
                const card = document.createElement('div');
                card.className = 'bg-white rounded-lg overflow-hidden';
                card.setAttribute('data-aos', 'fade-up');
                card.setAttribute('data-aos-delay', `${index * 100}`);
                card.innerHTML = `
                    <div class="card-image-container">
                        <img src="../${dest.image}" alt="${dest.name}" class="w-full h-64 object-cover sepia-filter" onerror="this.src='../assets/placeholder.jpg';">
                    </div>
                    <div class="p-4">
                        <h4 class="text-xl font-semibold text-[#2E5B34]">${dest.name}</h4>
                        <p class="text-gray-700 mt-2">${dest.description}</p>
                        <button class="hvr-grow bg-[#D4A017] text-white px-4 py-2 rounded-full inline-block mt-4 read-more-btn" data-dest-id="${index}">Read More</button>
                    </div>
                `;
                topDestinations.appendChild(card);
            });

            // Popup Functionality for Read More Buttons
            const readMoreButtons = document.querySelectorAll('.read-more-btn');
            readMoreButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const destId = button.getAttribute('data-dest-id');
                    const destination = state.top_destinations[destId];

                    popupImage.src = `../${destination.image}` || '../assets/placeholder.jpg';
                    popupTitle.textContent = destination.name;
                    popupDescription.textContent = destination.description || 'No detailed description available.';
                    popupBestTime.textContent = `Best Time to Visit: ${destination.best_time || 'Not specified'}`;
                    popupTravelTips.textContent = `Travel Tips: ${destination.travel_tips || 'No specific tips available'}`;
                    popupEntryFee.textContent = `Entry Fee: ${destination.entry_fee || 'Not applicable'}`;

                    popupOverlay.style.display = 'flex';
                    popupContent.classList.add('open');
                    gsap.fromTo(popupContent, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' });
                });
            });

            popupClose.addEventListener('click', () => {
                popupContent.classList.add('close');
                gsap.to(popupContent, {
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.in',
                    onComplete: () => {
                        popupContent.classList.remove('open', 'close');
                        popupOverlay.style.display = 'none';
                    }
                });
            });

            popupOverlay.addEventListener('click', (e) => {
                if (e.target === popupOverlay) {
                    popupContent.classList.add('close');
                    gsap.to(popupContent, {
                        opacity: 0,
                        duration: 0.5,
                        ease: 'power2.in',
                        onComplete: () => {
                            popupContent.classList.remove('open', 'close');
                            popupOverlay.style.display = 'none';
                        }
                    });
                }
            });

            // Populate Accommodation
            const accommodation = document.getElementById('accommodation');
            state.accommodation.forEach((hotel, index) => {
                const card = document.createElement('div');
                card.className = `hotel-card bg-[#2E5B34] text-white p-4 rounded-lg ${hotel.category.toLowerCase()}`;
                card.setAttribute('data-aos', 'fade-up');
                card.setAttribute('data-aos-delay', `${index * 100}`);
                card.innerHTML = `
                    <h4 class="text-lg font-semibold">${hotel.name}</h4>
                    <p class="text-sm">${hotel.description}</p>
                    <p class="text-sm mt-2">${hotel.price_range}</p>
                    <a href="${hotel.book_link}" class="text-[#D4A017] underline">Book Now</a>
                `;
                accommodation.appendChild(card);
            });

            // Populate Culinary Delights
            const culinaryDelights = document.getElementById('culinary-delights');
            state.culinary_delights.forEach((restaurant, index) => {
                const card = document.createElement('div');
                card.className = 'bg-[#2E5B34] text-white p-4 rounded-lg';
                card.setAttribute('data-aos', 'fade-up');
                card.setAttribute('data-aos-delay', `${index * 100}`);
                card.innerHTML = `
                    <h4 class="text-lg font-semibold">${restaurant.name}</h4>
                    <p class="text-sm">${restaurant.cuisine} - ${restaurant.cost}</p>
                    <p class="text-sm mt-2">${restaurant.description}</p>
                `;
                culinaryDelights.appendChild(card);
            });

            // Populate Must-Visit Spots
            const mustVisitSpots = document.getElementById('must-visit-spots');
            state.must_visit_spots.forEach((spot, index) => {
                const card = document.createElement('div');
                card.className = 'bg-[#2E5B34] text-white p-4 rounded-lg';
                card.setAttribute('data-aos', 'fade-up');
                card.setAttribute('data-aos-delay', `${index * 100}`);
                card.innerHTML = `
                    <h4 class="text-lg font-semibold">${spot.name}</h4>
                    <p class="text-sm">${spot.description}</p>
                    <p class="text-xs italic mt-2">${spot.tip}</p>
                `;
                mustVisitSpots.appendChild(card);
            });

            // Populate Travel Essentials
            const travelEssentials = document.getElementById('travel-essentials');
            travelEssentials.innerHTML = `
                <p><strong>How to Reach:</strong> ${state.travel_essentials.how_to_reach}</p>
                <p><strong>Best Time to Visit:</strong> ${state.travel_essentials.best_time}</p>
                <p><strong>Local Transport:</strong> ${state.travel_essentials.local_transport}</p>
                <p><strong>Travel Tips:</strong> ${state.travel_essentials.tips}</p>
                <p><strong>Nearby Destinations:</strong> ${state.travel_essentials.nearby_destinations}</p>
            `;
        })
        .catch(error => console.error('Error fetching Meghalaya data:', error));
});