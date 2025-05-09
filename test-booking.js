

function createTestBooking() {

    if (!isLoggedIn()) {
        console.error('Please log in first');
        return;
    }
    
    const user = getCurrentUser();
    console.log('Current user:', user);
    

    const testBooking = {
        id: 'BK' + Math.floor(100000 + Math.random() * 900000),
        roomId: 'room1',
        roomName: 'Deluxe Suite',
        checkIn: '2025-06-01',
        checkOut: '2025-06-05',
        guests: 2,
        totalPrice: '$800',
        bookingDate: new Date().toISOString().split('T')[0],
        status: 'confirmed',
        guestInfo: {
            firstName: user.name.split(' ')[0] || 'Guest',
            lastName: user.name.split(' ')[1] || 'User',
            email: user.email
        }
    };
    

    const bookingsKey = `bookings_${user.id}`;
    const existingBookings = JSON.parse(localStorage.getItem(bookingsKey) || '[]');
    existingBookings.push(testBooking);
    localStorage.setItem(bookingsKey, JSON.stringify(existingBookings));
    
    console.log('Test booking created:', testBooking);
    console.log('All bookings:', existingBookings);
    
    return testBooking;
}


createTestBooking();
