
document.addEventListener('DOMContentLoaded', function() {

    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    if (nav && navLinks && window.innerWidth <= 768) {
        nav.insertBefore(mobileMenuBtn, navLinks);
        
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });


    const currentLocation = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        if (item.getAttribute('href') === currentLocation ||
            (currentLocation.includes('.html') && item.getAttribute('href') === currentLocation) ||
            (currentLocation.includes('rooms.html') && item.getAttribute('href') === 'rooms.html') ||
            (currentLocation.includes('index.html') && item.getAttribute('href') === 'index.html')) {
            item.classList.add('active');
        }
    });


    if (document.getElementById('room-content') && document.getElementById('loading')) {
        initializeRoomDetailPage();
    }



    attachBookingHandlers();


    const featureCards = document.querySelectorAll('.feature-card');
    if (featureCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.1
        });

        featureCards.forEach(card => {
            observer.observe(card);
        });
    }


    initializeThemeSwitch();
});


function attachBookingHandlers() {

    const bookButtons = document.querySelectorAll('.room-card .btn');
    bookButtons.forEach(button => {
        button.addEventListener('click', function(e) {

            if (!this.getAttribute('href') || !this.getAttribute('href').includes('book-room.html')) {      
                e.preventDefault();


                const roomCard = this.closest('.room-card');
                if (!roomCard) return;
                
                const roomName = roomCard.querySelector('h3')?.textContent;
                const roomPrice = roomCard.querySelector('.price')?.textContent;
                const roomId = getRoomIdFromName(roomName);

                if (roomId) {
                    window.location.href = `book-room.html?id=${roomId}`;
                } else {
                    localStorage.setItem('selectedRoom', JSON.stringify({
                        name: roomName,
                        price: roomPrice,
                        checkIn: getTomorrow(),
                        checkOut: getDayAfterTomorrow(),
                        guests: 2
                    }));

                    window.location.href = 'booking.html';
                }
            }
        });
    });
}

function getRoomIdFromName(roomName) {
    if (!roomName) return '';
    return roomName.toLowerCase().replace(/\s+/g, '-');
}

function initializeRoomDetailPage() {
    const loading = document.getElementById('loading');
    const roomContent = document.getElementById('room-content');
    const roomNotFound = document.getElementById('room-not-found');
    
    if (!loading || !roomContent) return;

    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get('id');
    
    if (!roomId) {
        const pathParts = window.location.pathname.split('/');
        const filename = pathParts[pathParts.length - 1];
        
        if (filename !== 'book-room.html') {
            const possibleRoomId = filename.replace('.html', '');
            if (possibleRoomId) {
                fetchAndDisplayRoom(possibleRoomId);
            } else {
                showRoomNotFound();
            }
        } else {
            showRoomNotFound();
        }
    } else {
        fetchAndDisplayRoom(roomId);
    }
    
    function fetchAndDisplayRoom(roomId) {
        fetch('rooms.json')
            .then(response => response.json())
            .then(data => {
                const room = data.rooms.find(r => r.id === roomId);
                
                if (!room) {
                    showRoomNotFound();
                    return;
                }
                
                document.title = `${room.name} - RoomRent`;
                
                const roomName = document.getElementById('room-name');
                const roomLocation = document.getElementById('room-location');
                const ratingStars = document.getElementById('rating-stars');
                const ratingText = document.getElementById('rating-text');
                const roomPrice = document.getElementById('room-price');
                const roomDescription = document.getElementById('room-description');
                const featureList = document.getElementById('feature-list');
                const roomGallery = document.getElementById('room-gallery');
                const locationArea = document.getElementById('location-area');
                const roomTypeText = document.getElementById('room-type-text');
                
                if (roomName) roomName.textContent = room.name;
                if (roomLocation) roomLocation.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${room.location}`;
                
                if (ratingStars && ratingText) {
                    ratingStars.innerHTML = '';
                    const fullStars = Math.floor(room.rating);
                    const hasHalfStar = room.rating % 1 >= 0.5;
                    
                    for (let i = 0; i < fullStars; i++) {
                        ratingStars.innerHTML += '<i class="fas fa-star"></i>';
                    }
                    
                    if (hasHalfStar) {
                        ratingStars.innerHTML += '<i class="fas fa-star-half-alt"></i>';
                    }
                    
                    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
                    for (let i = 0; i < remainingStars; i++) {
                        ratingStars.innerHTML += '<i class="far fa-star"></i>';
                    }
                    
                    ratingText.textContent = `${room.rating} (${room.reviews} reviews)`;
                }
                
                if (roomPrice) roomPrice.textContent = `${room.currency}${room.price}`;
                if (roomDescription) roomDescription.textContent = room.description;
                
                if (featureList) {
                    featureList.innerHTML = '';
                    room.features.forEach(feature => {
                        const featureItem = document.createElement('div');
                        featureItem.className = 'feature-item';
                        featureItem.innerHTML = `
                            <i class="${feature.icon}"></i>
                            <span>${feature.name}</span>
                        `;
                        featureList.appendChild(featureItem);
                    });
                }
                
                if (roomGallery) {
                    roomGallery.innerHTML = '';
                    if (room.gallery && room.gallery.length > 0) {
                        const mainImage = document.createElement('div');
                        mainImage.className = 'main-image';
                        mainImage.innerHTML = `<img src="${room.gallery[0]}" alt="${room.name} Main Image">`;
                        roomGallery.appendChild(mainImage);
                        
                        for (let i = 1; i < Math.min(3, room.gallery.length); i++) {
                            const thumbnail = document.createElement('div');
                            thumbnail.className = 'thumbnail';
                            thumbnail.innerHTML = `<img src="${room.gallery[i]}" alt="${room.name} Image ${i+1}">`;
                            roomGallery.appendChild(thumbnail);
                        }
                    }
                }
                
                if (locationArea && roomTypeText) {
                    const locationParts = room.location.split(',');
                    locationArea.textContent = locationParts[0].trim();
                    roomTypeText.textContent = room.name.toLowerCase();
                }
                
                setupBookingForm(room);
                
                setupSimilarRooms(room, data.rooms);
                
                if (loading) loading.style.display = 'none';
                if (roomContent) roomContent.style.display = 'block';
                if (roomNotFound) roomNotFound.style.display = 'none';
                
                setupGallery();
            })
            .catch(error => {
                console.error('Error loading room data:', error);
                showRoomNotFound();
            });
    }
    
    function showRoomNotFound() {
        if (loading) loading.style.display = 'none';
        if (roomContent) roomContent.style.display = 'none';
        if (roomNotFound) roomNotFound.style.display = 'block';
    }
    
    function setupBookingForm(room) {
        const checkInInput = document.getElementById('check-in');
        const checkOutInput = document.getElementById('check-out');
        const guestsSelect = document.getElementById('guests');
        const bookNowBtn = document.querySelector('.book-now-btn');
        
        if (!checkInInput || !checkOutInput || !guestsSelect || !bookNowBtn) return;
        
        const today = new Date().toISOString().split('T')[0];
        checkInInput.min = today;
        
        const tomorrow = new Date(Date.now() + 86400000);
        const dayAfterTomorrow = new Date(Date.now() + 2 * 86400000);
        checkOutInput.min = tomorrow.toISOString().split('T')[0];
        checkOutInput.valueAsDate = dayAfterTomorrow;
        
        if (room.maxGuests) {
            for (let i = 1; i <= 4; i++) {
                const option = guestsSelect.querySelector(`option[value="${i}"]`);
                if (option) {
                    if (i > room.maxGuests) {
                        option.disabled = true;
                    } else if (i === room.maxGuests) {
                        option.selected = true;
                    }
                }
            }
        }
        
        checkInInput.addEventListener('change', function() {
            const nextDay = new Date(this.value);
            nextDay.setDate(nextDay.getDate() + 1);
            checkOutInput.min = nextDay.toISOString().split('T')[0];
            
            if (new Date(checkOutInput.value) <= new Date(this.value)) {
                checkOutInput.valueAsDate = nextDay;
            }
        });
        
        bookNowBtn.addEventListener('click', function() {
            const checkIn = checkInInput.value;
            const checkOut = checkOutInput.value;
            const guests = guestsSelect.value;
            
            if (checkIn && checkOut) {
                const selectedRoom = {
                    name: room.name,
                    price: `${room.currency}${room.price}/night`,
                    checkIn: checkIn,
                    checkOut: checkOut,
                    guests: guests,
                    location: room.location,
                    image: room.image || (room.gallery && room.gallery.length > 0 ? room.gallery[0] : '')
                };
                
                localStorage.setItem('selectedRoom', JSON.stringify(selectedRoom));
                
                window.location.href = 'booking.html';
            } else {
                alert('Please select check-in and check-out dates.');
            }
        });
    }
    
    function setupSimilarRooms(currentRoom, allRooms) {
        const similarRoomsGrid = document.getElementById('similar-rooms');
        if (!similarRoomsGrid) return;
        
        similarRoomsGrid.innerHTML = '';
        
        const similarRooms = allRooms
            .filter(room => room.id !== currentRoom.id && 
                (room.type === currentRoom.type || 
                Math.abs(room.price - currentRoom.price) <= 50))
            .slice(0, 3);
        
        if (similarRooms.length === 0) {
            const similarRoomsSection = document.querySelector('.similar-rooms');
            if (similarRoomsSection) similarRoomsSection.style.display = 'none';
            return;
        }
        
        similarRooms.forEach(room => {
            let amenitiesHTML = '';
            const displayedAmenities = room.amenities.slice(0, 2);
            displayedAmenities.forEach(amenity => {
                amenitiesHTML += `<span><i class="${amenity.icon}"></i> ${amenity.name}</span>`;
            });
            
            const roomCard = document.createElement('div');
            roomCard.className = 'room-card';
            roomCard.innerHTML = `
                <img src="${room.image}" alt="${room.name}">
                <div class="room-info">
                    <h3>${room.name}</h3>
                    <p class="room-location"><i class="fas fa-map-marker-alt"></i> ${room.location}</p>
                    <p class="price">${room.currency}${room.price}/night</p>
                    <div class="room-amenities">
                        ${amenitiesHTML}
                    </div>
                    <a href="book-room.html?id=${room.id}" class="btn">View Details</a>
                </div>
            `;
            
            similarRoomsGrid.appendChild(roomCard);
        });
    }
}

function setupGallery() {
    const galleryImages = document.querySelectorAll('.room-gallery img');
    const overlay = document.querySelector('.fullscreen-overlay');
    const fullscreenImage = document.querySelector('.fullscreen-image');
    const closeBtn = document.querySelector('.close-btn');
    
    if (!overlay || !fullscreenImage || !closeBtn || galleryImages.length === 0) return;
    
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            fullscreenImage.src = this.src;
            overlay.classList.add('active');
        });
    });
    
    closeBtn.addEventListener('click', function() {
        overlay.classList.remove('active');
    });
    
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            overlay.classList.remove('active');
        }
    });
}

function initializeThemeSwitch() {
    const themeSwitch = document.getElementById("checkbox");
    if (!themeSwitch) return;
    
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const currentTheme = localStorage.getItem("theme");
    
    if (currentTheme === "dark" || (!currentTheme && prefersDarkScheme.matches)) {
        document.documentElement.setAttribute("data-theme", "dark");
        themeSwitch.checked = true;
    }
    
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

function getTomorrow() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
}

function getDayAfterTomorrow() {
    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
    return dayAfterTomorrow.toISOString().split('T')[0];
} 