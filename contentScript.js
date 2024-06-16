chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.value.extensionEnabled) {
        if (window.location.href.includes(`https://${message.value.prod}`)) {
            document.body.style.border = "0.5rem solid rgba(255, 0, 0)"; // Red with 50% transparency
        } else if (window.location.href.includes(`https://${message.value.qe}`)) {
            document.body.style.border = "0.5rem solid rgba(255, 255, 0)"; // Yellow with 50% transparency
        } else if (window.location.href.includes(`http://${message.value.local}`)) {
            document.body.style.border = "0.5rem solid rgba(0, 128, 0)"; // Green with 50% transparency
        } else {
            document.body.style.border = ""; // Remove border
        }
    } else {
        document.body.style.border = ""; // Remove border
    }
});