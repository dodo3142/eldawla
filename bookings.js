


function saveBooking(bookingData) {
    const user = getCurrentUser();
    if (!user) {
        console.error('Cannot save booking: User not logged in');
        return false;
    }
    
    if (!bookingData.id) {
        bookingData.id = 'BK' + Math.floor(100000 + Math.random() * 900000);
    }
    
    if (!bookingData.bookingDate) {
        bookingData.bookingDate = new Date().toISOString().split('T')[0];
    }
    
    if (!bookingData.status) {
        bookingData.status = 'confirmed';
    }
    
    const bookings = getBookings();
    
    bookings.push(bookingData);
    
    const bookingsKey = `bookings_${user.id}`;
    localStorage.setItem(bookingsKey, JSON.stringify(bookings));
    
    console.log('Booking saved:', bookingData);
    console.log('All bookings:', bookings);
    
    return bookingData.id;
}


function getBookings() {
    const user = getCurrentUser();
    if (!user) {
        console.error('Cannot get bookings: User not logged in');
        return [];
    }
    
    
    const bookingsKey = `bookings_${user.id}`;
    const bookingsJson = localStorage.getItem(bookingsKey);
    
    if (!bookingsJson) {
        return [];
    }
    
    return JSON.parse(bookingsJson);
}


function getBookingById(bookingId) {
    const bookings = getBookings();
    return bookings.find(booking => booking.id === bookingId);
}


function cancelBooking(bookingId) {
    const user = getCurrentUser();
    if (!user) {
        console.error('Cannot cancel booking: User not logged in');
        return false;
    }
    
    
    const bookings = getBookings();
    

    const bookingIndex = bookings.findIndex(booking => booking.id === bookingId);
    
    if (bookingIndex === -1) {
        console.error('Booking not found:', bookingId);
        return false;
    }
    

    bookings.splice(bookingIndex, 1);
    

    const bookingsKey = `bookings_${user.id}`;
    localStorage.setItem(bookingsKey, JSON.stringify(bookings));
    
    return true;
}


function calculateNights(checkInDate, checkOutDate) {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    return Math.round((checkOut - checkIn) / (1000 * 60 * 60 * 24));
}


function formatBookingDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}
