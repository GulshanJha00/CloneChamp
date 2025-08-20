# CloneChamp

**CloneChamp** is an interactive platform where users can practice **HTML & CSS challenges** and get instant visual feedback. Users’ submissions are compared against a target solution using **pixel matching**, giving a **match percentage** for accuracy.

Try it live: [https://clonechamp.vercel.app/](https://clonechamp.vercel.app/)

---

## Features

* Select from a variety of **HTML & CSS challenges**.
* **Real-time code editor** with HTML and CSS support.
* Submit your solution and get a **visual match percentage**.
* Automatically mark challenges as **“Solved”** if your solution matches the target.
* Stores submitted solutions for review.

---

## Tech Stack

* **Frontend:** Next.js
* **Backend:** Node.js + Express
* **Pixel Matching:** Playwright + Pixelmatch
* **Styling:** Tailwind CSS
* **Database:** MongoDB (for storing questions & user submissions)

---

## Installation

Clone the repository:

```bash
git clone https://github.com/GulshanJha00/CloneChamp.git
cd ClonChamp
```

Install dependencies for both frontend and backend:

```bash
cd frontend
npm install --force
cd ../backend
npm install --force
```

---

## Running Locally

Run the backend:

```bash
cd backend
npm run dev
```

Run the frontend:

```bash
cd frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.
Open [http://localhost:3001](http://localhost:3001) for backend port.

---

## How It Works

1. Users select a challenge from the list.
2. Users solve the challenge in the **built-in code editor**.
3. On submission:

   * The backend **renders both target and user solutions** using a headless browser.
   * Screenshots of both solutions are taken.
   * **Pixelmatch** compares the screenshots and calculates a match percentage.
4. If the match percentage ≥ 85%, the challenge is marked **“Solved”**.
5. Users can track their progress and review previous submissions.

---

## Contributing

Contributions are welcome! You can:

* Add new challenges
* Improve pixel-matching logic
* Enhance frontend UI/UX

Please fork the repo and submit a pull request.

---

## License

MIT License © 2025 CloneChamp