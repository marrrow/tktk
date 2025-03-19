document.addEventListener('DOMContentLoaded', function() {
    // --- Persistent View Counter Animation --- (No changes needed for counter persistence)
    const viewCounterElement = document.getElementById('view-counter');
    let currentViews = localStorage.getItem('currentViews');
    let lastUpdateTime = localStorage.getItem('lastUpdateTime');
    const weeklyViewIncrease = 12000000; // UPDATED to 12 Million Weekly Increase
    const targetViews = 150000000 + (weeklyViewIncrease * 52);

    if (!currentViews) {
        currentViews = 150000000;
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
            setTimeout(updateViewCount, updateInterval);
        } else {
            viewCounterElement.textContent = targetViews.toLocaleString() + "+";
            localStorage.removeItem('lastUpdateTime');
        }
    }

    updateViewCount();

});
