# Digital Skills Site

A simple, responsive personal website for showcasing digital skills, services, and learning-focused content.

## Features

- Modern responsive landing page
- Smooth scrolling navigation and mobile menu
- Skills, services, projects, pricing, and contact sections
- Front-end login, signup, and forgot-password prototypes
- Client-side validation with helpful inline errors
- Safe handling of remembered email values without storing passwords

## Technologies

- HTML
- CSS
- JavaScript

## Project structure

```text
Website/
├── index.html
├── login.html
├── signup.html
├── forgot-password.html
├── css/
│   └── styles.css
├── js/
│   ├── auth.js
│   ├── main.js
│   ├── login.js
│   ├── signup.js
│   └── forgot-password.js
├── README.md
└── assets/
```

## Running locally

You can open `index.html` directly in a browser, or for a more realistic local preview, serve the project with a simple static server.

Example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Authentication status

Authentication pages are currently front-end prototypes unless a backend authentication service has been connected.

## Future improvements

- Backend authentication and account storage
- Database integration
- Contact form backend integration
- Deployment to a hosting platform
- Admin or dashboard features
