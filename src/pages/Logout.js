// function for logout by removing the token from localstorage and redirecting to login page
function Logout() {
    localStorage.removeItem('token'); // Remove token from localStorage
    window.location.href = '/login'; // Redirect to login page
}