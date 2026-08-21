# Everlasting Vows

# Lovable.dev Prompt

Create a premium, elegant, and modern wedding invitation website with a luxurious aesthetic. Use soft pastel colors like ivory, blush pink, champagne gold, and light beige. Add subtle floral decorations, animated petals, smooth scrolling, elegant typography, and gentle fade-in transitions.

## Main Hero Section

* Display the wedding couple names prominently in the center.

* Groom: Saran, son of R. Soundararajan

* Bride: Samyuktha, daughter of Parthiban P.

* Add a romantic heading like:

  * "Together with their families"

  * "Invite you to celebrate their wedding"

* Include a beautiful wedding-themed background image with a soft overlay.

## Wedding Details Section

Display the following details in elegant cards:

* Wedding Date: September 12

* Reception Date: September 13

* Wedding Time: 10:00 AM on September 12

* Venue: Suguna Auditorium, Sitra

Below the venue name, add a clickable text button:

* Text: "Click here for directions"

* On click, redirect to: [https://maps.app.goo.gl/MPNAbGj9Dv4uHpUC8](https://maps.app.goo.gl/MPNAbGj9Dv4uHpUC8)

* Open the Google Maps link in a new tab.

## Countdown Timer

Create a live countdown timer that counts down to:

* September 12 at 10:00 AM

The timer should display:

* Days

* Hours

* Minutes

* Seconds

Once the countdown reaches zero, automatically change the message to:

* "The wedding celebration has begun"

## RSVP Section

At the bottom of the page, create a section with the question:

* "Will you attend?"

Below the question, add two large buttons:

1. "Yes, I'm in"

2. "I couldn't make it"

### If user clicks "Yes, I'm in"

* Open a modal popup window.

* Ask the user to enter the number of people attending.

* Allow a minimum of 1 and maximum of 10 guests.

* Include a submit button.

After submission:

* Save the total guest count.

* Display a floating bubble fixed on the screen.

* Floating bubble text should show:

  * Top line: "Expected Guests"

  * Middle line: total guest count number

  * Bottom line: "Are eager to attend the wedding"

## Guest Counter Behavior

* The guest count should persist across all users.

* Each time a new user submits their attendee count, the total count should increase.

* Use a backend database such as Supabase or Firebase to store the total guest count.

* The floating guest bubble should update in real time for all users.

## Additional Features

* Add background music toggle button with soft instrumental wedding music.

* Add smooth entrance animations for sections.

* Add floral border decorations on top and bottom.

* Make the design fully responsive for mobile, tablet, and desktop.

* Add a photo gallery section for the couple.

* Add an elegant footer with:

  * "We look forward to celebrating with you"

  * "With love, Saran & Samyuktha"

## Technical Requirements

* Use React with Tailwind CSS.

* Use Framer Motion for animations.

* Use Supabase or Firebase for storing RSVP count.

* Use responsive modern UI components.

* Use a modal component for RSVP.

* Use local storage to prevent the same user from submitting multiple times.

* Make the floating guest count bubble stylish, glassmorphism-based, and always visible on the bottom-right corner of the page.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://weddinginvitationsaransam.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a43e19a1-011e-4cf2-9b1b-8e2ffc778935).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
