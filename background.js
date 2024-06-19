chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && tab.active) {
        chrome.storage.local.get(['extensionEnabled'], function(result) {
            getURLs(function(urls) {
                sendMessageToContentScript(tabId, {extensionEnabled: result.extensionEnabled, ...urls});
            });
        });
    }
});

function sendMessageToContentScript(tabId, value) {
    chrome.tabs.sendMessage(tabId, {value}, function() {
        if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError.message);
        }
    });
}

function getURLs(callback) {
    chrome.storage.local.get(['local', 'qe', 'prod'], function(result) {
        callback(result);
    });
}