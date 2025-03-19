document.addEventListener('DOMContentLoaded', function() {
    // --- Persistent View Counter Animation & Graph ---
    const viewCounterElement = document.getElementById('view-counter');
    const viewGrowthChartCanvas = document.getElementById('viewGrowthChart').getContext('2d');
    let currentViews = localStorage.getItem('currentViews') || 236670943; // Default start
    let lastUpdateTime = localStorage.getItem('lastUpdateTime') || Date.now();
    const weeklyViewIncrease = 11000000; // 11 Million Weekly Increase
    const targetViews = 350000000; // Increased Target for longer animation
    const updateInterval = 5000; // 5 seconds update interval (Slower)
    const viewsPerInterval = weeklyViewIncrease / (7 * 24 * 3600 * 1000 / updateInterval); // Views to add each interval

    let viewDataPoints = JSON.parse(localStorage.getItem('viewDataPoints')) || []; // Load historical data
    if (viewDataPoints.length === 0) {
        // Initialize graph data with starting view count for past 7 days
        const now = Date.now();
        for (let i = 6; i >= 0; i--) {
            viewDataPoints.push({
                time: now - i * 24 * 3600 * 1000,
                views: currentViews - (weeklyViewIncrease / 7) * i // Estimate views for past days
            });
        }
        localStorage.setItem('viewDataPoints', JSON.stringify(viewDataPoints));
    }


    function updateViewCountAndGraph() {
        if (currentViews < targetViews) {
            currentViews += viewsPerInterval;
            viewCounterElement.textContent = Math.round(currentViews).toLocaleString() + "+";
            localStorage.setItem('currentViews', Math.round(currentViews));
            localStorage.setItem('lastUpdateTime', Date.now());

            // Update Graph Data
            const nowTime = Date.now();
            viewDataPoints.push({ time: nowTime, views: currentViews });
            if (viewDataPoints.length > 7) {
                viewDataPoints.shift(); // Keep only last 7 days data
            }
            localStorage.setItem('viewDataPoints', JSON.stringify(viewDataPoints));
            updateViewGrowthChart(); // Update the chart

            setTimeout(updateViewCountAndGraph, updateInterval);
        } else {
            viewCounterElement.textContent = targetViews.toLocaleString() + "+";
            localStorage.removeItem('lastUpdateTime');
        }
    }


    function updateViewGrowthChart() {
        const chartData = {
            labels: viewDataPoints.map(dp => new Date(dp.time).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
            datasets: [{
                label: 'TikTok Views (Past 7 Days)',
                data: viewDataPoints.map(dp => dp.views / 1000000), // Display in Millions
                borderColor: 'var(--primary-color)',
                backgroundColor: 'rgba(255, 0, 80, 0.1)',
                borderWidth: 2,
                pointRadius: 0,
                tension: 0.4,
                fill: true
            }]
        };

        new Chart(viewGrowthChartCanvas, {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { color: 'var(--text-muted)' }
                    },
                    y: {
                        beginAtZero: false,
                        grid: { color: 'rgba(255,255,255,0.05)' },
                        ticks: {
                            color: 'var(--text-muted)',
                            callback: function (value) { return value + 'M'; } // M for Millions on Y-axis
                        },
                        title: {
                            display: false,
                            text: 'Views (Millions)',
                            color: 'var(--text-muted)'
                        }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }


    updateViewCountAndGraph(); // Start counter and graph update loop
    updateViewGrowthChart(); // Initial chart render


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
