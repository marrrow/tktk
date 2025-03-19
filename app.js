document.addEventListener('DOMContentLoaded', function() {
    // --- Persistent View Counter Animation ---
    const viewCounterElement = document.getElementById('view-counter');
    let currentViews = localStorage.getItem('currentViews');
    let lastUpdateTime = localStorage.getItem('lastUpdateTime');
    const weeklyViewIncrease = 11000000; // 11 Million Weekly Increase (Adjusted)
    const targetViews = 151000000 + (weeklyViewIncrease * 52);

    if (!currentViews) {
        currentViews = 151000000; // Start at 151 Million (Adjusted)
    } else {
        currentViews = parseInt(currentViews, 10);
    }

    if (!lastUpdateTime) {
        lastUpdateTime = Date.now();
    } else {
        lastUpdateTime = parseInt(lastUpdateTime, 10);
    }

    const timeDiff = Date.now() - lastUpdateTime;
    const viewsToAddBasedOnTime = Math.floor((timeDiff / (7 * 24 * 3600 * 1000)) * weeklyViewIncrease);
    currentViews += viewsToAddBasedOnTime;


    const minIncrement = 2000;
    const maxIncrement = 7000;
    const updateInterval = 50;

    function updateViewCount() {
        if (currentViews < targetViews) {
            const randomIncrement = Math.floor(Math.random() * (maxIncrement - minIncrement + 1)) + minIncrement;
            currentViews += randomIncrement;
            viewCounterElement.textContent = currentViews.toLocaleString() + "+";
            localStorage.setItem('currentViews', currentViews);
            localStorage.setItem('lastUpdateTime', Date.now());
            setTimeout(updateViewCount, updateViewCount, updateInterval); // Corrected typo here - function name was duplicated
        } else {
            viewCounterElement.textContent = targetViews.toLocaleString() + "+";
            localStorage.removeItem('lastUpdateTime');
        }
    }

    updateViewCount();


    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            let targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - (document.querySelector('header').offsetHeight),
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Scroll to Section Function for CTA Buttons ---
    window.scrollToSection = function(sectionId) {
        let targetSection = document.getElementById(sectionId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - (document.querySelector('header').offsetHeight),
                behavior: 'smooth'
            });
        }
    };

    // --- Prediction Bar Animation on Load ---
    const predictionFills = document.querySelectorAll('.prediction-fill');
    predictionFills.forEach(fill => {
        const value = fill.getAttribute('data-value');
        fill.style.width = value + '%';
    });


});
