


function updateAuthUI() {
  console.log('Updating auth UI, login state:', isLoggedIn());
  const authButtonsContainer = document.querySelector('.auth-buttons');
  
  if (!authButtonsContainer) {
    console.warn('Auth buttons container not found');
    return;
  }
  
  
  if (isLoggedIn()) {
    const currentUser = getCurrentUser();
    console.log('User is logged in as:', currentUser.name);
    
    
    authButtonsContainer.innerHTML = `
      <span class="user-greeting">Hello, ${currentUser.name.split(' ')[0]}</span>
      <button id="logout-btn" class="btn btn-primary">Logout</button>
    `;
    
    
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function() {
        console.log('Logout button clicked');
        logoutUser();
        window.location.reload();
      });
    }
  } else {
    console.log('User is not logged in, showing login/signup buttons');
    
    authButtonsContainer.innerHTML = `
      <a href="login.html" class="btn">Login</a>
      <a href="signup.html" class="btn btn-primary">Sign Up</a>
    `;
  }
}


window.addEventListener('load', function() {
  console.log('Page loaded, updating auth UI');
  updateAuthUI();
});


document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, updating auth UI');
  updateAuthUI();
});

setInterval(function() {
  updateAuthUI();
}, 3000);
