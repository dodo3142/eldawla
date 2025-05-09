


const EMAILJS_USER_ID = 'tQIjWeaXlI7ZSUaHY'; 
const EMAILJS_SERVICE_ID = 'service_ficq1th'; 
const EMAILJS_BOOKING_TEMPLATE_ID = 'template_21qnue8'; 
const EMAILJS_CANCELLATION_TEMPLATE_ID = 'template_ooe0fda'; 


let emailJSInitialized = false;


function initEmailService() {
    
    if (emailJSInitialized) {
        console.log('EmailJS already initialized');
        return true;
    }
    
    
    try {
        emailjs.init(EMAILJS_USER_ID);
        console.log('EmailJS initialized successfully with ID:', EMAILJS_USER_ID);
        emailJSInitialized = true;
        return true;
    } catch (error) {
        console.error('Failed to initialize EmailJS:', error);
        return false;
    }
}


function sendBookingConfirmationEmail(bookingData) {
    
    if (!emailJSInitialized) {
        initEmailService();
    }
    
    
    const formattedCheckIn = formatDateForEmail(bookingData.checkIn);
    const formattedCheckOut = formatDateForEmail(bookingData.checkOut);
    

    const nights = calculateNights(bookingData.checkIn, bookingData.checkOut);
    

    const templateParams = {
        to_name: `${bookingData.guestInfo.firstName} ${bookingData.guestInfo.lastName}`,
        to_email: bookingData.guestInfo.email,
        booking_id: bookingData.id,
        room_name: bookingData.roomName,
        check_in: formattedCheckIn,
        check_out: formattedCheckOut,
        guests: bookingData.guests,
        nights: nights,
        total_price: bookingData.totalPrice,
        location: bookingData.location || 'Not specified',
        booking_date: formatDateForEmail(bookingData.bookingDate)
    };
    
    console.log('Sending booking confirmation email with params:', templateParams);
    console.log('Using service ID:', EMAILJS_SERVICE_ID);
    console.log('Using template ID:', EMAILJS_BOOKING_TEMPLATE_ID);
    

    return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_BOOKING_TEMPLATE_ID, templateParams)
        .then(response => {
            console.log('Email sent successfully:', response);
            return true;
        })
        .catch(error => {
            console.error('Email sending failed:', error);
            alert('Failed to send confirmation email. Please check the console for details.');
            return false;
        });
}


function sendBookingCancellationEmail(bookingData) {
    
    if (!emailJSInitialized) {
        initEmailService();
    }
    
    
    const formattedCheckIn = formatDateForEmail(bookingData.checkIn);
    const formattedCheckOut = formatDateForEmail(bookingData.checkOut);
    

    const templateParams = {
        to_name: `${bookingData.guestInfo.firstName} ${bookingData.guestInfo.lastName}`,
        to_email: bookingData.guestInfo.email,
        booking_id: bookingData.id,
        room_name: bookingData.roomName,
        check_in: formattedCheckIn,
        check_out: formattedCheckOut,
        cancellation_date: formatDateForEmail(new Date().toISOString().split('T')[0])
    };
    
    console.log('Sending cancellation email with params:', templateParams);
    console.log('Using service ID:', EMAILJS_SERVICE_ID);
    console.log('Using template ID:', EMAILJS_CANCELLATION_TEMPLATE_ID);
    

    return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_CANCELLATION_TEMPLATE_ID, templateParams)
        .then(response => {
            console.log('Cancellation email sent successfully:', response);
            return true;
        })
        .catch(error => {
            console.error('Cancellation email sending failed:', error);
            alert('Failed to send cancellation email. Please check the console for details.');
            return false;
        });
}


function formatDateForEmail(dateString) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}


function calculateNights(checkInDate, checkOutDate) {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    return Math.round((checkOut - checkIn) / (1000 * 60 * 60 * 24));
}
