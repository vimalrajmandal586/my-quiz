// ============================================================
//  PASTE YOUR GOOGLE SCRIPT URL HERE
// ============================================================
const SHEET_URL = "PASTE-YOUR-URL-HERE";

// ============================================================
//  YOUR ADMIN PASSWORD
// ============================================================
const ADMIN_PASSWORD = "myquiz2025";

// ============================================================
//  ALL QUIZ DATA
// ============================================================
const QUIZZES = {
    1: {
        name : "Psychological Understanding",
        emoji: "🧠",
        questions: [
            {
                q: "Why do people tend to conform to group opinions even when they privately disagree?",
                options: [
                    "A. They lack intelligence",
                    "B. They want to avoid social rejection and gain acceptance",
                    "C. They always believe the group is correct",
                    "D. They don't have personal opinions"
                ],
                answer: "B",
                explanation: "This is called conformity — people often go along with the group to avoid being judged or rejected socially."
            },
            {
                q: "How does classical conditioning explain the development of certain fears or phobias?",
                options: [
                    "A. Fears are inherited genetically",
                    "B. Fears develop through association between a neutral stimulus and a negative experience",
                    "C. Fears only come from imagination",
                    "D. Fears are always learned through observation"
                ],
                answer: "B",
                explanation: "Classical conditioning shows that we associate neutral things with painful events, creating fear responses."
            },
            {
                q: "Why do we sometimes remember events differently from how they actually happened?",
                options: [
                    "A. Memory works like a perfect recording",
                    "B. Our brain deletes important details randomly",
                    "C. Memory is reconstructive and influenced by emotions and beliefs",
                    "D. We only remember what others tell us"
                ],
                answer: "C",
                explanation: "Memory is reconstructed every time we recall it, influenced by our current emotions and beliefs."
            },
            {
                q: "Why do first impressions strongly influence how we judge others?",
                options: [
                    "A. People never change",
                    "B. First impressions are always accurate",
                    "C. Cognitive biases like the halo effect shape early judgments",
                    "D. We don't pay attention after meeting someone"
                ],
                answer: "C",
                explanation: "The halo effect means if someone seems good in one way, we assume they are good in other ways too."
            },
            {
                q: "Why do people experience cognitive dissonance?",
                options: [
                    "A. They have too many memories",
                    "B. They experience conflict between their beliefs and their actions",
                    "C. They cannot make decisions",
                    "D. They forget things easily"
                ],
                answer: "B",
                explanation: "Cognitive dissonance is the discomfort of having conflicting beliefs and behaviors."
            }
        ]
    },
    2: {
        name : "AI Current Affairs",
        emoji: "🤖",
        questions: [
            {
                q: "Which company developed the AI chatbot ChatGPT?",
                options: [
                    "A. Google",
                    "B. Microsoft",
                    "C. OpenAI",
                    "D. Amazon"
                ],
                answer: "C",
                explanation: "ChatGPT was created by OpenAI, an AI safety company founded in 2015."
            },
            {
                q: "Which AI model is developed by Google as a competitor to ChatGPT?",
                options: [
                    "A. Alexa",
                    "B. Siri",
                    "C. Gemini",
                    "D. Cortana"
                ],
                answer: "C",
                explanation: "Google Gemini is their main AI chatbot competing with ChatGPT."
            },
            {
                q: "Who is the CEO of OpenAI as of 2026?",
                options: [
                    "A. Elon Musk",
                    "B. Sam Altman",
                    "C. Sundar Pichai",
                    "D. Satya Nadella"
                ],
                answer: "B",
                explanation: "Sam Altman is the CEO of OpenAI."
            },
            {
                q: "Which company owns the AI assistant Copilot?",
                options: [
                    "A. Apple",
                    "B. Microsoft",
                    "C. Meta",
                    "D. IBM"
                ],
                answer: "B",
                explanation: "Microsoft Copilot is built into Windows and Office products."
            },
            {
                q: "Which region passed the world's first major AI law?",
                options: [
                    "A. India",
                    "B. USA",
                    "C. European Union",
                    "D. Brazil"
                ],
                answer: "C",
                explanation: "The EU passed the AI Act — the world's first major AI regulation law."
            }
        ]
    },
    3: {
        name : "Basic Math Questions",
        emoji: "➗",
        questions: [
            {
                q: "If the cost price is ₹200 and selling price is ₹250, what is the profit?",
                options: [
                    "A. ₹30",
                    "B. ₹40",
                    "C. ₹50",
                    "D. ₹60"
                ],
                answer: "C",
                explanation: "Profit = Selling Price minus Cost Price = 250 minus 200 = 50"
            },
            {
                q: "What is the square root of 144?",
                options: [
                    "A. 10",
                    "B. 11",
                    "C. 12",
                    "D. 14"
                ],
                answer: "C",
                explanation: "Square root of 144 = 12 because 12 x 12 = 144"
            },
            {
                q: "Solve: 15 + (25 divided by 5)",
                options: [
                    "A. 8",
                    "B. 10",
                    "C. 20",
                    "D. 25"
                ],
                answer: "C",
                explanation: "Using BODMAS: 25 divided by 5 = 5 first, then 15 + 5 = 20"
            },
            {
                q: "What is 9 squared?",
                options: [
                    "A. 18",
                    "B. 72",
                    "C. 81",
                    "D. 99"
                ],
                answer: "C",
                explanation: "9 squared = 9 x 9 = 81"
            },
            {
                q: "If a triangle has angles 60, 60, 60 degrees — what type is it?",
                options: [
                    "A. Isosceles",
                    "B. Right-angled",
                    "C. Scalene",
                    "D. Equilateral"
                ],
                answer: "D",
                explanation: "An equilateral triangle has all three sides and angles equal — 60 degrees each."
            }
        ]
    }
};

// ============================================================
//  STATE VARIABLES
// ============================================================
let currentQ    = 0;
let score       = 0;
let answered    = false;
let quizData    = null;
let playerName  = "";
let quizChoice  = "";
let userAnswers = [];
let starRating  = 0;

// ============================================================
//  PAGE ROUTER
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    if (path.includes('quiz.html'))    setupQuizPage();
    if (path.includes('results.html')) setupResultsPage();
    if (path.includes('review.html'))  setupReviewPage();
    if (path.includes('admin.html'))   setupAdminPage();
});

// ============================================================
//  INDEX PAGE
// ============================================================
function startQuiz() {
    const nameEl = document.getElementById('playerName');
    const quizEl = document.getElementById('quizChoice');
    const errEl  = document.getElementById('errorMsg');
    const name   = nameEl.value.trim();
    const choice = quizEl.value;

    if (!name) {
        errEl.textContent = "Please enter your name first!";
        nameEl.focus();
        return;
    }
    if (name.length < 2) {
        errEl.textContent = "Name must be at least 2 characters!";
        nameEl.focus();
        return;
    }
    if (!choice) {
        errEl.textContent = "Please choose a quiz!";
        return;
    }

    errEl.textContent = "";
    sessionStorage.setItem('playerName', name);
    sessionStorage.setItem('quizChoice', choice);
    window.location.href = 'quiz.html';
}

// ============================================================
//  QUIZ PAGE SETUP
// ============================================================
function setupQuizPage() {
    playerName = sessionStorage.getItem('playerName');
    quizChoice = sessionStorage.getItem('quizChoice');

    if (!playerName || !quizChoice) {
        window.location.href = 'index.html';
        return;
    }

    quizData    = QUIZZES[parseInt(quizChoice)];
    currentQ    = 0;
    score       = 0;
    userAnswers = [];
    answered    = false;

    document.getElementById('quizTitle').textContent =
        quizData.emoji + " " + quizData.name + " Quiz";
    document.getElementById('playerDisplay').textContent =
        "Player: " + playerName;

    loadQuestion();
}

// ============================================================
//  LOAD QUESTION
// ============================================================
function loadQuestion() {
    const q     = quizData.questions[currentQ];
    const total = quizData.questions.length;
    answered    = false;

    const pct = (currentQ / total) * 100;
    document.getElementById('progressBar').style.width  = pct + '%';
    document.getElementById('progressText').textContent =
        "Question " + (currentQ + 1) + " of " + total;
    document.getElementById('qNumber').textContent =
        "Q" + (currentQ + 1);
    document.getElementById('questionText').textContent = q.q;
    document.getElementById('liveScore').textContent =
        "Score: " + score;

    const container = document.getElementById('optionsContainer');
    container.innerHTML = '';

    q.options.forEach(opt => {
        const btn       = document.createElement('button');
        btn.className   = 'option-btn';
        btn.textContent = opt;
        btn.onclick = () =>
            handleAnswer(btn, opt.charAt(0), q.answer, q.explanation);
        container.appendChild(btn);
    });

    document.getElementById('feedbackMsg').textContent = '';
    document.getElementById('feedbackMsg').className   = 'feedback-msg';

    const nextBtn       = document.getElementById('nextBtn');
    nextBtn.disabled    = true;
    nextBtn.textContent =
        currentQ === total - 1 ? 'Finish Quiz!' : 'Next Question';
}

// ============================================================
//  HANDLE ANSWER
// ============================================================
function handleAnswer(clickedBtn, chosen, correct, explanation) {
    if (answered) return;
    answered = true;

    const allBtns = document.querySelectorAll('.option-btn');
    const isRight = (chosen === correct);
    if (isRight) score++;

    userAnswers.push({
        q          : quizData.questions[currentQ].q,
        options    : quizData.questions[currentQ].options,
        chosen     : chosen,
        correct    : correct,
        explanation: explanation,
        isCorrect  : isRight
    });

    allBtns.forEach(btn => {
        btn.disabled = true;
        const letter = btn.textContent.charAt(0);
        if (letter === correct)             btn.classList.add('correct');
        if (btn === clickedBtn && !isRight) btn.classList.add('wrong');
    });

    const fb = document.getElementById('feedbackMsg');
    if (isRight) {
        fb.textContent = 'Correct! Well done!';
        fb.classList.add('feedback-correct');
    } else {
        fb.textContent = 'Wrong! Correct answer was ' + correct;
        fb.classList.add('feedback-wrong');
    }

    document.getElementById('liveScore').textContent = "Score: " + score;
    document.getElementById('nextBtn').disabled = false;
}

// ============================================================
//  NEXT QUESTION
// ============================================================
function nextQuestion() {
    currentQ++;
    if (currentQ < quizData.questions.length) {
        loadQuestion();
    } else {
        document.getElementById('progressBar').style.width = '100%';
        saveResult();
        window.location.href = 'results.html';
    }
}

// ============================================================
//  SAVE RESULT TO GOOGLE SHEET
// ============================================================
function saveResult() {
    const answerSummary = userAnswers.map((a, i) => {
        const status = a.isCorrect ? "CORRECT" : "WRONG";
        return "Q" + (i+1) + ": " + status +
               " (You chose " + a.chosen +
               ", Correct: " + a.correct + ")";
    }).join(" | ");

    const result = {
        name   : playerName,
        quiz   : quizData.name,
        quizId : parseInt(quizChoice),
        score  : score,
        total  : quizData.questions.length,
        percent: Math.round((score / quizData.questions.length) * 100),
        date   : new Date().toLocaleString('en-IN'),
        answers: answerSummary
    };

    // Send to Google Sheet
    fetch(SHEET_URL, {
        method : 'POST',
        mode   : 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify(result)
    }).catch(err => console.log('Sheet save error:', err));

    // Save locally for results page
    sessionStorage.setItem('latestResult', JSON.stringify(result));
}

// ============================================================
//  RESULTS PAGE
// ============================================================
function setupResultsPage() {
    const data = JSON.parse(sessionStorage.getItem('latestResult'));
    if (!data) {
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('resultName').textContent =
        "Player: " + data.name;
    document.getElementById('resultQuizName').textContent =
        "Quiz: " + data.quiz;
    document.getElementById('scoreDisplay').textContent =
        data.score + "/" + data.total;
    document.getElementById('resultDate').textContent =
        data.date;

    const starCount = Math.round((data.score / data.total) * 5);
    document.getElementById('starsDisplay').textContent =
        '⭐'.repeat(starCount) + '☆'.repeat(5 - starCount);

    const pct = data.percent;
    let msg = "";
    if (pct === 100)     msg = "PERFECT SCORE! You are absolutely brilliant!";
    else if (pct >= 80)  msg = "Excellent work! You really know your stuff!";
    else if (pct >= 60)  msg = "Good job! A bit more practice and you will ace it!";
    else if (pct >= 40)  msg = "Not bad! Keep learning and try again!";
    else                 msg = "Don't give up! Every expert was once a beginner!";

    document.getElementById('resultMessage').textContent = msg;

    buildAnswerReview(data.userAnswers || []);
    buildOtherQuizButtons(data.quizId);
}

// ============================================================
//  BUILD ANSWER REVIEW
// ============================================================
function buildAnswerReview(answers) {
    const container = document.getElementById('reviewContainer');
    container.innerHTML = '';

    if (!answers || answers.length === 0) {
        container.innerHTML = '<p style="color:#a8b2d8;">No answers to review.</p>';
        return;
    }

    answers.forEach((a, i) => {
        const div     = document.createElement('div');
        div.className = 'review-item ' +
            (a.isCorrect ? 'correct-review' : 'wrong-review');

        const chosenOpt  =
            a.options.find(o => o.charAt(0) === a.chosen)  || a.chosen;
        const correctOpt =
            a.options.find(o => o.charAt(0) === a.correct) || a.correct;

        div.innerHTML = `
            <p class="review-q">Q${i+1}. ${a.q}</p>
            <p style="color:${a.isCorrect ? '#00d26a':'#ff4757'};
                      font-size:0.88rem; margin:4px 0;">
                Your answer: ${chosenOpt}
            </p>
            ${!a.isCorrect ? `
                <p style="color:#00d26a; font-size:0.88rem;
                           font-weight:700; margin:4px 0;">
                    Correct answer: ${correctOpt}
                </p>` : ''}
            <p style="color:#a8b2d8; font-size:0.83rem;
                      margin-top:6px; line-height:1.5;">
                ${a.explanation}
            </p>
            <p style="color:${a.isCorrect ? '#00d26a':'#ff4757'};
                      font-weight:800; font-size:0.82rem; margin-top:6px;">
                ${a.isCorrect ? 'CORRECT' : 'WRONG'}
            </p>
        `;
        container.appendChild(div);
    });
}

// ============================================================
//  OTHER QUIZ BUTTONS
// ============================================================
function buildOtherQuizButtons(playedId) {
    const container = document.getElementById('otherQuizButtons');
    container.innerHTML = '';

    [1, 2, 3].filter(id => id !== playedId).forEach(id => {
        const q         = QUIZZES[id];
        const btn       = document.createElement('button');
        btn.className   = 'other-quiz-btn';
        btn.textContent = q.emoji + " Play: " + q.name;
        btn.style.marginBottom = '10px';
        btn.onclick = () => {
            sessionStorage.setItem('quizChoice', id);
            window.location.href = 'quiz.html';
        };
        container.appendChild(btn);
    });
}

function playAgainSame() {
    window.location.href = 'quiz.html';
}

// ============================================================
//  REVIEW PAGE
// ============================================================
function setupReviewPage() {
    const name = sessionStorage.getItem('playerName');
    const el   = document.getElementById('reviewPlayerName');
    if (el && name) {
        el.textContent = "Hey " + name + ", we would love to hear from you!";
    }

    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.addEventListener('click', () => {
            starRating = parseInt(star.getAttribute('data-val'));
            updateStars(starRating);
        });
        star.addEventListener('mouseover', () => {
            updateStars(parseInt(star.getAttribute('data-val')), true);
        });
    });

    const starContainer = document.getElementById('starRating');
    if (starContainer) {
        starContainer.addEventListener('mouseleave', () => {
            updateStars(starRating);
        });
    }
}

// ============================================================
//  UPDATE STARS
// ============================================================
function updateStars(rating, hover = false) {
    const stars  = document.querySelectorAll('.star');
    const labels = ["", "Poor", "Fair", "Good", "Great!", "Amazing!"];

    stars.forEach((s, i) => {
        i < rating
            ? s.classList.add('active')
            : s.classList.remove('active');
    });

    const labelEl = document.getElementById('starLabel');
    if (labelEl && rating > 0) {
        labelEl.textContent = labels[rating];
    }
}

// ============================================================
//  SUBMIT REVIEW TO GOOGLE SHEET
// ============================================================
function submitReview() {
    const liked     = document.getElementById('likedText').value.trim();
    const suggest   = document.getElementById('suggestText').value.trim();
    const diff      = document.getElementById('difficulty').value;
    const recommend =
        document.querySelector('input[name="recommend"]:checked');
    const errEl     = document.getElementById('reviewError');

    if (starRating === 0) {
        errEl.textContent = "Please give a star rating!";
        return;
    }
    if (!diff) {
        errEl.textContent = "Please select difficulty level!";
        return;
    }
    if (!recommend) {
        errEl.textContent = "Please answer if you would recommend it!";
        return;
    }

    errEl.textContent = "";

    const name       = sessionStorage.getItem('playerName') || 'Anonymous';
    const resultData =
        JSON.parse(sessionStorage.getItem('latestResult'));

    const review = {
        name       : name,
        quiz       : resultData ? resultData.quiz : 'Unknown',
        score      : resultData
            ? resultData.score + "/" + resultData.total
            : 'N/A',
        stars      : starRating,
        liked      : liked      || 'nothing written',
        suggestions: suggest    || 'nothing written',
        difficulty : diff,
        recommend  : recommend.value,
        date       : new Date().toLocaleString('en-IN'),
        type       : 'REVIEW'
    };

    // Send review to Google Sheet
    fetch(SHEET_URL, {
        method : 'POST',
        mode   : 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify(review)
    }).catch(err => console.log('Review save error:', err));

    const card = document.querySelector('.card');
    card.innerHTML = `
        <div style="text-align:center; padding:20px;">
            <div style="font-size:4rem; margin-bottom:15px;">🎉</div>
            <h2>Thank You, ${name}!</h2>
            <p class="subtitle">Your review has been submitted!</p>
            <p style="color:#ffd32a; font-size:1.3rem; margin:15px 0;">
                ${'⭐'.repeat(starRating)}
            </p>
            <button class="main-btn"
                onclick="window.location.href='index.html'">
                Back to Home
            </button>
        </div>
    `;
}

// ============================================================
//  ADMIN PAGE
// ============================================================
function setupAdminPage() {
    if (sessionStorage.getItem('adminLoggedIn') === 'true') {
        showDashboard();
    }
    const pwdEl = document.getElementById('adminPassword');
    if (pwdEl) {
        pwdEl.addEventListener('keydown', e => {
            if (e.key === 'Enter') adminLogin();
        });
    }
}

function adminLogin() {
    const pwd   = document.getElementById('adminPassword').value;
    const errEl = document.getElementById('loginError');

    if (pwd === ADMIN_PASSWORD) {
        sessionStorage.setItem('adminLoggedIn', 'true');
        showDashboard();
    } else {
        errEl.textContent = "Wrong password! Try again.";
        document.getElementById('adminPassword').value = '';
    }
}

function showDashboard() {
    document.getElementById('loginSection').style.display     = 'none';
    document.getElementById('dashboardSection').style.display = 'block';
    showSheetLink();
}

function adminLogout() {
    sessionStorage.removeItem('adminLoggedIn');
    document.getElementById('loginSection').style.display     = 'block';
    document.getElementById('dashboardSection').style.display = 'none';
    document.getElementById('adminPassword').value = '';
}

// ============================================================
//  SHOW GOOGLE SHEET LINK IN ADMIN
// ============================================================
function showSheetLink() {
    const container = document.getElementById('resultsContainer');
    container.innerHTML = `
        <div style="text-align:center; padding:30px;">
            <div style="font-size:3rem; margin-bottom:15px;">📊</div>
            <h3 style="color:#00d26a; margin-bottom:12px;">
                All data is in your Google Sheet!
            </h3>
            <p style="color:#a8b2d8; margin-bottom:20px; line-height:1.7;">
                Every time someone plays the quiz<br>
                their result automatically appears<br>
                in your Google Sheet in real time!
            </p>
            <a href="https://sheets.google.com"
               target="_blank"
               style="
                 display:inline-block;
                 padding:14px 30px;
                 background:linear-gradient(135deg,#00d26a,#00b894);
                 color:white;
                 border-radius:12px;
                 text-decoration:none;
                 font-weight:700;
                 font-size:1rem;
               ">
               📊 Open Google Sheets
            </a>
            <p style="color:#a8b2d8; margin-top:20px; font-size:0.85rem;">
                Look for the sheet named: Quiz Results
            </p>
        </div>
    `;

    const reviewContainer = document.getElementById('reviewsContainer');
    reviewContainer.innerHTML = `
        <div style="text-align:center; padding:30px;">
            <div style="font-size:3rem; margin-bottom:15px;">✍️</div>
            <h3 style="color:#a855f7; margin-bottom:12px;">
                Reviews are also in Google Sheet!
            </h3>
            <p style="color:#a8b2d8; margin-bottom:20px;">
                All friend reviews appear automatically
                in your Google Sheet!
            </p>
            <a href="https://sheets.google.com"
               target="_blank"
               style="
                 display:inline-block;
                 padding:14px 30px;
                 background:linear-gradient(135deg,#a855f7,#6c5ce7);
                 color:white;
                 border-radius:12px;
                 text-decoration:none;
                 font-weight:700;
                 font-size:1rem;
               ">
               ✍️ See Reviews in Sheets
            </a>
        </div>
    `;

    updateStats();
}

// ============================================================
//  STATS FROM LOCAL STORAGE AS BACKUP
// ============================================================
function updateStats() {
    document.getElementById('totalPlayers').textContent  = '📊';
    document.getElementById('totalQuizzes').textContent  = '📊';
    document.getElementById('avgScore').textContent      = '📊';
    document.getElementById('totalReviews').textContent  = '📊';
}

function showTab(tabId, clickedBtn) {
    document.querySelectorAll('.tab-content').forEach(t => {
        t.style.display = 'none';
    });
    document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('active');
    });
    document.getElementById(tabId).style.display = 'block';
    clickedBtn.classList.add('active');
}

function filterResults() {}
function clearResults() {
    alert("To clear results go to your Google Sheet and delete the rows!");
}
function clearReviews() {
    alert("To clear reviews go to your Google Sheet and delete the rows!");
}
