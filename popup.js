document.addEventListener('DOMContentLoaded', function() {
    const toggleExtension = document.getElementById('toggleExtension');
    
    chrome.storage.local.get(['extensionEnabled'], function(result) {
        let extensionEnabled = result.extensionEnabled !== undefined ? result.extensionEnabled : false;
        toggleExtension.textContent = extensionEnabled ? "Disable Extension" : "Enable Extension";
    });

    toggleExtension.addEventListener('click', function() {
        chrome.storage.local.get(['extensionEnabled'], function(result) {
            let newEnabled = !result.extensionEnabled;
            
            chrome.storage.local.set({extensionEnabled: newEnabled}, function() {
                getURLs(function(urls) {
                    sendMessageToContentScript({extensionEnabled: newEnabled, ...urls});
                });
                toggleExtension.textContent = newEnabled ? "Disable Extension" : "Enable Extension";
            });
        });
    });
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