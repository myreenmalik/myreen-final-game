//Press a button to choose your path
//See the README file for more information

function preload() {
  font = loadFont('assets/myfont.ttf');
  noexplanation = loadImage("assets/paired.png");
  explanation = loadImage("assets/pairedExplained.png");
  presentation = loadImage("assets/presentation.png")
  dataBG = loadImage("assets/databg.jpg")
}

//  variables
let cleaningData = [
  { year: "2010", rate: "20", program: "No", highlight: false},
  { year: "2011", rate: "'21'", program: "No", highlight: true},
  { year: "2012", rate: "22", program: "No", highlight: false },
  { year: "2013", rate: "23", program: "No", highlight: true },
  { year: "2013", rate: "23", program: "No", highlight: true },
  { year: "2014", rate: "24", program: "No", highlight: false },
  { year: "2015", rate: "30", program: "Yes", highlight: false },
  { year: "2016", rate: "32", program: "Yes", highlight: false },
  { year: "2017", rate: "n/a", program: "Yes", highlight: true },
  { year: "2018", rate: "37", program: "Yes", highlight: false },
  { year: "2019", rate: "39", program: "Yes", highlight: false },
];

let cleanedUpData = [
    { year: "2010", rate: "20", program: "No"},
    { year: "2011", rate: "21", program: "No"},
    { year: "2012", rate: "22", program: "No"},
    { year: "2013", rate: "23", program: "No"},
    { year: "2014", rate: "24", program: "No"},
    { year: "2015", rate: "30", program: "Yes"},
    { year: "2016", rate: "32", program: "Yes"},
    { year: "2017", rate: "29", program: "Yes"},
    { year: "2018", rate: "37", program: "Yes"},
    { year: "2019", rate: "39", program: "Yes"},
  ];

let font;
let currentScreen = 'welcome';
let startButton, step2Button, startCollectingButton, proceedToVisualizationButton;
let player;
let cityOfficial, recyclingRep;
let showData = false;
let collectedData = false;
let storeDataButton, seeTable, startCleaningButton, startCleaningGameButton, seeNewTableButton, step3Button;
let startStatsButton, calculatorBefore, calculatorAfter, step4Button, runTest, testExplanation, step5Button;
let createPresentation, finishButton, startOverButton;
let score = 0;
let gameState = "start";
let visualizationData = cleanedUpData.map(d => parseInt(d.rate)); 
let userGraphData = Array(visualizationData.length).fill(0);
let currentX = 0;
let userGraph;
let graphImage;
let allSprites;
let canMove = true;
let showStatsBeforeButton, showStatsAfterButton;
let statsBeforeDisplayed = false;
let statsAfterDisplayed = false;
let proceedToVisualization = false;
let showImage = false;

let uncleanItemsClicked = 0;


/* SETUP RUNS ONCE */
function setup() {
  createCanvas(600, 400);
  background(dataBG);
  textAlign(CENTER);
  textSize(20);
  textFont(font);
  noStroke();

  // Set up the home screen
  textSize(20);
  text("Welcome to Recycling Revolution: \nA Data Science Journey!",
    width / 2,
    height / 2 - 100
  );
  textSize(12);
  text("In this game, you'll step into the role of a data scientist tackling real-world challenges in recycling. Your mission is to collect, clean, and analyze data to uncover insights and make informed decisions that can impact environmental sustainability. As you progress through each step, you'll learn the critical aspects of data science—from gathering raw data to building models and visualizations—all while contributing to a greener future. ", width / 2,
    height / 2 - 40);

  // step 1 buttons and sprites
  startButton = createButton('Enter');
  startButton.position(width / 2 - 50, height / 2 + 50);
  startButton.mousePressed(() => currentScreen = 'step1');

  step2Button = createButton('Got it, go \nto step 2');
  step2Button.position(width / 2 - 50, height / 2 + 100);
  step2Button.mousePressed(() => currentScreen = 'step2_intro');
  step2Button.hide();

  startCollectingButton = createButton('Start Collecting');
  startCollectingButton.position(width / 2 - 50, height / 2 + 100);
  startCollectingButton.mousePressed(() => {
    currentScreen = 'dataCollectingGame';
    startCollectingButton.hide();
  });
  startCollectingButton.hide();

  storeDataButton = createButton('Store Data');
  storeDataButton.position(width / 2 - 50, height / 2 -100);
  storeDataButton.mousePressed(() => storeData());
  storeDataButton.hide();

  seeTable = createButton('See Table');
  seeTable.position(width / 2 - 50, height / 2 + 100);
  seeTable.mousePressed(() => currentScreen = 'uncleanTable');
  seeTable.hide();

  startCleaningButton = createButton('Start Cleaning');
  startCleaningButton.position(width / 2 - 50, height-50);
  startCleaningButton.mousePressed(() => currentScreen = 'cleaningGameIntro');
  startCleaningButton.hide();

  startCleaningGameButton = createButton('Start Cleaning Game');
  startCleaningGameButton.position(width / 2 - 50, height / 2 + 100);
  startCleaningGameButton.mousePressed(() => currentScreen = 'cleaningGame');
  startCleaningGameButton.hide();

  seeNewTableButton = createButton('see Cleaned Table');
  seeNewTableButton.position(width / 2 - 50, height-50);
  seeNewTableButton.mousePressed(() => currentScreen = 'cleanTableScreen');
  seeNewTableButton.hide();

  step3Button = createButton('Go to Step 3');
  step3Button.position(width / 2 - 50, height / 2 + 150);
  step3Button.mousePressed(() => currentScreen = 'step3_intro');
  step3Button.hide();

  startStatsButton = createButton('Lets Go!');
  startStatsButton.position(width / 2 - 50, height / 2 + 100);
  startStatsButton.mousePressed(() => currentScreen = 'stats');
  startStatsButton.hide();

  showStatsBeforeButton = createButton('Calculate Before');
  showStatsBeforeButton.position(width / 2 - 200, height / 2 + 100);
  showStatsBeforeButton.mousePressed(showStatsBefore);
  showStatsBeforeButton.hide();

  showStatsAfterButton = createButton('Calculate After');
  showStatsAfterButton.position(width / 2 + 50, height / 2 + 100);
  showStatsAfterButton.mousePressed(showStatsAfter);
  showStatsAfterButton.hide();

  proceedToVisualizationButton = createButton('Proceed to Visualization');
  proceedToVisualizationButton.position(width / 2-50, height / 2 +150);
proceedToVisualizationButton.mousePressed(() => currentScreen = 'visualizingData');
  proceedToVisualizationButton.hide();

  step4Button = createButton('Step 4');
  step4Button.position(width / 2 - 250, height / 2 +175);
  step4Button.mousePressed(() => currentScreen = 'step4intro');
  step4Button.hide();

  runTest = createButton('Run test');
  runTest.position(width / 2 - 50, height / 2 + 100);
  runTest.mousePressed(() => currentScreen = 'testresults');
  runTest.hide();

  testExplanation = createButton('What does this mean?');
  testExplanation.position(width / 2 - 50, height / 2 + 100);
  testExplanation.mousePressed(() => showImage = true); // Set a flag to show the image
  testExplanation.hide(); // Initially hide the button


  step5Button = createButton('Step 5');
  step5Button.position(width / 2 - 50, height / 2 + 100);
  step5Button.mousePressed(() => currentScreen = 'step5');
  step5Button.hide();

  createPresentation = createButton('Create Presentation');
  createPresentation.position(width / 2 - 50, height / 2 + 100);
  createPresentation.mousePressed(() => currentScreen = 'presentation');
  createPresentation.hide();

  finishButton = createButton('Click here to finish');
  finishButton.position(width / 2 - 50, height / 2 + 150);
  finishButton.mousePressed(() => currentScreen = 'conclusion');
  finishButton.hide();

  startOverButton = createButton('Start Over');
  startOverButton.position(width / 2 - 50, height / 2 + 100);
  startOverButton.mousePressed(() => currentScreen = 'welcome');
  startOverButton.hide();

  world.gravity.y = 0;

  allSprites = new Group();
  player = createSprite(width / 2, height - 50, 40, 40);
  player.collider = 'none';
  player.color = color(255, 165, 0);
  allSprites.add(player);

  cityOfficial = createSprite(100, 100, 40, 40);
  cityOfficial.collider = 'none';
  cityOfficial.color = color('blue');
  allSprites.add(cityOfficial);

  recyclingRep = createSprite(500, 100, 40, 40);
  recyclingRep.collider = 'none';
  recyclingRep.color = color('green');
  allSprites.add(recyclingRep);
}

function draw() {
  background(dataBG);
  switch (currentScreen) {
    case 'welcome':
      drawWelcomeScreen();
      hideSprites();
      break;
    case 'step1':
      drawStep1Screen();
      hideSprites();
      break;
    case 'step2_intro':
      drawStep2IntroScreen();
      hideSprites();
      break;
    case 'dataCollectingGame':
      drawDataCollectingGame();
      break;
    case 'uncleanTable':
      drawUncleanTable();
      hideSprites();
      break;
    case 'cleaningGameIntro':
      drawCleaningGameIntro();
      hideSprites();
      break;
    case 'cleaningGame':
      drawCleaningGame();
      hideSprites();
      break;
    case 'cleanTableScreen':
      drawCleanTableScreen();
      hideSprites();
      break;
    case 'step3_intro':
      drawStep3Intro();
      hideSprites();
      break;
    case 'stats':
      drawStats();
      if (statsBeforeDisplayed) {
        displayStatsBefore();
      }
      if (statsAfterDisplayed) {
        displayStatsAfter();
      }
      hideSprites();
      break;
    case 'visualizingData':
      drawVisualizingData();
      hideSprites();
      break;
    case 'step4intro':
      drawStep4Intro();
      hideSprites();
      break;
    case 'testresults':
      drawTestResults();
      if (showImage) {
        image(explanation, 100, 0, 500, 300);
        step5Button.show();
        testExplanation.hide();}
      hideSprites();
      break;
    case 'step5':
      drawStep5();
      hideSprites();
      break;
    case 'presentation':
      drawPresentation();
      hideSprites();
      break;
    case 'conclusion':
      drawConclusion();
      hideSprites();
      break;
  }
  allSprites.draw();
}

function hideSprites() {
  player.visible = false;
  cityOfficial.visible = false;
  recyclingRep.visible = false;
}

/* FUNCTIONS TO DISPLAY SCREENS */
function drawWelcomeScreen() {
  textSize(20);
  text("Welcome to Recycling Revolution: \nA Data Science Journey!", width / 2, height / 2 - 100);
  textSize(12);
  text("In this game, you'll step into the role of a data scientist tackling \nreal-world challenges in recycling. Your mission is to collect, clean, and \nanalyze data to uncover insights and make informed decisions that can impact \nenvironmental sustainability. As you progress through each step, you'll \nlearn the critical aspects of data science—from gathering raw data to building \nmodels and visualizations—all while contributing to a greener future. ", width / 2, height / 2 - 40);
  startButton.show();
}

function drawStep1Screen() {
  textSize(20);
  text("Step 1: Problem Statement", width / 2, height / 2 - 100);
  textSize(12);
  text("Step 1 is defining the problem and \nmaking a problem statement\n\nOur Problem statement: We want to know \nhow effective a recycling program was on increasing \nrecycling rates in a given area", width / 2, height / 2 - 40);
  startButton.hide();
  step2Button.show();
}

function drawStep2IntroScreen() {
  textSize(20);
  text("Step 2: collecting and cleaning data", width / 2, height / 2 - 100);
  textSize(12);
  text("Step 2 is the process of \ncollecting and cleaning data.\n\nIn the first game for this, you will gather \ndata from 2 characters using your arrow keys", width / 2, height / 2 - 40);
  step2Button.hide();
  startCollectingButton.show();
}

// data collection game functions
function movePlayer() {
  if (!canMove) return;

  let xMove = 0;
  let yMove = 0;

  if (kb.pressing('left')) {
    xMove = -5;
  }
  if (kb.pressing('right')) {
    xMove = 5;
  }
  if (kb.pressing('up')) {
    yMove = -5;
  }
  if (kb.pressing('down')) {
    yMove = 5;
  }
  player.x += xMove;
  player.y += yMove;
}

function drawDataCollectingGame() {

  player.visible = true;
  cityOfficial.visible = true;
  recyclingRep.visible = true;

  movePlayer();

  fill(0);
  textSize(16);
  text("Move to the City Official (blue) or the Recycling \nRepresentative (green) to collect data.", width / 2, 20);

  let cityDistance = dist(player.x, player.y, cityOfficial.x, cityOfficial.y);
  let recyclingDistance = dist(player.x, player.y, recyclingRep.x, recyclingRep.y);

  if (cityDistance <= 50 && !collectedData) {
    showData = true;
    textSize(16);
    text("City Official: The recycling program started in 2015.", width / 2, height / 2 - 20);
    canMove = false;  // Restrict movement
    storeDataButton.show();
  } else if (recyclingDistance <= 50 && collectedData) {
    showData = true;
    textSize(16);
    text("Recycling Rep: The recycling rates were 20% in 2010, \n21% in 2011,... and 39% in 2019", width / 2, height / 2 - 20);
    canMove = false;  // Restrict movement
    storeDataButton.show();
  } else {
    showData = false;
  }
}

function storeData() {
  let cityDistance = dist(player.x, player.y, cityOfficial.x, cityOfficial.y);
  let recyclingDistance = dist(player.x, player.y, recyclingRep.x, recyclingRep.y);

  if (cityDistance <= 50) {
    collectedData = true;
    storeDataButton.hide();
    player.x = width / 2;
    player.y = height - 50;
    canMove = true;  // Allow movement again
  }

  if (recyclingDistance <= 50) {
    showData = false;  // Hide data text
    storeDataButton.position.x = -200;
    storeDataButton.position.y = -200;
    canMove = false;  // Restrict movement to keep the player in place
    seeTable.show();  // Show See Table button
    textSize(16);
    storeDataButton.mousePressed(() => {
      storeDataButton.hide(); // Hide the storeDataButton when clicked
    });
  }
}

function drawUncleanTable() {
  let tableX = 50;
  let tableY = 80;
  let tableWidth = width - 100;

  // Draw table
  drawTable(tableX, tableY, tableWidth);
  
  textSize(20);
  text("Here is the table but now we have to\n clean it!", width / 2, height / 9);
  textSize(9);
  text("Why do we clean our data? We clean our data so we can remove errors, inconsistencies, and irrelevant \ninformation from the dataset, ensuring that the analysis performed is based on accurate and reliable data", width / 2, height-20);
  seeTable.hide();
  
  storeDataButton.hide();
  startCleaningButton.show();
}

function drawCleaningGameIntro() {
  textSize(20);
  text("Data Cleaning Game", width / 2, height / 2 - 100);
  textSize(12);
  text("In this minigame, you will identify the unneeded data in \nthe graph. This includes duplicates, n/a values, and any number \nthat isnt in integer form.", width / 2, height / 2 - 40);
  startCleaningButton.hide();
  startCleaningGameButton.show();
}

function drawCleaningGame() {

  startCleaningGameButton.hide();
  storeDataButton.hide();
  textSize(20);
  text("Clean the Recycle Data", width / 2, 30);
  textSize(10);
  text("Click on each unclean value, such as duplicates, n/a values, and any number that isnt \nin integer form (hint: if a number has quotation marks around it).", width / 2, 50);

  let tableX = 50;
  let tableY = 80;
  let tableWidth = width - 100;

  // Draw table
  drawTable(tableX, tableY, tableWidth);

  // Check if all unclean items are clicked
  if (uncleanItemsClicked == 4) {
    textSize(16);
    text("You cleaned the data! Lets look at the new table", width / 2, 75)
    seeNewTableButton.show();
  } else {
    seeNewTableButton.hide();
  }
}

function drawTable(x, y, width) {
  let rowHeight = 20;
  let colWidth = width / 3;

  // Headers
  fill(200);
  rect(x, y, colWidth, rowHeight);
  rect(x + colWidth, y, colWidth, rowHeight);
  rect(x + 2 * colWidth, y, colWidth, rowHeight);
  fill(0);
  textSize(10); // Reduced text size
  text("Year", x + colWidth / 2, y + rowHeight / 2);
  text("Recycling Rate", x + 1.5 * colWidth, y + rowHeight / 2);
  text("Program Implemented", x + 2.5 * colWidth, y + rowHeight / 2);

  // Data
  for (let i = 0; i < cleaningData.length; i++) {
    if (cleaningData[i].highlight) {
      fill(242, 222, 222);
    } else {
      fill(255);
    }
    rect(x, y + (i + 1) * rowHeight, colWidth, rowHeight);
    rect(x + colWidth, y + (i + 1) * rowHeight, colWidth, rowHeight);
    rect(x + 2 * colWidth, y + (i + 1) * rowHeight, colWidth, rowHeight);

    fill(0);
    text(cleaningData[i].year, x + colWidth / 2, y + (i + 1) * rowHeight + rowHeight / 2);
    text(cleaningData[i].rate, x + 1.5 * colWidth, y + (i + 1) * rowHeight + rowHeight / 2);
    text(cleaningData[i].program, x + 2.5 * colWidth, y + (i + 1) * rowHeight + rowHeight / 2);
  }
}

function mousePressed() {
  if (currentScreen === 'cleaningGame') {
    let tableX = 50;
    let tableY = 80;
    let tableWidth = width - 100;
    let rowHeight = 20;
    let colWidth = tableWidth / 3;

    for (let i = 0; i < cleaningData.length; i++) {
      if (cleaningData[i].highlight) {
        let cellX = tableX + colWidth;
        let cellY = tableY + (i + 1) * rowHeight;

        if (mouseX > cellX && mouseX < cellX + colWidth && mouseY > cellY && mouseY < cellY + rowHeight) {
          cleaningData[i].highlight = false;
          cleaningData[i].rate = cleaningData[i].rate.replace(/'/g, '') || '29';
          uncleanItemsClicked++;
        }
      }
    }
  }
}

function drawCleanTableScreen() {
  textSize(15);
  text("Here is the clean version of the table! Now the \ndata will be much easier to work with", width / 2, 50);
  seeNewTableButton.hide();

  let tableX = 50;
  let tableY = 80;
  let tableWidth = width - 100;
  let rowHeight = 20;
  let colWidth = tableWidth / 3;

  fill(200);
  rect(tableX, tableY, colWidth, rowHeight);
  rect(tableX + colWidth, tableY, colWidth, rowHeight);
  rect(tableX + 2 * colWidth, tableY, colWidth, rowHeight);
  fill(0);
  textSize(12);
  text("Year", tableX + colWidth / 2, tableY + rowHeight / 2);
  text("Recycling Rate", tableX + 1.5 * colWidth, tableY + rowHeight / 2);
  text("Program Implemented", tableX + 2.5 * colWidth, tableY + rowHeight / 2);

  for (let i = 0; i < cleanedUpData.length; i++) {
    fill(255);
    rect(tableX, tableY + (i + 1) * rowHeight, colWidth, rowHeight);
    rect(tableX + colWidth, tableY + (i + 1) * rowHeight, colWidth, rowHeight);
    rect(tableX + 2 * colWidth, tableY + (i + 1) * rowHeight, colWidth, rowHeight);

    fill(0);
    text(cleanedUpData[i].year, tableX + colWidth / 2, tableY + (i + 1) * rowHeight + rowHeight / 2);
    text(cleanedUpData[i].rate, tableX + 1.5 * colWidth, tableY + (i + 1) * rowHeight + rowHeight / 2);
    text(cleanedUpData[i].program, tableX + 2.5 * colWidth, tableY + (i + 1) * rowHeight + rowHeight / 2);
  }

  step3Button.show();
}

function drawStep3Intro() {
  textSize(20);
  text("Step 3: Data analysis and exploration", width / 2, height / 2 - 100);
  textSize(12);
  text("Step 3 is about learning about your data. We will be doing \nstats and some visualizations to help us understand our data better!", width / 2, height / 2 - 40);
  step3Button.hide();
  startStatsButton.show();
}

function drawStats() {

  textSize(32);
  text("Stats", width / 2, 50);

  startStatsButton.hide();
  // Show buttons for stats calculations
  showStatsBeforeButton.show();
  showStatsAfterButton.show();

  textSize(16);
  text("Click on the below buttons to show the stats before and \nafter the recycling program implementation!", 300, 120);

}

function showStatsBefore() {
  statsBeforeDisplayed = true;
}

function showStatsAfter() {
  statsAfterDisplayed = true;
  proceedToVisualizationButton.show();
}

function displayStatsBefore() {
  // Define what happens when the before button is pressed
  fill(0);
  textSize(16);
  let mean = 22; // Example calculation
  let median = 22;
  let SD = 1.414;
  text(`Mean (Before) = ${mean}`, width / 2 - 150, height / 2 -10);
  text(`Median (Before) = ${median}`, width / 2 - 150, height / 2 +10);
  text(`Standard Deviation \n(Before) = ${SD}`, width / 2 - 150, height / 2 +30);
}

function displayStatsAfter() {
  // Define what happens when the after button is pressed
  fill(0);
  textSize(16);
  let mean = 33.4; // Example calculation
  let median = 32;
  let SD = 3.007;
  text(`Mean (After) = ${mean}`, width / 2 + 150, height / 2 -10);
  text(`Median (After) = ${median}`, width / 2 + 150, height / 2 + 10);
  text(`Standard Deviation \n(After) = ${SD}`, width / 2 + 150, height / 2 + 30);
}

function drawVisualizingData() {

  textSize(32);
  fill(0); // Set fill color to black to ensure visibility
  textAlign(CENTER);
  text("Visualization", width / 2, 50);

  textSize(12);
  text("Match the graph to the cleaned \ndata by using the arrow keys.", width / 2+150, 100);

  // Draw cleaned data table on the left
  drawReferenceDataTable();

  // Draw user graph on the right
  drawUserGraph();

  // Hide buttons that shouldn't be shown on this screen
  showStatsBeforeButton.hide();
  showStatsAfterButton.hide();
  proceedToVisualizationButton.hide();

  textSize(10);
  fill(0);
  text("Once you're done with the graph, \nclick here for step 4!", width / 2-280, height - 70);
  step4Button.show();
}

function drawReferenceDataTable() {
  fill(0);
  textSize(16);
  text("Cleaned Data", 75, 80);

  let startX = 20;
  let startY = 100;
  let rowHeight = 20;

  // Headers
  textSize(9);
  textAlign(LEFT, CENTER);
  text("Year", startX, startY);
  text("Recycling \nRate", startX + 60, startY);
  text("Program?", startX + 100, startY);

  for (let i = 0; i < cleanedUpData.length; i++) {
    text(cleanedUpData[i].year, startX, startY + (i + 1) * rowHeight);
    text(cleanedUpData[i].rate, startX + 60, startY + (i + 1) * rowHeight);
    text(cleanedUpData[i].program, startX + 100, startY + (i + 1) * rowHeight);
  }
}

function drawUserGraph() {
  let rectWidth = 20;
  let rectHeightMultiplier = 5;
  let startX = 250;
  let startY = 350; // Lower the startY to fit within the canvas height

  // Draw y-axis
  stroke(0);
  line(startX - 10, startY, startX - 10, startY - 250); // Adjust height as needed
  line(startX - 10, startY, startX + userGraphData.length * 28, startY);

  for (let i = 0; i <= 50; i++) {
    noStroke();
    fill(0);
    textSize(6);
    text(i, startX - 30, startY - i * rectHeightMultiplier); // Label increments of 1
    stroke(0);
    line(startX - 15, startY - i * rectHeightMultiplier, startX - 10, startY - i * rectHeightMultiplier);
  }

  // Draw x-axis labels
  for (let i = 0; i < userGraphData.length; i++) {
    noStroke();
    fill(0);
    textSize(9);
    text(cleanedUpData[i].year, startX + i * 28, startY + 15);
  }

  // Draw user graph
  noStroke();
  fill(0, 0, 255);
  for (let i = 0; i < userGraphData.length; i++) {
    rect(startX + i * 30, startY - userGraphData[i] * rectHeightMultiplier, rectWidth, userGraphData[i] * rectHeightMultiplier);
  }

  // Highlight the current bar being adjusted
  stroke(255, 0, 0);
  noFill();
  rect(startX + currentX * 30, startY - userGraphData[currentX] * rectHeightMultiplier, rectWidth, userGraphData[currentX] * rectHeightMultiplier);
  noStroke();
}

function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function keyPressed() {
  if (currentScreen === 'visualizingData') {
    if (keyCode === UP_ARROW) {
      if (currentX < userGraphData.length) {
        userGraphData[currentX]++;
      }
    } else if (keyCode === DOWN_ARROW) {
      if (currentX < userGraphData.length && userGraphData[currentX] > 0) {
        userGraphData[currentX]--;
      }
    } else if (keyCode === RIGHT_ARROW) {
      if (currentX < userGraphData.length - 1) {
        currentX++;
      }
    } else if (keyCode === LEFT_ARROW) {
      if (currentX > 0) {
        currentX--;
      }
    }
  }
}

function drawStep4Intro() {
  textSize(20);
  text("Step 4: Models", width / 2 -100, height / 2 - 100);
  textSize(12);
  text("A data model is a tool that helps us analyze the cleaned data \nand uncover patterns or trends. We are going to be working with \na paired t-test, which is a type of linear model that helps us \nsee if there was a significant change with the recycling program", width / 2 -250, height / 2 - 40);
  step4Button.hide();
  runTest.show();
}

function drawTestResults() {
  image(noexplanation, 100, 0, 500, 300);
  textSize(20);
  text("Paired T-test Results", width / 2, height / 2 - 100);
  textSize(12);
  text("There's a lot going on here - let's \nbreak it down!", width / 2, height / 2 - 40);
  runTest.hide();
  testExplanation.show();
}

function drawStep5() {
  textSize(20);
  text("Step 5: Presenting your findings", width / 2 - 100, height / 2 - 100);
  textSize(12);
  text("Step 5 is presentation. You did so much work - let's \nput it all together! Click on the button below to compile everything \nyou've done", width / 2 - 250, height / 2 - 40);
  testExplanation.hide();
  step5Button.hide();
  createPresentation.show();
}

function drawPresentation() {
  textSize(12);
  text("Look at your presentation! This looks awesome", width / 2 - 150, height / 2 +120);
  image(presentation, width/2 - 250, 10, 500, 300);
  createPresentation.hide();
  finishButton.show();
}

function drawConclusion() {
  textSize(20);
  text("Congrats!", width / 2 -100, height / 2 - 90);
  textSize(12);
  text("You’ve successfully completed the entire data science \nproject, going through each critical step from defining the \nproblem to analyzing and visualizing the data. Your hard \nwork and determination have paid off, and now you understand \nthe full journey of a data scientist!", width / 2 - 200, height / 2 - 40);
  finishButton.hide();
  startOverButton.show();
}