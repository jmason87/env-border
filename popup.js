// Popup logic: read/save settings, toggle enabled state, and notify content script

function isNonEmptyString(s) {
    return typeof s === 'string' && s.trim().length > 0;
}

// (preview/domain-matching helpers removed from popup — content script performs matching)

document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggleBtn');
    const saveBtn = document.getElementById('saveBtn');
    const saveStatus = document.getElementById('saveStatus');
    const extStatus = document.getElementById('extStatus');

    // Load stored values
    chrome.storage.local.get(['extensionEnabled','local','qe','staging','prod'], function(result) {
        const extensionEnabled = result.extensionEnabled !== undefined ? result.extensionEnabled : false;
        toggleBtn.textContent = extensionEnabled ? 'Disable Extension' : 'Enable Extension';
        toggleBtn.classList.toggle('enabled', extensionEnabled);
        extStatus.textContent = extensionEnabled ? 'Enabled' : 'Disabled';
        extStatus.classList.toggle('enabled', extensionEnabled);

        if (isNonEmptyString(result.local)) document.getElementById('local').value = result.local;
        if (isNonEmptyString(result.qe)) document.getElementById('qe').value = result.qe;
        if (isNonEmptyString(result.staging)) document.getElementById('staging').value = result.staging;
        if (isNonEmptyString(result.prod)) document.getElementById('prod').value = result.prod;
    });

    toggleBtn.addEventListener('click', function() {
        chrome.storage.local.get(['extensionEnabled','local','qe','staging','prod'], function(result) {
            const newEnabled = !result.extensionEnabled;
            chrome.storage.local.set({extensionEnabled: newEnabled}, function() {
                toggleBtn.textContent = newEnabled ? 'Disable Extension' : 'Enable Extension';
                toggleBtn.classList.toggle('enabled', newEnabled);
                extStatus.textContent = newEnabled ? 'Enabled' : 'Disabled';
                extStatus.classList.toggle('enabled', newEnabled);
                // Notify active tab
                sendMessageToContentScript({extensionEnabled: newEnabled, local: result.local, qe: result.qe, staging: result.staging, prod: result.prod});
                // no preview update needed
            });
        });
    });

    saveBtn.addEventListener('click', function() {
        const data = {
            local: document.getElementById('local').value.trim(),
            qe: document.getElementById('qe').value.trim(),
            staging: document.getElementById('staging').value.trim(),
            prod: document.getElementById('prod').value.trim()
        };
        chrome.storage.local.set(data, function() {
            // show saved indicator briefly
            saveStatus.hidden = false;
            setTimeout(function() { saveStatus.hidden = true; }, 1500);
            // notify active tab with updated URLs and current extensionEnabled value
            chrome.storage.local.get(['extensionEnabled'], function(r) {
                sendMessageToContentScript({extensionEnabled: r.extensionEnabled, ...data});
            });
        });
    });
});

function sendMessageToContentScript(value) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (!tabs || !tabs[0]) return;
        try {
            chrome.tabs.sendMessage(tabs[0].id, {value});
        } catch (e) {
            // ignore; content script may not be injected on some pages
        }
    });
}
