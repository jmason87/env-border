chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    const value = message.value || {};

    // Helper: check if a provided domain string is non-empty
    function isNonEmptyString(s) {
        return typeof s === 'string' && s.trim().length > 0;
    }

    // Normalize a user-entered domain: strip protocol, path, port and trailing slashes
    function normalizeDomain(input) {
        if (!isNonEmptyString(input)) return '';
        return input.trim().replace(/^https?:\/\//i, '').replace(/\/.*$/, '').replace(/:\d+$/, '').toLowerCase();
    }

    if (value.extensionEnabled) {
        // Remove any existing borders first to avoid duplicates
        removeBorders();

        // Choose the most specific (longest) matching domain among configured envs
        var hostname = window.location.hostname.toLowerCase();
        var envCandidates = [];
        var envs = [
            {key: 'prod', domain: normalizeDomain(value.prod), color: 'rgba(255, 0, 0)'} ,
            {key: 'staging', domain: normalizeDomain(value.staging), color: 'rgba(240, 128, 0)'},
            {key: 'qe', domain: normalizeDomain(value.qe), color: 'rgba(255, 255, 0)'},
            {key: 'local', domain: normalizeDomain(value.local), color: 'rgba(0, 128, 0)'}
        ];

        envs.forEach(function(e) {
            if (!isNonEmptyString(e.domain)) return;
            if (hostname === e.domain || hostname.endsWith('.' + e.domain)) {
                envCandidates.push({key: e.key, domain: e.domain, len: e.domain.length, color: e.color});
            }
        });

        if (envCandidates.length > 0) {
            envCandidates.sort(function(a,b) { return b.len - a.len; });
            createAllBorders(envCandidates[0].color);
        } else {
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