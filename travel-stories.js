// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-out-quad',
    once: true
});

// GSAP Animations
document.addEventListener('DOMContentLoaded', () => {
    gsap.from('#hero-headline', { y: -50, opacity: 0, duration: 1, ease: 'power2.out' });
    gsap.from('.hero-overlay p', { y: 20, opacity: 0, duration: 1, delay: 0.3, ease: 'power2.out' });
    gsap.from('.hero-overlay a', { scale: 0.8, opacity: 0, duration: 0.8, delay: 0.6, ease: 'back.out(1.7)' });
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
        }
    });

    // Fetch and Render Stories
    const storyCards = document.getElementById('story-cards');
    const featuredNarrative = document.getElementById('featured-narrative');
    const loadingMessage = document.getElementById('loading-message');
    const popupOverlay = document.getElementById('story-popup');
    const popupClose = document.getElementById('popup-close');
    const popupTitle = document.getElementById('popup-title');
    const popupExcerpt = document.getElementById('popup-excerpt');
    const popupAuthor = document.getElementById('popup-author');
    const popupRecommendations = document.getElementById('popup-recommendations');
    const submitPopup = document.getElementById('submit-popup');
    const submitClose = document.getElementById('submit-close');
    const submitForm = document.getElementById('submit-form');
    const submitButton = document.getElementById('submit-button');
    const userStoryCards = document.getElementById('user-story-cards');
    const noStoriesNote = document.getElementById('no-stories-note');
    const submitStoryBtn = document.getElementById('submit-story-btn');
    const submitImage = document.getElementById('submit-image');
    let userStories = JSON.parse(localStorage.getItem('userStories')) || [];

    // Submit Story Button Functionality
    if (submitStoryBtn) {
        submitStoryBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor behavior
            document.getElementById('submit-id').value = userStories.length + 1;
            document.getElementById('submit-image').value = ''; // Reset file input
            document.querySelector('.file-input-label').textContent = 'Upload Image'; // Reset label
            if (submitPopup) {
                submitPopup.style.display = 'flex';
                gsap.fromTo(submitPopup, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' });
                gsap.fromTo('.popup-content', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' });
            } else {
                console.error('Submit popup element not found');
            }
        });
    } else {
        console.error('Submit Story button not found');
    }

    fetch('stories.json')
        .then(response => {
            if (!response.ok) throw new Error('JSON file not found');
            return response.json();
        })
        .then(data => {
            loadingMessage.remove(); // Remove loading message on success

            // Render Story Cards
            data.stories.forEach((story, index) => {
                const card = document.createElement('div');
                card.className = 'story-card bg-[#F5E8C7] rounded-lg overflow-hidden border-2 border-[#2E5B34] transition hvr-float';
                card.setAttribute('data-aos', 'fade-up');
                card.setAttribute('data-aos-delay', `${index * 100}`);
                card.setAttribute('data-region', story.region);
                card.innerHTML = `
                    <img src="${story.image}" alt="${story.title}" class="w-full">
                    <div class="p-4">
                        <h4 class="text-xl font-semibold text-[#2E5B34]">${story.title}</h4>
                        <p class="text-sm text-gray-700 mt-2">${story.excerpt}</p>
                        <p class="text-xs text-gray-600 italic mt-2">${story.author}</p>
                        <button class="text-[#D4A017] mt-2 inline-block hvr-grow read-more-btn" data-story-id="${story.id}">Read More</button>
                    </div>
                `;
                storyCards.appendChild(card);
            });

            // Popup Functionality for Read More Buttons
            const readMoreButtons = document.querySelectorAll('.read-more-btn');
            readMoreButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const storyId = button.getAttribute('data-story-id');
                    const story = data.stories.find(s => s.id == storyId);

                    popupTitle.textContent = story.title;
                    popupExcerpt.textContent = story.excerpt;
                    popupAuthor.textContent = story.author;
                    popupRecommendations.innerHTML = `
                        <li>Hotel: <a href="${story.recommendations.hotel_link}" target="_blank" class="text-[#D4A017] hover:underline">${story.recommendations.hotel}</a></li>
                        <li>Restaurant: <a href="${story.recommendations.restaurant_link}" target="_blank" class="text-[#D4A017] hover:underline">${story.recommendations.restaurant}</a></li>
                        <li>Spot: ${story.recommendations.spot}</li>
                    `;

                    popupOverlay.style.display = 'flex';
                    gsap.fromTo(popupOverlay, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' });
                    gsap.fromTo('.popup-content', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' });
                });
            });

            popupClose.addEventListener('click', () => {
                gsap.to('.popup-content', { scale: 0.8, opacity: 0, duration: 0.3, ease: 'power2.in' });
                gsap.to(popupOverlay, { opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: () => { popupOverlay.style.display = 'none'; } });
            });

            popupOverlay.addEventListener('click', (e) => {
                if (e.target === popupOverlay) {
                    gsap.to('.popup-content', { scale: 0.8, opacity: 0, duration: 0.3, ease: 'power2.in' });
                    gsap.to(popupOverlay, { opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: () => { popupOverlay.style.display = 'none'; } });
                }
            });

            // Render Featured Narrative
            const featured = data.featured;
            document.getElementById('featured-image').style.backgroundImage = `url(${featured.image})`;
            document.getElementById('featured-title').textContent = featured.title;
            document.getElementById('featured-text').textContent = featured.full_text;
            document.getElementById('featured-author').textContent = featured.author;
            const recList = document.getElementById('featured-recommendations');
            recList.innerHTML = `
                <li>Hotel: <a href="${featured.recommendations.hotel_link}" target="_blank" class="text-[#D4A017] hover:underline">${featured.recommendations.hotel}</a></li>
                <li>Restaurant: <a href="${featured.recommendations.restaurant_link}" target="_blank" class="text-[#D4A017] hover:underline">${featured.recommendations.restaurant}</a></li>
                <li>Spot: ${featured.recommendations.spot}</li>
            `;
            document.getElementById('featured-cta').href = `kashmir-destination.html`; // Fixed typo in href

            // Filter Functionality
            const filterButtons = document.querySelectorAll('#filter-buttons button');
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const filter = button.getAttribute('data-filter');
                    filterButtons.forEach(btn => btn.classList.remove('bg-[#D4A017]'));
                    button.classList.add('bg-[#D4A017]');
                    const cards = document.querySelectorAll('.story-card');
                    cards.forEach(card => {
                        const region = card.getAttribute('data-region');
                        if (filter === 'all' || filter === region) {
                            card.style.display = 'block';
                            gsap.from(card, { opacity: 0, y: 20, duration: 0.5, ease: 'power2.out' });
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });

            // Submit Story Popup
            submitClose.addEventListener('click', () => {
                gsap.to('.popup-content', { scale: 0.8, opacity: 0, duration: 0.3, ease: 'power2.in' });
                gsap.to(submitPopup, { opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: () => { submitPopup.style.display = 'none'; } });
            });

            submitPopup.addEventListener('click', (e) => {
                if (e.target === submitPopup) {
                    gsap.to('.popup-content', { scale: 0.8, opacity: 0, duration: 0.3, ease: 'power2.in' });
                    gsap.to(submitPopup, { opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: () => { submitPopup.style.display = 'none'; } });
                }
            });

            // File Input Change Listener
            submitImage.addEventListener('change', (e) => {
                const fileName = e.target.files[0] ? e.target.files[0].name : 'Upload Image';
                document.querySelector('.file-input-label').textContent = fileName;
            });

            // Form Submission
            submitForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const id = parseInt(document.getElementById('submit-id').value);
                const title = document.getElementById('submit-title').value;
                const excerpt = document.getElementById('submit-excerpt').value;
                const author = document.getElementById('submit-author').value;
                const region = document.getElementById('submit-region').value;
                const fileInput = document.getElementById('submit-image');
                let image = userStories.find(s => s.id === id)?.image || ''; // Preserve existing image if editing

                if (!title || !excerpt || !author || !region) {
                    alert('Please fill all required fields before submitting.');
                    return;
                }

                if (fileInput.files && fileInput.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        image = e.target.result; // Set new image data
                        const newStory = { id, title, excerpt, author, image, region };
                        userStories = userStories.filter(s => s.id !== id); // Remove old version if editing
                        userStories.push(newStory);
                        localStorage.setItem('userStories', JSON.stringify(userStories));
                        submitForm.reset();
                        document.querySelector('.file-input-label').textContent = 'Upload Image'; // Reset label
                        gsap.to('.popup-content', { scale: 0.8, opacity: 0, duration: 0.3, ease: 'power2.in' });
                        gsap.to(submitPopup, { opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: () => { submitPopup.style.display = 'none'; } });
                        alert('Story submitted successfully!');
                        renderUserStories();
                    };
                    reader.readAsDataURL(fileInput.files[0]);
                } else {
                    // If no new file is uploaded, keep the existing image (if any)
                    const newStory = { id, title, excerpt, author, image, region };
                    userStories = userStories.filter(s => s.id !== id); // Remove old version if editing
                    userStories.push(newStory);
                    localStorage.setItem('userStories', JSON.stringify(userStories));
                    submitForm.reset();
                    document.querySelector('.file-input-label').textContent = 'Upload Image'; // Reset label
                    gsap.to('.popup-content', { scale: 0.8, opacity: 0, duration: 0.3, ease: 'power2.in' });
                    gsap.to(submitPopup, { opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: () => { submitPopup.style.display = 'none'; } });
                    alert('Story submitted successfully!');
                    renderUserStories();
                }
            });

            // Render User Submitted Stories
            function renderUserStories() {
                userStoryCards.innerHTML = '';
                if (userStories.length === 0) {
                    noStoriesNote.style.display = 'block';
                } else {
                    noStoriesNote.style.display = 'none';
                    userStories.forEach((story, index) => {
                        const card = document.createElement('div');
                        card.className = 'user-story-card';
                        card.setAttribute('data-aos', 'fade-up');
                        card.setAttribute('data-aos-delay', `${index * 100}`);
                        card.setAttribute('data-region', story.region);
                        card.innerHTML = `
                            <div class="menu-btn" onclick="event.stopPropagation();">⋮</div>
                            <div class="menu-dropdown">
                                <button class="edit-btn" data-id="${story.id}">Edit</button>
                                <button class="delete-btn" data-id="${story.id}">Delete</button>
                            </div>
                            ${story.image ? `<img src="${story.image}" alt="${story.title}">` : '<div class="no-image-text">Image not provided by user</div>'}
                            <div class="p-2">
                                <h4 class="text-lg font-semibold text-[#2E5B34]">${story.title}</h4>
                                <p class="text-sm text-gray-700 mt-1">${story.excerpt}</p>
                                <p class="text-xs text-gray-600 italic mt-1">${story.author}</p>
                            </div>
                        `;
                        userStoryCards.appendChild(card);

                        // Edit Functionality
                        card.querySelector('.edit-btn').addEventListener('click', () => {
                            const storyToEdit = userStories.find(s => s.id == story.id);
                            document.getElementById('submit-id').value = storyToEdit.id;
                            document.getElementById('submit-title').value = storyToEdit.title;
                            document.getElementById('submit-excerpt').value = storyToEdit.excerpt;
                            document.getElementById('submit-author').value = storyToEdit.author;
                            document.getElementById('submit-region').value = storyToEdit.region;
                            document.querySelector('.file-input-label').textContent = storyToEdit.image ? 'Image Uploaded' : 'Upload Image'; // Reflect existing image
                            submitPopup.style.display = 'flex';
                            gsap.fromTo(submitPopup, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' });
                            gsap.fromTo('.popup-content', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' });
                        });

                        // Delete Functionality
                        card.querySelector('.delete-btn').addEventListener('click', () => {
                            if (confirm('Are you sure you want to delete this story?')) {
                                userStories = userStories.filter(s => s.id !== story.id);
                                localStorage.setItem('userStories', JSON.stringify(userStories));
                                renderUserStories();
                            }
                        });
                    });
                }
            }
            renderUserStories();

            // User Stories Filter
            const userFilterButtons = document.querySelectorAll('#user-filter-buttons button');
            userFilterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const filter = button.getAttribute('data-filter');
                    userFilterButtons.forEach(btn => btn.classList.remove('bg-[#D4A017]'));
                    button.classList.add('bg-[#D4A017]');
                    const cards = document.querySelectorAll('.user-story-card');
                    cards.forEach(card => {
                        const region = card.getAttribute('data-region');
                        if (filter === 'all' || filter === region) {
                            card.style.display = 'block';
                            gsap.from(card, { opacity: 0, y: 20, duration: 0.5, ease: 'power2.out' });
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });
        })
        .catch(error => {
            console.error('Error fetching stories:', error);
            loadingMessage.textContent = 'Failed to load stories. Please check if stories.json exists in the root directory.';
            document.getElementById('featured-title').textContent = 'Error';
            document.getElementById('featured-text').textContent = 'Unable to load the featured story. Ensure stories.json is in the correct location.';
        });
});