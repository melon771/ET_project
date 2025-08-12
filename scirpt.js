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
}