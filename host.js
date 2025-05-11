document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();
    initializeThemeSwitch();
    setupFormSubmission();
});

// check if the user is logged in
function checkAuthStatus() {
    const authRequired = document.getElementById('auth-required');
    const hostFormWrapper = document.getElementById('host-form-wrapper');

    if (typeof isLoggedIn === 'function') {
        if (!isLoggedIn()) {
            authRequired.style.display = 'block';
            hostFormWrapper.style.display = 'none';
        } else {
            authRequired.style.display = 'none';
            hostFormWrapper.style.display = 'block';
        }
    } else {
        console.error('Authentication functions not available');
    }
}

// initialize theme switch functionality
function initializeThemeSwitch() {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const currentTheme = localStorage.getItem("theme");
    
    if (currentTheme === "dark" || (!currentTheme && prefersDarkScheme.matches)) {
        document.documentElement.setAttribute("data-theme", "dark");
        document.getElementById("checkbox").checked = true;
    }
    
    const themeSwitch = document.getElementById("checkbox");
    themeSwitch.addEventListener("change", function(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
        }
    });
}

// setup form submission handler
function setupFormSubmission() {
    const hostForm = document.getElementById('host-form');
    
    if (!hostForm) return;
    
    hostForm.addEventListener('submit', function(e) {
        e.preventDefault();        
        const roomData = collectFormData();
        submitRoomData(roomData);
    });
}

// collect form data and format it for submission
function collectFormData() {

    const roomName = document.getElementById('room-name').value;
    const roomType = document.getElementById('room-type').value;
    const location = document.getElementById('location').value;
    const price = parseInt(document.getElementById('price').value);
    const maxGuests = parseInt(document.getElementById('max-guests').value);
    const description = document.getElementById('description').value;
    const roomSize = document.getElementById('room-size').value;
    
    const bedTypeRadios = document.querySelectorAll('input[name="bed-type"]');
    let bedType = '';
    for (const radio of bedTypeRadios) {
        if (radio.checked) {
            bedType = radio.value;
            break;
        }
    }
    
    let bedName = '';
    switch (bedType) {
        case 'single':
            bedName = 'Single Bed';
            break;
        case 'double':
            bedName = 'Double Bed';
            break;
        case 'queen':
            bedName = 'Queen-size Bed';
            break;
        case 'king':
            bedName = 'King-size Bed';
            break;
        case 'twin':
            bedName = 'Twin Beds';
            break;
        default:
            bedName = 'Bed';
    }
    
    const amenityCheckboxes = document.querySelectorAll('input[name="amenities"]:checked');
    const selectedAmenities = Array.from(amenityCheckboxes).map(cb => cb.value);
    
    let imageUrl;
    const defaultImages = {
        'standard': 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af',
        'suite': 'https://images.unsplash.com/photo-1618773928121-c32242e63f39',
        'budget': 'https://images.unsplash.com/photo-1566665797739-1674de7a421a'
    };
    imageUrl = defaultImages[roomType] || 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af';
    
    const imageUrlInput = document.getElementById('image-url');
    if (imageUrlInput && imageUrlInput.value) {
        imageUrl = imageUrlInput.value;
    }
    
    const roomId = generateRoomId(roomName);
    
    // create amenities array with icons
    const amenitiesArray = [];
    if (selectedAmenities.includes('wifi')) {
        amenitiesArray.push({name: "Free Wi-Fi", icon: "fas fa-wifi"});
    }
    if (selectedAmenities.includes('breakfast')) {
        amenitiesArray.push({name: "Breakfast", icon: "fas fa-utensils"});
    }
    if (selectedAmenities.includes('air-conditioning')) {
        amenitiesArray.push({name: "Air Conditioning", icon: "fas fa-snowflake"});
    }
    if (selectedAmenities.includes('tv')) {
        amenitiesArray.push({name: "TV", icon: "fas fa-tv"});
    }
    if (selectedAmenities.includes('kitchen')) {
        amenitiesArray.push({name: "Kitchen", icon: "fas fa-utensils"});
    }
    if (selectedAmenities.includes('sea-view')) {
        amenitiesArray.push({name: "Sea View", icon: "fas fa-water"});
    }
    
    const featuresArray = [
        {name: bedName, icon: "fas fa-bed"},
        {name: `${roomSize} m²`, icon: "fas fa-ruler-combined"},
    ];
    
    // add amenities to features 
    if (selectedAmenities.includes('wifi')) {
        featuresArray.push({name: "Free Wi-Fi", icon: "fas fa-wifi"});
    }
    if (selectedAmenities.includes('tv')) {
        featuresArray.push({name: "TV", icon: "fas fa-tv"});
    }
    if (selectedAmenities.includes('air-conditioning')) {
        featuresArray.push({name: "Air Conditioning", icon: "fas fa-snowflake"});
    }
    if (selectedAmenities.includes('breakfast')) {
        featuresArray.push({name: "Breakfast", icon: "fas fa-utensils"});
    }
    if (selectedAmenities.includes('kitchen')) {
        featuresArray.push({name: "Kitchen", icon: "fas fa-utensils"});
    }
    if (selectedAmenities.includes('parking')) {
        featuresArray.push({name: "Parking", icon: "fas fa-parking"});
    }
    if (selectedAmenities.includes('washer')) {
        featuresArray.push({name: "Laundry", icon: "fas fa-tshirt"});
    }
    if (selectedAmenities.includes('pool')) {
        featuresArray.push({name: "Pool", icon: "fas fa-swimming-pool"});
    }
    if (selectedAmenities.includes('jacuzzi')) {
        featuresArray.push({name: "Jacuzzi", icon: "fas fa-hot-tub"});
    }
    if (selectedAmenities.includes('gym')) {
        featuresArray.push({name: "Gym", icon: "fas fa-dumbbell"});
    }
    if (selectedAmenities.includes('sea-view')) {
        featuresArray.push({name: "Sea View", icon: "fas fa-water"});
    }
    if (selectedAmenities.includes('balcony')) {
        featuresArray.push({name: "Balcony", icon: "fas fa-door-open"});
    }
    
    const gallery = [
        imageUrl,
        imageUrl + '?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        imageUrl + '?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=70'
    ];
    
    const roomData = {
        id: roomId,
        name: roomName,
        type: roomType,
        location: location,
        description: description,
        price: price,
        currency: "$",
        rating: 0.0, // default initial rating
        reviews: 0,  
        maxGuests: maxGuests,
        image: imageUrl,
        gallery: gallery,
        amenities: amenitiesArray,
        features: featuresArray
    };
    
    return roomData;
}

// unique room ID based on the room name
function generateRoomId(roomName) {
    let id = roomName.toLowerCase().replace(/\s+/g, '-');
    id = id.replace(/[^a-z0-9-]/g, '');
    id = id + '-' + Date.now().toString().slice(-6);
    return id;
}

// submit the room data 
function submitRoomData(roomData) {
    fetch('/api/rooms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(roomData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Room added successfully via API', data);
        showSuccessMessage();
    })
    .catch(error => {
        console.error('API submission failed', error);
        showErrorMessage('Failed to save room' + error.message);
    });
}

// Show success message
function showSuccessMessage() {
    const successMessage = document.getElementById('success-message');
    const hostForm = document.getElementById('host-form');
    
    successMessage.style.display = 'block';
    hostForm.reset();
    
    successMessage.scrollIntoView({ behavior: 'smooth' });
}

// Show error message
function showErrorMessage(message) {
    const errorMessage = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');
    
    errorText.textContent = message || 'There was an error processing your request';
    errorMessage.style.display = 'block';
    
    errorMessage.scrollIntoView({ behavior: 'smooth' });
}