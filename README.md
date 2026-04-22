# Recycling Revolution: A Data Science Journey 🌱

An interactive browser-based game that teaches the full data science pipeline through a real-world recycling scenario. Players step into the role of a data scientist and work through each stage — from defining a problem to presenting findings — using mini-games and visualizations along the way.

Built entirely on my own in 11th grade as part of the **Girls Who Code Summer Camp**.

---

## How to Play

Open the game in your browser and use the on-screen buttons to progress through each step. The data collection mini-game uses **arrow keys** to move your character.

### The 5 Steps

1. **Problem Statement** — Define the research question: how effective was a recycling program at increasing recycling rates?
2. **Data Collection** — Move your character with arrow keys to gather data from NPCs (a City Official and a Recycling Representative)
3. **Data Cleaning** — Click on errors in the raw data table (duplicates, n/a values, non-integer entries) to clean the dataset
4. **Analysis & Visualization** — Calculate mean, median, and standard deviation before/after the program, then build a bar graph using arrow keys to match the cleaned data
5. **Modeling** — Run a paired t-test to determine if the recycling program had a statistically significant effect
6. **Presentation** — Compile your findings into a final presentation

---

## Built With

- [p5.js](https://p5js.org/) — 2D graphics and game loop
- [p5play v3](https://p5play.org/) — Sprite management
- [planck.js](https://piqnt.com/planck.js) — Physics engine (via p5play)
- Vanilla JavaScript — Game state, data logic, interactivity

---

## File Structure

```
├── index.html       # Entry point, loads libraries
├── script.js        # All game logic, screens, and mini-games
├── style.css        # Minimal styling (most styling is in script.js)
├── p5play.js        # Local copy of p5play v3
├── planck.min.js    # Physics dependency for p5play
└── assets/
    ├── databg.jpg           # Background image
    ├── myfont.ttf           # Custom font
    ├── paired.png           # T-test results image
    ├── pairedExplained.png  # Annotated t-test explanation
    └── presentation.png     # Final presentation slide
```

---

## Dataset

The game uses a simulated recycling rate dataset (2010–2019) with intentional errors for the data cleaning mini-game. The cleaned dataset is used for all subsequent statistical analysis.

| Year | Recycling Rate | Program Active |
|------|---------------|----------------|
| 2010 | 20% | No |
| 2011 | 21% | No |
| 2012 | 22% | No |
| 2013 | 23% | No |
| 2014 | 24% | No |
| 2015 | 30% | Yes |
| 2016 | 32% | Yes |
| 2017 | 29% | Yes |
| 2018 | 37% | Yes |
| 2019 | 39% | Yes |
