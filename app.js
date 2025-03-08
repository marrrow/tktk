// App.js
// DOM elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize category filtering
    initializeFilters();
    
    // Initialize SoundOn Score calculator with sliders
    initializeCalculator();
    
    // Populate category sounds based on initial filter (all)
    populateCategorySounds('all');
    
    // Initialize prediction bars for next star sounds
    initializePredictionBars();
});

// Smooth scrolling for navigation
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

// Initialize category filters
function initializeFilters() {
    const categoryFilters = document.querySelectorAll('.category-filter');
    
    // Set default active state
    categoryFilters[0].classList.add('active');
    
    // Add click event listeners to category filters
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            categoryFilters.forEach(f => f.classList.remove('active'));
            // Add active class to clicked filter
            this.classList.add('active');
            
            // Update sound display based on selected category
            populateCategorySounds(this.dataset.filter);
        });
    });
}

// Initialize SoundOn Score calculator with sliders
function initializeCalculator() {
    // Get all sliders and display elements
    const viewTimeSlider = document.getElementById('avg-view-time');
    const completionSlider = document.getElementById('completion-rate');
    const engagementSlider = document.getElementById('engagement-rate');
    const trendSlider = document.getElementById('trend-factor');
    
    const viewTimeDisplay = document.getElementById('view-time-display');
    const completionDisplay = document.getElementById('completion-display');
    const engagementDisplay = document.getElementById('engagement-display');
    const trendDisplay = document.getElementById('trend-display');
    
    // Update displays when sliders change
    viewTimeSlider.addEventListener('input', () => {
        viewTimeDisplay.textContent = viewTimeSlider.value;
        calculateAndDisplayScore();
    });
    
    completionSlider.addEventListener('input', () => {
        completionDisplay.textContent = completionSlider.value;
        calculateAndDisplayScore();
    });
    
    engagementSlider.addEventListener('input', () => {
        engagementDisplay.textContent = engagementSlider.value;
        calculateAndDisplayScore();
    });
    
    trendSlider.addEventListener('input', () => {
        trendDisplay.textContent = trendSlider.value;
        calculateAndDisplayScore();
    });
    
    // Calculate button
    const calculateButton = document.getElementById('calculate-score');
    calculateButton.addEventListener('click', calculateAndDisplayScore);
    
    // Initial calculation
    calculateAndDisplayScore();
}

// Calculate and display score based on current slider values
function calculateAndDisplayScore() {
    const avgViewTime = parseFloat(document.getElementById('avg-view-time').value);
    const completionRate = parseFloat(document.getElementById('completion-rate').value);
    const engagementRate = parseFloat(document.getElementById('engagement-rate').value);
    const trendFactor = parseFloat(document.getElementById('trend-factor').value);
    
    // Calculate score
    const score = calculateSoundOnScore(avgViewTime, completionRate, engagementRate, trendFactor);
    
    // Display result with animation
    const scoreElement = document.getElementById('soundon-score');
    animateNumberValue(scoreElement, parseInt(scoreElement.textContent) || 0, score, 1000);
}

// Animate number value from start to end over duration
function animateNumberValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Calculate SoundOn Score based on input parameters
function calculateSoundOnScore(viewTime, completion, engagement, trend) {
    // Normalize inputs to 0-1 scale
    const normViewTime = Math.min(viewTime / 60, 1); // Assuming 60 seconds is max
    const normCompletion = completion / 100;
    const normEngagement = engagement / 100;
    
    // Calculate base score (0-100)
    const baseScore = (normViewTime * 30) + (normCompletion * 40) + (normEngagement * 30);
    
    // Apply trend factor multiplier (1-1.5 range)
    const trendMultiplier = 1 + ((trend - 1) / 9) * 0.5; // Maps 1-10 to 1-1.5
    
    // Calculate final score
    const finalScore = Math.round(baseScore * trendMultiplier);
    
    // Ensure score is within 1-100 range
    return Math.min(Math.max(finalScore, 1), 100);
}

// Populate category sounds based on selected filter
function populateCategorySounds(category) {
    const categorySoundsContainer = document.querySelector('.category-sounds');
    
    // Clear existing sounds
    categorySoundsContainer.innerHTML = '';
    
    // Get sounds data
    const sounds = getSoundsData(category);
    
    // Create and append sound cards
    sounds.forEach(sound => {
        const soundCard = createSoundCard(sound);
        categorySoundsContainer.appendChild(soundCard);
    });
}

// Create sound card element - updated to be fully clickable with image as button and adding views
function createSoundCard(sound) {
    const card = document.createElement('div');
    card.className = 'sound-item';
    card.onclick = function() {
        window.open(sound.link, '_blank');
    };
    card.dataset.category = sound.category;
    
    const imageHtml = sound.qrCode ? 
        `<img src="${sound.qrCode}" alt="${sound.name}" style="max-height: 100%; max-width: 90%; object-fit: contain;">` : 
        `<i class="fas fa-music" style="font-size: 48px; color: white;"></i>`;
    
    card.innerHTML = `
        <div class="sound-icon">
            ${imageHtml}
        </div>
        <div class="sound-details">
            <h3>${sound.name}</h3>
            <p class="sound-stat">${sound.videos} videos • ${sound.views || 'New'} views • Score: ${sound.score}</p>
            <p class="sound-category">${sound.category.charAt(0).toUpperCase() + sound.category.slice(1)}</p>
        </div>
    `;
    
    return card;
}

// Mock data for sounds based on category
function getSoundsData(category) {
    // Base sounds data with QR code paths
    const allSounds = [
        {
            name: "Glory Glory Man United",
            category: "sports",
            videos: "2.7K+",
            views: "4.5M+",
            score: 94,
            description: "Perfect for sports content and Manchester United fans",
            link: "https://www.tiktok.com/t/ZT2CCNWN6/",
            qrCode: "/BD750FEF-390E-43D4-AF35-FFB7C899BC1B.jpeg"
        },
        {
            name: "Tom Jerry and Mickey Mouse",
            category: "comedy",
            videos: "1.2K+",
            views: "3.1M+",
            score: 88,
            description: "Excellent for comedy skits and nostalgic content",
            link: "https://www.tiktok.com/t/ZT2CCj4gr/",
            qrCode: "/3E2EB9FD-2F68-42FF-B23F-08B729171AE4.jpeg"
        },
        {
            name: "Hala Madrid!",
            category: "sports",
            videos: "3.8K+",
            views: "7.2M+",
            score: 96,
            description: "Ideal for Real Madrid fans and football-related content",
            link: "https://www.tiktok.com/t/ZT2CQvGB9/",
            qrCode: "/C4BE1349-BDD9-41B9-9D81-E78E21181471.jpeg"
        },
        {
            name: "Romantic Lover",
            category: "romance",
            videos: "2.7K+",
            views: "5.3M+",
            score: 92,
            description: "Perfect for couples content and relationship posts",
            link: "https://www.tiktok.com/t/ZT2CCd57A/",
            qrCode: "/A933B757-5F70-4919-BB03-E219B2C027EF.jpeg"
        },
        {
            name: "Core Sound 2025",
            category: "core",
            videos: "New",
            views: "145K+ predicted",
            score: 97,
            description: "Our top prediction for viral growth in Q1 2025",
            link: "https://www.tiktok.com/t/ZT2CQthcY/"
        },
        {
            name: "Presentation Pro",
            category: "presentation",
            videos: "New",
            views: "98K+ predicted",
            score: 91,
            description: "Perfect for professional and educational content",
            link: "https://www.tiktok.com/t/ZT2CQE8NK/"
        }
    ];
    
    // Filter by category
    return category === 'all' ? allSounds : allSounds.filter(sound => sound.category === category);
}

// Initialize prediction bars for next star sounds
function initializePredictionBars() {
    const predictionFills = document.querySelectorAll('.prediction-fill');
    
    predictionFills.forEach(fill => {
        const predictionValue = fill.getAttribute('data-value');
        
        // Delay to allow for animation
        setTimeout(() => {
            fill.style.width = predictionValue + '%';
        }, 500);
    });
}

// Open TikTok link
function openTikTokLink(url) {
    window.open(url, '_blank');
}