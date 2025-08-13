<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', () => {
    sendClickstreamEvent('page_load', 'Login Page loaded');

    // Listen for all clicks on the page
    document.addEventListener('click', (e) => {
        let desc = '';
        if (e.target.id) desc = `Clicked element with id: ${e.target.id}`;
        else if (e.target.className) desc = `Clicked element with class: ${e.target.className}`;
        else desc = `Clicked element: ${e.target.tagName}`;
        sendClickstreamEvent('click', desc);
    });
});

function sendClickstreamEvent(eventType, description) {
    fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            eventType,
            description,
            timestamp: new Date().toISOString()
        })
    });
=======
document.addEventListener('DOMContentLoaded', () => {
    sendClickstreamEvent('page_load', 'Login Page loaded');

    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const loginBtn = document.getElementById('login-btn');

    username.addEventListener('focus', () => sendClickstreamEvent('input_focus', 'Username field'));
    password.addEventListener('focus', () => sendClickstreamEvent('input_focus', 'Password field'));

    loginBtn.addEventListener('click', () => {
        sendClickstreamEvent('click', 'Login button clicked');
    });
});

function sendClickstreamEvent(eventType, description) {
    fetch('/api/track', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            eventType,
            description,
            timestamp: new Date().toISOString()
        })
    });
>>>>>>> 1b529ee4d3f2c89aa2e83575aadc2feea0efc5f3
}