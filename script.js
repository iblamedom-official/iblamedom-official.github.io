const recordButton = document.getElementById('record-button');
const analysisScreen = document.getElementById('analysis-screen');
const resultContainer = document.getElementById('result-container');

recordButton.addEventListener('click', () => {
  recordButton.disabled = true;
  // Temporarily remove the active class for visual feedback
  recordButton.classList.add('active');
  setTimeout(() => recordButton.classList.remove('active'), 200);

  // Start the recording animation
  startRecordingAnimation();

  setTimeout(() => {
    // Stop the recording animation and start the analysis after 5 seconds
    stopRecordingAnimation();
    simulateAnalysis();
  }, 5000); // Simulate 5 seconds of "recording"
});

function startRecordingAnimation() {
  // Placeholder for the recording animation logic
  analysisScreen.style.display = 'block';
  analysisScreen.innerHTML = '<p>Recording...</p>';
  analysisScreen.style.backgroundColor = '#000';
  analysisScreen.style.color = '#fff';
}

function stopRecordingAnimation() {
  // Clear the recording message
  analysisScreen.innerHTML = '';
}

function simulateAnalysis() {
  let fakeCode = generateFakeCode(100); // Generate 100 lines for longer scrolling
  let codeHtml = fakeCode.join('<br>');
  analysisScreen.innerHTML = codeHtml;
  analysisScreen.scrollTop = analysisScreen.scrollHeight;

  // Scroll the "terminal" content
  let currentScroll = 0;
  const scrollAmount = analysisScreen.scrollHeight / 50; // Adjust scroll speed
  const interval = setInterval(() => {
    currentScroll += scrollAmount;
    analysisScreen.scrollTop = currentScroll;
    if (currentScroll >= analysisScreen.scrollHeight) {
      clearInterval(interval);
      analysisScreen.style.display = 'none';
      showResults();
    }
  }, 100); // Speed of scrolling
}

function generateFakeCode(lines) {
  const parts = [
    "np.random.rand(100, 10)",
    "tf.keras.Sequential()",
    "model.add(Dense(128))",
    "model.compile()",
    "model.fit(x_train, y_train)",
    "Conv2D(filters=32, kernel_size=(3, 3))",
    "MaxPooling2D(pool_size=(2, 2))",
    "Flatten()",
    "model.evaluate(x_test, y_test)",
    "LSTM(128, return_sequences=True)",
    "model.predict(x_sample)",
  ];
  let code = [];
  for (let i = 0; i < lines; i++) {
    code.push(parts[Math.floor(Math.random() * parts.length)]);
  }
  return code;
}

function showResults() {
  resultContainer.style.display = 'block';
  resultContainer.innerHTML = `
    <p style="animation: fade-in-up 0.5s forwards;">Biological Age: <strong>${randomValue(20, 60)} years</strong></p>
    <p style="animation: fade-in-up 1s forwards;">Heart Rate: <strong>${randomValue(60, 100)} bpm</strong></p>
    <p style="animation: fade-in-up 1.5s forwards;">Stress Level: <strong>${["Low", "Medium", "High"][randomValue(0, 2)]}</strong></p>
    <p style="animation: fade-in-up 2s forwards;">Energy Level: <strong>${["Low", "Medium", "High"][randomValue(0, 2)]}</strong></p>
    <p style="animation: fade-in-up 2.5s forwards;">Mood: <strong>${["Happy", "Sad", "Anxious", "Excited", "Calm"][randomValue(0, 4)]}</strong></p>
  `;
  // Allow for another recording after a short delay
  setTimeout(() => { recordButton.disabled = false; }, 3000);
}

function randomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.styleSheets[0].insertRule(`
  @keyframes fade-in-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`, document.styleSheets[0].cssRules.length);
