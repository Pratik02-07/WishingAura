# WishingAura - Birthday Experience Platform
Welcome to the Birthday Experience Platform — an exciting website that allows users to create, personalize, and share unforgettable birthday wishes. This platform gives users the power to create fully customizable birthday wishes using templates, photos, text, and optional music and animations. Scheduled wishes can be sent to friends and family, along with the ability to share personalized links.
WishingAura is a web application that allows users to create and share personalized birthday wishes with beautiful animations and effects.

## Features Added

1. **Responsive Design**
   - The application now works well on mobile, tablet, and desktop screens
   - Adaptive layouts and font sizes for different screen sizes
   - Mobile-friendly navigation with hamburger menu

2. **Enhanced Templates**
   - Added a new "Love" template with romantic theme
   - Each template now has unique animations and background gradients
   - Preview functionality to see how your wish will look before creating it

3. **Sophisticated Animations and Visual Effects**
   - Immersive full-screen experience with elegant particle systems
   - Dynamic canvas-based animations with geometric patterns
   - Professional text animations with reveal, blur, and typewriter effects
   - Atmospheric lighting effects including ambient glow and spotlights
   - Dark, modern UI with glass morphism effects
   - Elegant gradient backgrounds with subtle color shifts
   - Sequenced animation phases that evolve over time
   - Responsive design that works on all devices

4. **Sharing Functionality**
   - Copy link to clipboard
   - Share via email
   - Mobile-friendly share options

## How to Use

### Creating a Wish

1. Click on "Create Wish" from the home page or navigation bar
2. Choose a template (Classic, Modern, Funny, or Love)
3. Enter the recipient's name
4. Write your personalized message
5. Add your name as the sender
6. Optionally upload photos from your device (up to 5, max 5MB each)
7. Set a delivery date
8. Click "Preview Wish" to see how it will look
9. Click "Create Birthday Wish" to save and generate a shareable link

### Sharing a Wish

1. After creating a wish, you'll be redirected to the view page
2. Click "Share This Wish" to see sharing options
3. Copy the link to share via messaging apps or social media
4. Use the email option to send the wish directly via email
5. Share the link with friends and family so they can view the wish

### Viewing a Wish

When someone opens a wish link, they'll see:
- The personalized message with the recipient's name
- Beautiful animations based on the selected template
- Photos (if added)
- The sender's name
- Options to create their own wish

## Technical Implementation

The application uses:
- React with TypeScript for the frontend
- React Router for navigation
- Tailwind CSS for styling
- LocalStorage for storing wishes (in a production app, this would use a database)
- CSS animations for visual effects
- Firebase Authentication for user authentication (login/sign-up system).
- Firebase Firestore for storing user data, wishes, photos, and scheduling information.
- TinyURL (Auto-generated short links for easy sharing)
- Photo Upload:
  Users can upload their own photos to customize their birthday wishes (e.g., selfies, shared memories).
  Supports up to 5 photos per wish
  Maximum file size: 5MB per photo
  Supported formats: JPG, PNG, GIF, WEBP, HEIC
  Images are automatically optimized and delivered via CDN
  Secure direct uploads to Cloudinary


## Future Enhancements

Some ideas for future improvements:
- Add more templates and animation options
- Add music selection functionality
- Create reminder notifications for upcoming birthdays
- Add more sharing options (social media integrations)
-AI Integration (Text Generation):
 Users can input keywords (e.g., "John, pizza lover, marathon runner"), and the system will generate a personalized birthday wish using an AI model (e.g., GPT-3 or similar API).
 Use an AI model (e.g., GPT-3) to generate personalized birthday messages based on user input (e.g., "John, pizza lover, marathon runner").
 Integrate the AI service using an API.

License
This project is licensed under the MIT License.

Contact Information
Author: [Pratik]

Website: [https://pratikpatil07.netlify.app/]

Email: [Pratikpatil00005@gmail.com]

GitHub: [https://github.com/Pratik02-07]

Enjoy creating beautiful birthday wishes with WishingAura!
