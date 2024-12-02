# Guide: Adding a Theme Switcher Toggle to Your Website

1. **Set Up HTML Structure**  
   Create a button or toggle element in your HTML to act as the theme switcher.  
   ```html
   <button id="theme-toggle">Switch Theme</button>
   ```

2. **Add Basic CSS for Light and Dark Themes**  
   Define the styles for both light and dark themes. Use CSS variables to make theme switching easier.  
   ```css
   :root {
     --background-color-light: #ffffff;
     --text-color-light: #000000;
     --background-color-dark: #121212;
     --text-color-dark: #ffffff;
   }

   body {
     background-color: var(--background-color-light);
     color: var(--text-color-light);
     transition: background-color 0.3s, color 0.3s;
   }

   body.dark-theme {
     background-color: var(--background-color-dark);
     color: var(--text-color-dark);
   }
   ```

3. **JavaScript to Toggle Theme**  
   Write JavaScript to toggle the theme when the button is clicked. This also saves the theme preference in `localStorage` so the theme persists across page reloads.  
   ```javascript
   const toggleButton = document.getElementById('theme-toggle');
   const body = document.body;

   // Check for saved theme preference in localStorage
   if (localStorage.getItem('theme') === 'dark') {
     body.classList.add('dark-theme');
   }

   // Toggle theme on button click
   toggleButton.addEventListener('click', () => {
     body.classList.toggle('dark-theme');
     
     // Save the theme preference in localStorage
     if (body.classList.contains('dark-theme')) {
       localStorage.setItem('theme', 'dark');
     } else {
       localStorage.removeItem('theme');
     }
   });
   ```

4. **Style the Toggle Button (Optional)**  
   Add additional CSS to style the theme toggle button if desired.  
   ```css
   #theme-toggle {
     padding: 10px 20px;
     background-color: #007BFF;
     color: white;
     border: none;
     cursor: pointer;
     border-radius: 5px;
   }

   #theme-toggle:hover {
     background-color: #0056b3;
   }
   ```

5. **Optional: Add Icons for Theme Toggle**  
   For a more user-friendly experience, you can use an icon (like a sun and moon) for the toggle button. Here’s an example using Font Awesome icons.  
   ```html
   <button id="theme-toggle">
     <i class="fa fa-sun"></i> <!-- Light theme icon -->
   </button>
   ```

   Add logic to switch between sun and moon icons based on the active theme.  
   ```javascript
   toggleButton.addEventListener('click', () => {
     body.classList.toggle('dark-theme');
     
     // Toggle icons
     if (body.classList.contains('dark-theme')) {
       document.querySelector('.fa-sun').style.display = 'none';
       document.querySelector('.fa-moon').style.display = 'inline-block';
     } else {
       document.querySelector('.fa-moon').style.display = 'none';
       document.querySelector('.fa-sun').style.display = 'inline-block';
     }
   });
   ```

6. **Test and Adjust**  
   Test the theme switcher on different browsers and devices. Adjust transitions or styles as necessary.

This is a complete guide for adding a theme switcher toggle to your website.
