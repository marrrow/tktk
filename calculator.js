document.addEventListener('DOMContentLoaded', function() {
    // --- SoundOn Score Calculator --- (JavaScript for calculator - moved to separate file)
    const avgViewTimeSlider = document.getElementById('avg-view-time');
    const completionRateSlider = document.getElementById('completion-rate');
    const engagementRateSlider = document.getElementById('engagement-rate');
    const trendFactorSlider = document.getElementById('trend-factor');

    const viewTimeDisplay = document.getElementById('view-time-display');
    const completionDisplay = document.getElementById('completion-display');
    const engagementDisplay = document.getElementById('engagement-display');
    const trendDisplay = document.getElementById('trend-display');
    const soundonScoreDisplay = document.getElementById('soundon-score');


    function calculateSoundOnScore() {
        const viewTime = parseInt(avgViewTimeSlider.value);
        const completion = parseInt(completionRateSlider.value);
        const engagement = parseFloat(engagementRateSlider.value);
        const trend = parseInt(trendFactorSlider.value);

        let score = (viewTime * 0.15) + (completion * 0.25) + (engagement * 0.3) + (trend * 0.3);
        score = Math.max(0, Math.min(100, Math.round(score)));

        soundonScoreDisplay.textContent = isNaN(score) ? "--" : score;
    }


    avgViewTimeSlider.addEventListener('input', function() {
        viewTimeDisplay.textContent = this.value + " SECONDS";
        calculateSoundOnScore();
    });

    completionRateSlider.addEventListener('input', function() {
        completionDisplay.textContent = this.value + "%";
        calculateSoundOnScore();
    });

    engagementRateSlider.addEventListener('input', function() {
        engagementDisplay.textContent = this.value + "%";
        calculateSoundOnScore();
    });

    trendFactorSlider.addEventListener('input', function() {
        trendDisplay.textContent = this.value + "/10";
        calculateSoundOnScore();
    });

    calculateSoundOnScore(); // Initial score calculation
});
