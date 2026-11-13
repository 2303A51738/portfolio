# Guru Charan Reddy — Personal Portfolio

A sleek, responsive, and modern developer portfolio engineered for **Guru Charan Reddy**, final-year B.Tech Computer Science student at SR University specializing in **AI/ML**, **Python**, **Java**, **C++**, and **Game Development (Unity/C#)**.

Built using pure **HTML5**, **CSS3**, and **Vanilla JavaScript** with zero third-party framework dependencies.

---

## 🌟 Key Features

1. **AI / Engineering Aesthetic**:
   - Dark theme by default with smooth Light Theme toggle.
   - Glassmorphic card styling, subtle neon ambient gradients, and glowing accents.
   - 100% responsive across desktop, laptop, tablet, and mobile devices.

2. **Interactive Developer Terminal (CLI)**:
   - A built-in retro-futuristic terminal where visitors and recruiters can type commands (`help`, `whoami`, `skills`, `projects`, `zombie`, `education`, `contact`, `clear`) or click quick-run chips.

3. **Featured Projects**:
   - **Zombie-Runner (3D Endless Runner)**: Developed in Unity with C#, featuring dynamic 3-lane movement mechanics, AI zombie chase dynamics, procedural endless track pooling, and UV light inventory pickups. Links directly to [GitHub Repo](https://github.com/2303A51740/Zombie-Runner).
   - **Smart Product Recommendation System**: Hybrid collaborative and content-based filtering engine built with Python, scikit-learn, and Pandas.
   - **NLP-Based Text Classifier**: End-to-end NLP classification pipeline using NLTK, TF-IDF vectorization, and multi-model benchmarking (Naive Bayes, Logistic Regression, SVM).
   - Modal deep-dive cards detailing the architectural specs for each project.

4. **Curriculum Vitae / ATS Printable Resume**:
   - Built-in ATS-optimized resume modal with single-click "Print / Save PDF" (`window.print()`) styled specifically with a print media stylesheet.

5. **Quick-Copy & Contact Features**:
   - One-click clipboard copy for Phone (`6303496394`), Email (`2303a51738@sru.edu.in`), and Location.
   - Interactive contact form with input validation and instant `mailto:` link generation.

---

## 🚀 How to Run Locally

Because this project is built entirely with vanilla HTML, CSS, and JS, no build steps or package managers (`npm`, `yarn`) are required!

### Option 1: Direct Browser Opening
Simply double-click `index.html` or open it with Google Chrome, Edge, Firefox, or Safari.

### Option 2: Local HTTP Server (Python)
If you have Python installed, you can start a local development server:
```bash
# In the portfolio directory
python -m http.server 8000
```
Then navigate to: `http://localhost:8000`

### Option 3: VS Code Live Server
Open the folder in **VS Code**, right-click `index.html`, and select **"Open with Live Server"**.

---

## 🌐 Deploy to GitHub Pages (Free Hosting)

1. Create a repository on GitHub (e.g. `portfolio` or `<your-username>.github.io`).
2. Push your files to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio release"
   git branch -M main
   git remote add origin https://github.com/2303A51740/<your-repo-name>.git
   git push -u origin main
   ```
3. Go to your repository on GitHub:
   - Click **Settings** > **Pages**
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**
   - Select the `main` branch and `/ (root)` folder, then click **Save**.
4. Your portfolio will be live at `https://2303A51740.github.io/<your-repo-name>/`!

---

## 📁 File Structure

```
portfolio/
├── index.html       # Semantic HTML5 layout and structure
├── style.css        # CSS variables, glassmorphism, responsive grid, print styles
├── script.js        # Pure Vanilla JS (typing, theme toggler, terminal, modals)
└── README.md        # Documentation and deployment instructions
```
