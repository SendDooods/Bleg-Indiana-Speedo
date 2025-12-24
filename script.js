document.addEventListener('DOMContentLoaded', () => {
    // Initialize elements object
    const els = {
        speed: document.querySelector('.speed-value') || document.getElementById('speed') || document.querySelector('[data-speed]')
    };

    // Vehicle state tracking
    const vehicleState = {
        engineOn: false,
        hasMoved: false
    };

    // Set speed function with color coding
    window.setSpeed = (speed) => {
        if (!els.speed) return;

        const val = Math.round(Math.max(0, speed * 2.23694)); // Convert m/s to mph
        els.speed.textContent = val;

        if (val > 0) vehicleState.hasMoved = true;

        // Update speed display color based on engine state and speed
        const root = document.documentElement;

        if (!vehicleState.engineOn) {
            // Engine off = white
            root.style.setProperty('--speed-color', '#ffffff');
            root.style.setProperty('--speed-glow', 'rgba(255, 255, 255, 0.8)');
        } else if (val >= 1 && val <= 40) {
            // 1-40 mph = green
            root.style.setProperty('--speed-color', '#00ff41');
            root.style.setProperty('--speed-glow', 'rgba(0, 255, 65, 0.8)');
        } else if (val >= 41 && val <= 50) {
            // 41-50 mph = yellow
            root.style.setProperty('--speed-color', '#ffff00');
            root.style.setProperty('--speed-glow', 'rgba(255, 255, 0, 0.8)');
        } else if (val > 50) {
            // Above 50 mph = red
            root.style.setProperty('--speed-color', '#ff0000');
            root.style.setProperty('--speed-glow', 'rgba(255, 0, 0, 0.8)');
        } else {
            // 0 mph with engine on = white
            root.style.setProperty('--speed-color', '#ffffff');
            root.style.setProperty('--speed-glow', 'rgba(255, 255, 255, 0.8)');
        }

        // Update gauge if it exists
        if (window.gauge) {
            window.gauge.setValue(val);
        }
    };

    // Engine state control functions
    window.setEngineState = (isOn) => {
        vehicleState.engineOn = isOn;
        // Trigger speed color update
        if (els.speed) {
            const currentSpeed = parseFloat(els.speed.textContent) || 0;
            window.setSpeed(currentSpeed / 2.23694); // Convert back to m/s for consistency
        }
    };

    // Test function to cycle through speeds (for testing)
    window.testSpeedometer = () => {
        let testSpeed = 0;
        const interval = setInterval(() => {
            window.setSpeed(testSpeed / 2.23694); // Convert mph to m/s
            testSpeed += 10;
            if (testSpeed > 200) {
                clearInterval(interval);
                setTimeout(() => window.setSpeed(0), 1000);
            }
        }, 500);
    };

    // Initialize with default values
    window.setSpeed(0);

    // Speedometer initialized
});