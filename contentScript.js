chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.value.extensionEnabled) {
        if (window.location.href.includes(`https://${message.value.prod}`)) {
            const color = 'rgba(255, 0, 0)'; // red
            createBorder('top', color);
            createBorder('right', color);
            createBorder('bottom', color);
            createBorder('left', color);
        } else if (window.location.href.includes(`https://${message.value.qe}`)) {
            const color = 'rgba(255, 255, 0)'; // yellow
            createBorder('top', color);
            createBorder('right', color);
            createBorder('bottom', color);
            createBorder('left', color);
        } else if (window.location.href.includes(`http://${message.value.local}`)) {
            const color = 'rgba(0, 128, 0)'; // green
            createBorder('top', color);
            createBorder('right', color);
            createBorder('bottom', color);
            createBorder('left', color);
        } else {
            // Remove all borders if none of the conditions are met
            removeBorders();
        }
    } else {
        // Remove all borders if the extension is disabled
        removeBorders();
    }
});

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