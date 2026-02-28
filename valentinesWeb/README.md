# valentinesWeb — Overview
- An interactive Valentine's Day web application that creates a romantic and playful experience for asking someone to be your Valentine.

## Features

- **Multi-screen Experience**: Guided journey through letter opening, password entry, and the big question
- **Interactive Elements**: 
  - Animated envelope opening
  - Password protection (default: "valentines")
  - Evasive "No" button that runs away from your cursor
  - Guilt-trip messages that appear when clicking "No"
- **Visual Effects**:
  - Floating hearts background with click interactions
  - Confetti celebration on "Yes"
  - Heart explosion animations
  - Typing text effects
  - Smooth screen transitions
- **Responsive Design**: Works on desktop and mobile devices
- **GIF Integration**: Romantic and playful GIFs throughout the experience

## Quick Start

1. Clone or download this project
2. Open `index.html` in your web browser
3. Enter the password: `valentines`
4. Enjoy the interactive experience!

## Project Structure

```
valentinesWeb/
├── index.html      # Main HTML structure
├── design.css      # Styling and animations
├── script.js       # Interactive functionality
└── README.md       # This file
```

## How It Works

### Screen Flow
1. **Letter Screen**: Click "Open Letter" to reveal an animated envelope
2. **Login Screen**: Enter the secret password to proceed
3. **Valentine Screen**: The main question with interactive Yes/No buttons
4. **Success Screen**: Celebration screen with confetti and hearts

### Interactive Features
- **Evasive No Button**: The "No" button moves away when you get close to it
- **Progressive Guilt Messages**: Each "No" click shows a different message
- **Final Override**: After 7 "No" clicks, the choice is made for you!
- **Click Hearts**: Click floating hearts to create burst effects

## Customization

### Change the Password
Edit `script.js` line 2:
```javascript
const PASSWORD = "your_custom_password";
```

### Modify Messages
Update the guilt messages in `script.js` (lines 32-39):
```javascript
const guiltMessages = [
  "Your custom message 1",
  "Your custom message 2",
  // ...add more messages
];
```

### Personalize Content
Edit the text content in `index.html` to customize:
- Letter message
- Question text
- Success messages
- Button labels

## Technologies Used

- **HTML5**: Semantic structure and content
- **CSS3**: Animations, transitions, and responsive design
- **Vanilla JavaScript**: Interactive functionality and DOM manipulation
- **Giphy API**: Embedded GIF animations

## Key Animations

- **Envelope Opening**: CSS transform animation
- **Heart Floating**: Continuous background animation
- **Confetti**: Particle system with random colors
- **Heart Explosion**: Radial burst effect
- **Screen Transitions**: Fade in/out animations
- **Button Evasion**: Dynamic positioning with cooldown

## Browser Compatibility

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

## Use Cases

- Valentine's Day proposals
- Anniversary celebrations
- Romantic gestures
- Fun interactive experiences
- Web development demonstrations

## Contributing

Feel free to fork this project and make it your own! Some ideas for enhancements:
- Add more animations
- Include sound effects
- Add more screen transitions
- Create different themes
- Add local storage for personalization

## License

This project is open source and available under the MIT License.
