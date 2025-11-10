chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    const value = message.value || {};

    // Helper: check if a provided domain string is non-empty
    function isNonEmptyString(s) {
        return typeof s === 'string' && s.trim().length > 0;
    }

    // Normalize a user-entered domain: strip protocol, path, port and trailing slashes
    function normalizeDomain(input) {
        if (!isNonEmptyString(input)) return '';
        return input.trim().replace(/^https?:\/\//i, '').replace(/\/.*$/, '').replace(/:\d+$/, '');
    }

    // Check if the current page hostname matches (or is a subdomain of) the provided domain
    function hostnameMatchesDomain(domain) {
        const norm = normalizeDomain(domain);
        if (!isNonEmptyString(norm)) return false;
        const hostname = window.location.hostname; // excludes port
        return hostname === norm || hostname.endsWith('.' + norm);
    }

    if (value.extensionEnabled) {
        // Remove any existing borders first to avoid duplicates
        removeBorders();

        // Priority: prod -> staging -> qe -> local
        if (hostnameMatchesDomain(value.prod)) {
            createAllBorders('rgba(255, 0, 0)'); // red
        } else if (hostnameMatchesDomain(value.staging)) {
            createAllBorders('rgba(240, 128, 0)'); // orange
        } else if (hostnameMatchesDomain(value.qe)) {
            createAllBorders('rgba(255, 255, 0)'); // yellow
        } else if (hostnameMatchesDomain(value.local)) {
            createAllBorders('rgba(0, 128, 0)'); // green
        } else {
            // No match
            removeBorders();
        }
    } else {
        // Extension disabled
        removeBorders();
    }
});

function createAllBorders(color) {
    createBorder('top', color);
    createBorder('right', color);
    createBorder('bottom', color);
    createBorder('left', color);
}

function createBorder(side, color) {
    var border = document.createElement('div');
    border.classList.add('env-border');
    border.style.position = 'fixed';
    border.style.backgroundColor = color;
    border.style.zIndex = '9999';

    switch (side) {
        case 'top':
            border.style.top = '0';
            border.style.left = '0';
            border.style.right = '0';
            border.style.height = '0.5rem';
            break;
        case 'right':
            border.style.top = '0';
            border.style.right = '0';
            border.style.bottom = '0';
            border.style.width = '0.5rem';
            break;
        case 'bottom':
            border.style.bottom = '0';
            border.style.left = '0';
            border.style.right = '0';
            border.style.height = '0.5rem';
            break;
        case 'left':
            border.style.top = '0';
            border.style.left = '0';
            border.style.bottom = '0';
            border.style.width = '0.5rem';
            break;
    }

    document.body.appendChild(border);
}

function removeBorders() {
    document.querySelectorAll('div.env-border').forEach(function(div) {
        div.remove();
    });
}