const appUrl = 'https://genroutine.onrender.com'

// Function to check if the app is up and redirect immediately if ready
function checkAppStatus() {
    fetch(appUrl)
        .then(response => {
            if (response.ok) {
                window.location.href = appUrl;
            }
        })
        .catch(error => {
            console.log('App is still starting....', error);
        });
}

setTimeout(() => {
    document.getElementById('first').style.display = 'none'; // Hide first
    document.getElementById('second').style.display = 'flex'; // Show second
}, 20000);

// Check app status every 5 seconds
const interval = setInterval(checkAppStatus, 5000);

setTimeout(() => {
    clearInterval(interval);
    window.location.href = appUrl;
}, 45000);

checkAppStatus();