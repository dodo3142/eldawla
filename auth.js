






async function signupUser(userData) {
  try {
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }
      
      return data;
    } catch (apiError) {
      console.warn('API signup failed, using local storage:', apiError);
      
      
      const userId = 'user_' + Date.now();
      
      
      const user = {
        id: userId,
        name: userData.name,
        email: userData.email,
        password: userData.password, 
        createdAt: new Date().toISOString()
      };
      
      
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('userName', user.name);
      localStorage.setItem('userId', user.id);
      
      
      const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
      
      if (allUsers.some(u => u.email === userData.email)) {
        throw new Error('User with this email already exists');
      }
      
      allUsers.push(user);
      localStorage.setItem('allUsers', JSON.stringify(allUsers));
      
      return user;
    }
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
}


async function loginUser(credentials) {
  try {
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', data.email);
      localStorage.setItem('userName', data.name);
      localStorage.setItem('userId', data.id);
      
      return data;
    } catch (apiError) {
      console.warn('API login failed, using localStorage:', apiError);
      
      const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
      
      const user = allUsers.find(u => u.email === credentials.email);
      
      if (!user) {
        throw new Error('User not found');
      }
      
      if (user.password !== credentials.password) {
        throw new Error('Invalid password');
      }
      
      
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('userName', user.name);
      localStorage.setItem('userId', user.id);
      
      return user;
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}


function isLoggedIn() {
  return localStorage.getItem('isLoggedIn') === 'true';
}


function logoutUser() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userName');
  localStorage.removeItem('userId');
}


function getCurrentUser() {
  if (!isLoggedIn()) {
    return null;
  }
  
  return {
    id: localStorage.getItem('userId'),
    email: localStorage.getItem('userEmail'),
    name: localStorage.getItem('userName'),
  };
}
