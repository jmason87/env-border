let extensionEnabled = true;

document.addEventListener('DOMContentLoaded', function() {
    const toggleExtension = document.getElementById('toggleExtension');
    toggleExtension.textContent = "Disable Extension";
});
document.getElementById('toggleExtension').addEventListener('click', function() {
    // Assuming extensionEnabled is a global variable or stored in a way accessible here
    extensionEnabled = !extensionEnabled; // Toggle the state
    getURLs(function(urls) {
        sendMessageToContentScript({extensionEnabled: extensionEnabled, ...urls});
    });
    // Update the button text based on the new state
    this.textContent = extensionEnabled ? "Disable Extension" : "Enable Extension";
});

document.getElementById('save').addEventListener('click', function() {
    const data = {
        local: document.getElementById('local').value, 
        qe: document.getElementById('qe').value, 
        prod: document.getElementById('prod').value,
    };

    chrome.storage.local.set(data);
});

document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get(['local', 'qe', 'prod'], function(result) {
        // Check if the value exists before setting it to avoid undefined errors
        if (result.local !== undefined) {
            document.getElementById('local').value = result.local;
        }
        if (result.qe !== undefined) {
            document.getElementById('qe').value = result.qe;
        }
        if (result.prod !== undefined) {
            document.getElementById('prod').value = result.prod;
        }
    });
});

function getURLs(callback) {
    chrome.storage.local.get(['local', 'qe', 'prod'], function(result) {
        callback(result);
    });
}

function sendMessageToContentScript(value) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {value});
    });
}