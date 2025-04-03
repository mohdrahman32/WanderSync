// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-out-quad',
    once: true
});

// Global variable to store states data
let allStates = [];

// Fetch JSON Data
document.addEventListener('DOMContentLoaded', () => {
    fetch('details.json')
        .then(response => response.json())
        .then(data => {
            allStates = data.states;
            renderStateCards(allStates);
            setupHeaderAnimations();
            setupSearchBar();
        })
        .catch(error => console.error('Error fetching JSON:', error));
});

// Render State Cards
function renderStateCards(states) {
    const stateCardsContainer = document.getElementById('state-cards');
    stateCardsContainer.innerHTML = '';
    states.forEach((state, index) => {
        const card = document.createElement('div');
        card.className = 'state-card bg-[#F5E8C7] rounded-lg overflow-hidden border-2 border-[#2E5B34]';
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', `${index * 100}`);
        card.innerHTML = `
            <div class="state-image-container">
                <img src="${state.state_image}" alt="${state.state}" class="state-image">
            </div>
            <div class="p-4 relative">
                <h3 class="text-xl font-semibold text-[#2E5B34]">${state.state}</h3>
                <p class="text-sm text-gray-700">${getStateTeaser(state.state)}</p>
                <button class="explore-btn bg-[#D4A017] text-white px-4 py-2 rounded-full">Explore Destinations</button>
            </div>
            <div class="dropdown-content" id="dropdown-${state.state.replace(/\s+/g, '-')}"></div>
        `;
        stateCardsContainer.appendChild(card);

        const exploreBtn = card.querySelector('.explore-btn');
        exploreBtn.addEventListener('click', () => toggleDropdown(state, card, exploreBtn));
    });
}

// Get Teaser Description for States
function getStateTeaser(stateName) {
    const teasers = {
        "Andhra Pradesh": "Land of temples and coastal wonders.",
        "Arunachal Pradesh": "Mystical mountains and tribal heritage.",
        "Assam": "Gateway to the Northeast with tea gardens.",
        "Bihar": "Cradle of Buddhism and ancient history.",
        "Chhattisgarh": "Tribal culture and natural splendor.",
        "Goa": "Sun, sand, and Portuguese charm.",
        "Gujarat": "Deserts, lions, and sacred sites.",
        "Haryana": "Historical plains and modern marvels.",
        "Himachal Pradesh": "Snowy peaks and serene valleys.",
        "Jharkhand": "Forests, hills, and spiritual retreats.",
        "Karnataka": "Heritage, hills, and coastal beauty.",
        "Kerala": "God’s Own Country with backwaters.",
        "Madhya Pradesh": "Heart of India with wildlife and temples.",
        "Maharashtra": "Cosmopolitan cities and ancient caves.",
        "Manipur": "Lakes, hills, and vibrant culture.",
        "Meghalaya": "Abode of clouds with living bridges.",
        "Mizoram": "Hilly serenity and tribal traditions.",
        "Nagaland": "Hornbill festivals and rugged beauty.",
        "Odisha": "Temples, beaches, and tribal lands.",
        "Punjab": "Golden fields and Sikh heritage.",
        "Rajasthan": "Royal forts and desert landscapes.",
        "Sikkim": "Himalayan beauty and monasteries.",
        "Tamil Nadu": "Dravidian temples and hill stations.",
        "Telangana": "Historic forts and modern cities.",
        "Tripura": "Palaces, lakes, and lush hills.",
        "Uttar Pradesh": "Land of the Taj and sacred rivers.",
        "Uttarakhand": "Pilgrimage sites and Himalayan trails.",
        "West Bengal": "Bengali culture and Himalayan vistas."
    };
    return teasers[stateName] || "A unique Indian adventure.";
}

// Toggle Dropdown with Tourist Places
function toggleDropdown(state, card, exploreBtn) {
    const dropdown = card.querySelector('.dropdown-content');
    const isOpen = dropdown.style.display === 'block';

    if (isOpen) {
        gsap.to(dropdown, { height: 0, duration: 0.5, ease: 'power2.in', onComplete: () => {
            dropdown.style.display = 'none';
            exploreBtn.style.display = 'block';
            gsap.fromTo(exploreBtn, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
        }});
    } else {
        gsap.to(exploreBtn, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                exploreBtn.style.display = 'none';
                dropdown.innerHTML = `
                    ${state.destinations.map(dest => `
                        <div class="flex justify-between items-center py-2">
                            <span>${dest.name}</span>
                            <button class="bg-[#D4A017] text-white px-3 py-1 rounded-full hvr-buzz explore-place-btn" data-place="${dest.name}" data-state="${state.state}">Explore</button>
                        </div>
                    `).join('')}
                    <button class="collapse-btn mt-4">↑</button>
                `;
                dropdown.style.display = 'block';
                gsap.fromTo(dropdown, { height: 0 }, { height: 'auto', duration: 0.5, ease: 'power2.out' });

                const explorePlaceBtns = dropdown.querySelectorAll('.explore-place-btn');
                explorePlaceBtns.forEach(btn => {
                    btn.addEventListener('click', () => showIndividualDestination(state, btn.dataset.place));
                });

                const collapseBtn = dropdown.querySelector('.collapse-btn');
                collapseBtn.addEventListener('click', () => toggleDropdown(state, card, exploreBtn));
            }
        });
    }
}

// Show Individual Destination with Fade Animation
function showIndividualDestination(state, placeName) {
    const destination = state.destinations.find(dest => dest.name === placeName);
    const destinationsList = document.getElementById('destinations-list');
    const individualDest = document.getElementById('individual-destination');

    gsap.to(destinationsList, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
            destinationsList.style.display = 'none';
            individualDest.style.display = 'block';
            renderIndividualDestination(destination);
            gsap.fromTo(individualDest, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' });
        }
    });

    document.getElementById('back-btn').addEventListener('click', () => {
        gsap.to(individualDest, {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.in',
            onComplete: () => {
                individualDest.style.display = 'none';
                destinationsList.style.display = 'block';
                gsap.fromTo(destinationsList, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' });
            }
        });
    });
}

// Render Individual Destination Content
function renderIndividualDestination(dest) {
    document.getElementById('dest-hero-img').src = dest.place_image;
    document.getElementById('place-overlay').textContent = dest.name;
    document.getElementById('dest-title').textContent = `${dest.name}, ${dest.state}`;
    document.getElementById('dest-overview').textContent = dest.overview;

    const hotelsContainer = document.getElementById('dest-hotels');
    hotelsContainer.innerHTML = dest.hotels.map(hotel => `
        <div class="hotel-card bg-[#2E5B34] text-white p-4 rounded-lg ${hotel.category.toLowerCase()}">
            <h4 class="text-lg font-semibold">${hotel.name}</h4>
            <p class="text-sm">${hotel.description}</p>
            <p class="text-sm mt-2">${hotel.price_range}</p>
            <a href="#" class="text-[#D4A017] underline">Book Now</a>
        </div>
    `).join('');

    const restaurantsContainer = document.getElementById('dest-restaurants');
    restaurantsContainer.innerHTML = dest.restaurants.map(rest => `
        <div class="bg-[#2E5B34] text-white p-4 rounded-lg">
            <h4 class="text-lg font-semibold">${rest.name}</h4>
            <p class="text-sm">${rest.cuisine} - ${rest.cost}</p>
        </div>
    `).join('');

    const spotsContainer = document.getElementById('dest-spots');
    spotsContainer.innerHTML = dest.must_visit_spots.map(spot => `
        <div class="bg-[#2E5B34] text-white p-4 rounded-lg">
            <h4 class="text-lg font-semibold">${spot.name}</h4>
            <p class="text-sm">${spot.description}</p>
            <p class="text-xs italic mt-2">${spot.tip}</p>
        </div>
    `).join('');

    const travelDetailsContainer = document.getElementById('dest-travel-details');
    travelDetailsContainer.innerHTML = `
        <p><strong>How to Reach:</strong> ${dest.travel_details.how_to_reach}</p>
        <p><strong>Best Time to Visit:</strong> ${dest.travel_details.best_time}</p>
        <p><strong>Local Transport:</strong> ${dest.travel_details.local_transport}</p>
        <p><strong>Travel Tips:</strong> ${dest.travel_details.tips}</p>
        <p><strong>Nearby Destinations:</strong> ${dest.travel_details.nearby}</p>
    `;
}

// Setup Search Bar
function setupSearchBar() {
    const searchInput = document.getElementById('search-input');
    const suggestionsContainer = document.getElementById('suggestions');

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        suggestionsContainer.innerHTML = '';
        
        if (query) {
            const filteredStates = allStates.filter(state => 
                state.state.toLowerCase().includes(query)
            );
            if (filteredStates.length > 0) {
                suggestionsContainer.style.display = 'block';
                filteredStates.forEach(state => {
                    const suggestion = document.createElement('div');
                    suggestion.className = 'suggestion-item';
                    suggestion.textContent = state.state;
                    suggestion.addEventListener('click', () => {
                        searchInput.value = state.state;
                        renderStateCards([state]);
                        suggestionsContainer.style.display = 'none';
                    });
                    suggestionsContainer.appendChild(suggestion);
                });
                gsap.from('.suggestion-item', {
                    opacity: 0,
                    y: 10,
                    duration: 0.3,
                    stagger: 0.1,
                    ease: 'power2.out'
                });
            } else {
                suggestionsContainer.style.display = 'none';
            }
        } else {
            suggestionsContainer.style.display = 'none';
            renderStateCards(allStates);
        }
    });

    // Hide suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
            suggestionsContainer.style.display = 'none';
        }
    });
}

// Header Animations (Same as Homepage)
function setupHeaderAnimations() {
    gsap.from('header h1', { x: -100, opacity: 0, duration: 1, ease: 'power2.out' });
    gsap.from('header p', { x: 100, opacity: 0, duration: 1, delay: 0.2, ease: 'power2.out' });

    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        if (navMenu.classList.contains('active')) {
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
                ease: 'power2.in'
            });
        }
    });
}