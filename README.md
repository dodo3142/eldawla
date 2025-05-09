# RoomRent - Room Booking Website

## Overview
RoomRent is a modern e-commerce website for booking rooms and accommodations. It provides a user-friendly interface for browsing available rooms, viewing details, and making reservations. This platform connects travelers with property owners, offering a seamless booking experience with secure payment processing and user account management. The application is built with a focus on performance, accessibility, and responsive design to ensure all users have an optimal experience regardless of their device.

## Features

- **Responsive Design**: The website automatically adapts to different screen sizes (mobile phones, tablets, laptops, desktops) ensuring a consistent user experience across all devices.
- **Modern UI/UX**: Clean, intuitive interface with smooth animations and transitions that enhance user engagement and satisfaction.
- **Advanced Room Browsing**: Interactive filtering system allowing users to search by location, price range, amenities, dates, and guest capacity.
- **Detailed Room Information**: Comprehensive room profiles with high-quality images, amenities list, host information, location maps, and verified guest reviews.
- **Secure Booking System**: End-to-end encrypted booking process with multiple payment options and confirmation system.
- **User Authentication**: Secure login/signup system with email verification, password recovery, and persistent sessions using IndexedDB for data storage.
- **Interactive Contact System**: User-friendly contact forms with form validation and automated email response.
- **Mobile-First Navigation**: Touch-optimized navigation elements designed specifically for mobile users with hamburger menus and swipe gestures.

## Pages

1. **Home Page** (`index.html`)
   - **Hero Section**: Eye-catching banner with high-quality background image and prominent call-to-action buttons to encourage immediate engagement.
   - **Featured Rooms**: Carousel display of premium and popular accommodations with quick-view options and direct booking links.
   - **Why Choose Us**: Highlighted unique selling points with icons and concise descriptions explaining the benefits of using our platform.
   - **Testimonials**: Real customer reviews with ratings, photos, and verified stay badges to build trust and credibility.
   - **Newsletter Signup**: Email subscription form for promotional offers and updates.

2. **Rooms Page** (`rooms.html`)
   - **Room Grid**: Responsive card layout displaying all available accommodations with thumbnail images, basic information, and pricing.
   - **Advanced Filtering**: Interactive sidebar with multiple filter options including price range sliders, amenity checkboxes, location dropdown, and date pickers.
   - **Sort Options**: Ability to sort results by price, rating, popularity, or newest listings.
   - **Map View Toggle**: Option to switch between grid view and map view for location-based browsing.
   - **Lazy Loading**: Performance optimization that loads room data as the user scrolls for faster initial page load.

3. **Room Detail Page** (`book-room.html`)
   - **Image Gallery**: High-resolution photo gallery with fullscreen view option and thumbnail navigation.
   - **Comprehensive Details**: Complete room specifications including square footage, bed types, bathroom count, and all amenities.
   - **Availability Calendar**: Interactive calendar showing available dates and pricing variations.
   - **Host Information**: Profile of the property owner with verification badges, response rate, and contact options.
   - **Guest Reviews**: Detailed feedback from previous guests with category ratings and host responses.
   - **Similar Listings**: Recommended alternative accommodations based on user preferences.

4. **Booking Page** (`booking.html`)
   - **Streamlined Form**: User-friendly booking form with minimal required fields to reduce abandonment.
   - **Room Summary**: Confirmation of selected accommodation with key details and thumbnail.
   - **Date Selection**: Interactive date picker with visual indication of available dates and minimum stay requirements.
   - **Guest Information**: Fields for guest count, special requirements, and purpose of travel.
   - **Special Requests**: Text area for communicating specific needs to the host.
   - **Payment Integration**: Secure payment processing with multiple payment method options.
   - **Booking Policies**: Clear presentation of cancellation policies, house rules, and terms of service.

5. **User Account Pages** (`login.html`, `signup.html`, `profile.html`)
   - **Authentication**: Secure login and registration forms with validation and social login options.
   - **Profile Management**: User dashboard for managing personal information, payment methods, and preferences.
   - **Booking History**: List of past, current, and upcoming reservations with status indicators.
   - **Saved Listings**: Favorites section for rooms the user has bookmarked for future reference.
   - **Reviews Management**: Interface for leaving, editing, and viewing submitted reviews.

6. **Contact Page** (`contact.html`)
   - **Dynamic Contact Form**: Interactive form with real-time validation and submission feedback.
   - **Location Information**: Interactive map showing company headquarters and regional offices.
   - **Support Details**: Various contact channels including email, phone, live chat, and social media.
   - **FAQ Section**: Expandable frequently asked questions to address common inquiries.
   - **Support Hours**: Clear display of customer service availability hours by region.

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone [repository-url]
   ```
   This command creates a local copy of the project on your machine by downloading all files from the remote repository. Replace `[repository-url]` with the actual URL of the git repository.

2. **Navigate to the Project Directory**:
   ```bash
   cd roomrent
   ```
   This command changes your current directory to the project folder. If the repository was cloned with a different name, replace 'roomrent' with the actual folder name.

3. **Project Structure Exploration**:
   Open the project in your preferred code editor (VS Code, Sublime Text, Atom, etc.). Take time to explore the file structure:
   - `/css`: Contains all stylesheet files
   - `/js`: Contains JavaScript files including auth.js for user authentication
   - `/images`: Contains all image assets
   - `/data`: Contains JSON data files for rooms and user information
   - HTML files in the root directory represent different pages

4. **Start a Local Development Server**:
   A local server is required to properly load external resources and test functionality. Choose one of these methods:
   
   - **Using Python** (recommended for beginners):
     ```bash
     python -m http.server
     ```
     For Python 2.x use:
     ```bash
     python -m SimpleHTTPServer
     ```
   
   - **Using Node.js and http-server**:
     ```bash
     npm install -g http-server
     http-server
     ```
   
   - **Using VS Code Live Server extension**:
     Install the Live Server extension and click "Go Live" in the status bar

5. **Access the Website**:
   ```
   http://localhost:8000
   ```
   Open this URL in your web browser. The port number might differ depending on the server you're using (e.g., Live Server typically uses port 5500).

6. **Test User Accounts**:
   The system comes with pre-configured test accounts for demonstration:
   - Regular User: username: `user@example.com`, password: `password123`
   - Host: username: `host@example.com`, password: `password123`

## Technologies Used

- **HTML5**: Provides the structural foundation of the website using semantic elements for better accessibility and SEO. Features include:
  - Semantic tags (`<header>`, `<footer>`, `<section>`, etc.) for improved document structure
  - Form validation attributes for client-side validation
  - Local storage API for saving user preferences
  - Responsive image handling with `srcset` and `sizes` attributes

- **CSS3**: Handles all styling and animations with advanced features including:
  - Flexbox and Grid layouts for responsive design
  - CSS Variables for consistent theming and dark mode support
  - Media queries for device-specific styling
  - Transitions and animations for enhanced user experience
  - CSS custom properties for theme management

- **JavaScript (ES6+)**: Powers the interactive elements and business logic:
  - Fetch API for asynchronous data retrieval
  - Promises and async/await for handling asynchronous operations
  - ES6 modules for code organization
  - IndexedDB for client-side data persistence
  - Event delegation for efficient event handling
  - Template literals for dynamic HTML generation

- **Font Awesome 5**: Provides scalable vector icons that enhance the UI:
  - Used for navigation elements, buttons, and feature illustrations
  - Ensures consistent icon rendering across all devices and screen sizes
  - Reduces the need for image assets, improving load times

- **Google Fonts**: Supplies custom typography:
  - Primary font: Roboto for body text (optimized for readability)
  - Secondary font: Playfair Display for headings (adds elegance)
  - Web-optimized formats (woff2) for faster loading
  - Font display swap for text visibility during font loading

## Browser Support

- **Chrome (latest)**: Fully optimized for Google Chrome with complete feature support and testing. Best experience on versions 90+.

- **Firefox (latest)**: Thoroughly tested on Mozilla Firefox with special attention to CSS Grid implementation differences. Recommended version 88+.

- **Safari (latest)**: Compatible with Apple's Safari browser including iOS and macOS versions. Some WebKit-specific CSS prefixes are included for better rendering. Minimum supported version is Safari 14+.

- **Edge (latest)**: Full support for Microsoft Edge (Chromium-based). Legacy Edge (EdgeHTML) is supported with minor visual differences. Recommended version is 90+.

- **Opera (latest)**: Complete compatibility with Opera browser. Minimum supported version is Opera 76+.

**Note**: The application uses feature detection rather than browser detection to ensure maximum compatibility. Progressive enhancement techniques are implemented so that core functionality works even in older browsers, while modern browsers receive enhanced visual and interactive experiences.

## Contributing

1. **Fork the Repository**: 
   - Click the 'Fork' button at the top right of the repository page on GitHub
   - This creates a copy of the repository in your GitHub account
   - Use this copy to make and test your changes without affecting the original project

2. **Create Your Feature Branch**: 
   ```bash
   git checkout -b feature/AmazingFeature
   ```
   - This command creates a new branch named 'feature/AmazingFeature' and switches to it
   - Always create a new branch for each feature or bugfix
   - Use descriptive branch names that reflect the purpose (e.g., 'feature/add-payment-gateway', 'bugfix/login-validation')

3. **Make Your Changes**:
   - Implement your feature or fix following the project's coding standards
   - Keep changes focused on a single purpose to simplify review
   - Add appropriate comments and documentation
   - Test your changes thoroughly across supported browsers

4. **Commit Your Changes**: 
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
   - Write clear, concise commit messages that explain the 'what' and 'why' of your changes
   - Follow conventional commit message format if possible (e.g., 'feat: add payment integration')
   - Make small, logical commits rather than large, sweeping changes

5. **Push to Your Branch**: 
   ```bash
   git push origin feature/AmazingFeature
   ```
   - This uploads your changes to your forked repository on GitHub
   - Verify your changes appear correctly in your fork before proceeding

6. **Open a Pull Request**:
   - Go to the original repository you forked from
   - Click 'New Pull Request' and select your fork and branch
   - Fill out the PR template with details about your changes
   - Link any related issues by mentioning them in the description (e.g., 'Fixes #123')
   - Request review from maintainers

7. **Code Review Process**:
   - Be responsive to feedback and make requested changes
   - Update your PR by pushing additional commits to your branch
   - Engage constructively in discussions about implementation approaches
   - Once approved, your changes will be merged into the main project

8. **Contribution Guidelines**:
   - Follow the existing code style and naming conventions
   - Add unit tests for new functionality
   - Update documentation for any changed features
   - Ensure all tests pass before submitting your PR

## License

This project is licensed under the MIT License - see the LICENSE file for details.

**MIT License Explained**:
- **Permissions**: This permissive license allows users to freely use, modify, distribute, and sell the software with minimal restrictions.
- **Requirements**: Users must include the original copyright notice and license disclaimer in any substantial portions of the software or documentation.
- **Limitations**: The license provides no warranty or liability protection, meaning the authors cannot be held liable for any issues arising from the software's use.
- **Commercial Use**: The MIT License explicitly permits commercial use, making it ideal for both personal and business applications.
- **Why MIT?**: We chose the MIT License for its simplicity and flexibility, encouraging widespread adoption and collaboration while protecting original contributors.

## Contact

For any queries or support, please contact:

- **General Inquiries**:
  - Email: info@roomrent.com
  - Response time: Within 24 hours on business days

- **Technical Support**:
  - Email: support@roomrent.com
  - Priority assistance for booking issues and account problems
  - Available Monday-Friday, 9 AM - 6 PM (EST)

- **Phone Support**:
  - Main: +1 (555) 123-4567
  - International: +44 20 7946 0958
  - Hours: Monday-Friday, 9 AM - 6 PM (EST)

- **Business Development**:
  - For partnership opportunities: partners@roomrent.com

- **Social Media**:
  - Twitter: [@RoomRentOfficial](https://twitter.com/RoomRentOfficial)
  - Facebook: [facebook.com/RoomRent](https://facebook.com/RoomRent)
  - Instagram: [@roomrent](https://instagram.com/roomrent)

- **Headquarters**:
  - RoomRent Inc.
  - 123 Booking Street
  - Suite 456
  - New York, NY 10001
  - United States