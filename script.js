// ============================================================
//   ⚙️  SETTINGS — CHANGE THESE!
// ============================================================

// 🔑 Your admin password — change to whatever you want!
const ADMIN_PASSWORD = "myquiz2025";

// ============================================================
//   📚  ALL QUIZ DATA
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
                explanation: "Classical conditioning (Pavlov) shows that we associate neutral things with painful events, creating fear responses."
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
                explanation: "Memory is not a recording — it's reconstructed every time we recall it, influenced by our current emotions and beliefs."
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
                explanation: "The halo effect means if someone seems good in one way, we assume they're good in other ways too — based on first impression."
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
                explanation: "Cognitive dissonance is the discomfort of having conflicting beliefs and behaviors — like knowing smoking is bad but still doing it."
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
                explanation: "Google's Gemini (formerly Bard) is their main AI chatbot competing with ChatGPT."
            },
            {
                q: "Who is the CEO of OpenAI (as of 2026)?",
                options: [
                    "A. Elon Musk",
                    "B. Sam Altman",
                    "C. Sundar Pichai",
                    "D. Satya Nadella"
                ],
                answer: "B",
                explanation: "Sam Altman is the CEO of OpenAI. Elon Musk was an early backer but left the board."
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
                explanation: "Microsoft Copilot is built into Windows, Office, and Bing — powered by OpenAI technology."
            },
            {
                q: "Which country/region has been leading global discussions on AI regulation?",
                options: [
                    "A. India",
                    "B. USA",
                    "C. European Union",
                    "D. Brazil"
                ],
                answer: "C",
                explanation: "The EU passed the AI Act — the world's first major AI law — setting global standards for AI regulation."
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
                explanation: "Profit = Selling Price − Cost Price = 250 − 200 = ₹50"
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
                explanation: "√144 = 12 because 12 × 12 = 144"
            },
            {
                q: "Solve: 15 + (25 ÷ 5)",
                options: [
                    "A. 8",
                    "B. 10",
                    "C. 20",
                    "D. 25"
                ],
                answer: "C",
                explanation: "Using BODMAS: 25 ÷ 5 = 5 first, then 15 + 5 = 20"
            },
            {
                q: "What is 9² (9 squared)?",
                options: [
                    "A. 18",
                    "B. 72",
                    "C. 81",
                    "D. 99"
                ],
                answer: "C",
                explanation: "9² = 9 × 9 = 81"
            },
            {
                q: "If a triangle has angles 60°, 60°, 60° — what type is it?",
                options: [
                    "A. Isosceles",
                    "B. Right-angled",
                    "C. Scalene",
                    "D. Equilateral"
                ],
                answer: "D",
                explanation: "An equilateral triangle has ALL three sides and angles equal — 60° each."
            }
        ]
    }
};

// ============================================================
//   🌐  STATE
// ============================================================
let currentQ    = 0;
let score       = 0;
let answered    = false;
let quizData    = null;
let playerName  = "";
let quizChoice  = "";
let userAnswers = [];   // stores { chosen, correct, q, options, explanation }
let starRating  = 0;

// ============================================================
//   🚦  PAGE ROUTER — detect which page we're on
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    if (path.includes('quiz.html'))    setupQuizPage();
    if (path.includes('results.html')) setupResultsPage();
    if (path.includes('review.html'))  setupReviewPage();
    if (path.includes('admin.html'))   setupAdminPage();
});

// ============================================================
//   🏠  INDEX PAGE
// ============================================================
function startQuiz() {
    const nameEl  = document.getElementById('playerName');
    const quizEl  = document.getElementById('quizChoice');
    const errEl   = document.getElementById('errorMsg');

    const name   = nameEl.value.trim();
    const choice = quizEl.value;

    // Validate
    if (!name) {
        errEl.textContent = "⚠️ Please enter your name first!";
        nameEl.focus();
        return;
    }
    if (name.length < 2) {
        errEl.textContent = "⚠️ Name must be at least 2 characters!";
        nameEl.focus();
        return;
    }
    if (!choice) {
        errEl.textContent = "⚠️ Please choose a quiz!";
        return;
    }

    errEl.textContent = "";

    // Save data
    sessionStorage.setItem('playerName', name);
    sessionStorage.setItem('quizChoice', choice);

    // Reset played list if coming fresh (name changed)
    const savedName = localStorage.getItem('currentSessionName');
    if (savedName !== name) {
        localStorage.setItem('currentSessionName', name);
        localStorage.setItem('playedQuizzes', JSON.stringify([]));
    }

    window.location.href = 'quiz.html';
}

// Allow Enter key on index page
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const nameEl = document.getElementById('playerName');
        if (nameEl && document.activeElement === nameEl) {
            startQuiz();
        }
    }
});

// ============================================================
//   🧩  QUIZ PAGE
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

    document.getElementById('quizTitle').textContent    =
        `${quizData.emoji} ${quizData.name} Quiz`;
    document.getElementById('playerDisplay').textContent =
        `👤 ${playerName}`;

    loadQuestion();
}

// ============================================================
function loadQuestion() {
    const q     = quizData.questions[currentQ];
    const total = quizData.questions.length;

    answered = false;

    // Progress
    const pct = (currentQ / total) * 100;
    document.getElementById('progressBar').style.width  = pct + '%';
    document.getElementById('progressText').textContent =
        `Question ${currentQ + 1} of ${total}`;

    // Q number badge
    document.getElementById('qNumber').textContent = `Q${currentQ + 1}`;

    // Question text
    document.getElementById('questionText').textContent = q.q;

    // Live score
    document.getElementById('liveScore').textContent = `Score: ${score}`;

    // Options
    const container = document.getElementById('optionsContainer');
    container.innerHTML = '';

    q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className   = 'option-btn';
        btn.textContent = opt;
        btn.onclick = () => handleAnswer(btn, opt.charAt(0), q.answer, q.explanation);
        container.appendChild(btn);
    });

    // Reset
    document.getElementById('feedbackMsg').textContent  = '';
    document.getElementById('feedbackMsg').className    = 'feedback-msg';
    const nextBtn = document.getElementById('nextBtn');
    nextBtn.disabled    = true;
    nextBtn.textContent =
        currentQ === total - 1 ? '🏁 Finish Quiz!' : 'Next Question ➡️';
}

// ============================================================
function handleAnswer(clickedBtn, chosen, correct, explanation) {
    if (answered) return;
    answered = true;

    const allBtns = document.querySelectorAll('.option-btn');
    const isRight = (chosen === correct);

    if (isRight) score++;

    // Store answer for review
    userAnswers.push({
        q          : quizData.questions[currentQ].q,
        options    : quizData.questions[currentQ].options,
        chosen     : chosen,
        correct    : correct,
        explanation: explanation,
        isCorrect  : isRight
    });

    // Highlight buttons
    allBtns.forEach(btn => {
        btn.disabled = true;
        const letter = btn.textContent.charAt(0);
        if (letter === correct)  btn.classList.add('correct');
        if (btn === clickedBtn && !isRight) btn.classList.add('wrong');
    });

    // Feedback
    const fb = document.getElementById('feedbackMsg');
    if (isRight) {
        fb.textContent = '✅ Correct! Well done!';
        fb.classList.add('feedback-correct');
    } else {
        fb.textContent = `❌ Wrong! Correct answer was ${correct}.`;
        fb.classList.add('feedback-wrong');
    }

    // Update live score
    document.getElementById('liveScore').textContent = `Score: ${score}`;

    // Enable next
    document.getElementById('nextBtn').disabled = false;
}

// ============================================================
function nextQuestion() {
    currentQ++;

    if (currentQ < quizData.questions.length) {
        loadQuestion();
    } else {
        // Quiz done!
        document.getElementById('progressBar').style.width = '100%';
        saveResult();
        window.location.href = 'results.html';
    }
}

// ============================================================
//   💾  SAVE RESULT
// ============================================================
function saveResult() {
    const result = {
        id         : Date.now(),
        name       : playerName,
        quiz       : quizData.name,
        quizId     : parseInt(quizChoice),
        score      : score,
        total      : quizData.questions.length,
        percent    : Math.round((score / quizData.questions.length) * 100),
        date       : new Date().toLocaleString('en-IN'),
        userAnswers: userAnswers
    };

    // Save to localStorage (all results)
    const all = JSON.parse(localStorage.getItem('quizResults') || '[]');
    all.push(result);
    localStorage.setItem('quizResults', JSON.stringify(all));

    // Track which quizzes this person played
    const played = JSON.parse(localStorage.getItem('playedQuizzes') || '[]');
    if (!played.includes(parseInt(quizChoice))) {
        played.push(parseInt(quizChoice));
        localStorage.setItem('playedQuizzes', JSON.stringify(played));
    }

    // Latest result for results page
    sessionStorage.setItem('latestResult', JSON.stringify(result));
}

// ============================================================
//   🏆  RESULTS PAGE
// ============================================================
function setupResultsPage() {
    const data = JSON.parse(sessionStorage.getItem('latestResult'));

    if (!data) {
        window.location.href = 'index.html';
        return;
    }

    // Basic info
    document.getElementById('resultName').textContent     = `👤 ${data.name}`;
    document.getElementById('resultQuizName').textContent =
        `📚 ${data.quiz} Quiz`;
    document.getElementById('scoreDisplay').textContent   =
        `${data.score}/${data.total}`;
    document.getElementById('resultDate').textContent     =
        `📅 ${data.date}`;

    // Stars
    const starCount = Math.round((data.score / data.total) * 5);
    const starsHTML = '⭐'.repeat(starCount) + '☆'.repeat(5 - starCount);
    document.getElementById('starsDisplay').textContent = starsHTML;

    // Message
    const pct = data.percent;
    let msg = "";
    if (pct === 100) msg = "🌟 PERFECT SCORE! You're absolutely brilliant!";
    else if (pct >= 80) msg = "🎉 Excellent work! You really know your stuff!";
    else if (pct >= 60) msg = "👍 Good job! A bit more practice and you'll ace it!";
    else if (pct >= 40) msg = "😊 Not bad! Keep learning and try again!";
    else msg = "💪 Don't give up! Every expert was once a beginner!";

    document.getElementById('resultMessage').textContent = msg;

    // Review Answers Section
    buildAnswerReview(data.userAnswers);

    // Other quiz buttons
    buildOtherQuizButtons(data.quizId);
}

// ============================================================
function buildAnswerReview(answers) {
    const container = document.getElementById('reviewContainer');
    container.innerHTML = '';

    if (!answers || answers.length === 0) {
        container.innerHTML = '<p class="no-data">No answers to review.</p>';
        return;
    }

    answers.forEach((a, i) => {
        const div = document.createElement('div');
        div.className = `review-item ${a.isCorrect ? 'correct-review' : 'wrong-review'}`;

        // Find the full text of chosen and correct answers
        const chosenOption  = a.options.find(o => o.charAt(0) === a.chosen)  || a.chosen;
        const correctOption = a.options.find(o => o.charAt(0) === a.correct) || a.correct;

        div.innerHTML = `
            <p class="review-q">Q${i+1}. ${a.q}</p>
            <p class="review-your" style="color: ${a.isCorrect ? '#00d26a' : '#ff4757'}">
                Your answer: ${chosenOption}
            </p>
            ${!a.isCorrect ? `
                <p class="review-correct-ans">
                    ✅ Correct answer: ${correctOption}
                </p>
            ` : ''}
            <p style="color:#a8b2d8; font-size:0.83rem; margin-top:6px; line-height:1.5;">
                💡 ${a.explanation}
            </p>
            <p class="review-status" style="color: ${a.isCorrect ? '#00d26a' : '#ff4757'}">
                ${a.isCorrect ? '✅ CORRECT' : '❌ WRONG'}
            </p>
        `;
        container.appendChild(div);
    });
}

// ============================================================
function buildOtherQuizButtons(playedId) {
    const container = document.getElementById('otherQuizButtons');
    container.innerHTML = '';

    const allIds  = [1, 2, 3];
    const others  = allIds.filter(id => id !== playedId);

    others.forEach(id => {
        const q   = QUIZZES[id];
        const btn = document.createElement('button');
        btn.className   = 'other-quiz-btn';
        btn.textContent = `${q.emoji} Play: ${q.name}`;
        btn.style.marginBottom = '10px';
        btn.onclick = () => {
            sessionStorage.setItem('quizChoice', id);
            window.location.href = 'quiz.html';
        };
        container.appendChild(btn);
    });
}

// ============================================================
function playAgainSame() {
    window.location.href = 'quiz.html';
}

// ============================================================
//   ✍️  REVIEW PAGE
// ============================================================
function setupReviewPage() {
    const name = sessionStorage.getItem('playerName');
    const el   = document.getElementById('reviewPlayerName');

    if (el && name) {
        el.textContent = `Hey ${name}, we'd love to hear from you! 🌟`;
    }

    // Setup star rating clicks
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.addEventListener('click', () => {
            starRating = parseInt(star.getAttribute('data-val'));
            updateStars(starRating);
        });

        star.addEventListener('mouseover', () => {
            const val = parseInt(star.getAttribute('data-val'));
            updateStars(val, true);
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
function updateStars(rating, hover = false) {
    const stars  = document.querySelectorAll('.star');
    const labels = ["", "😔 Poor", "😐 Fair", "🙂 Good", "😊 Great!", "🤩 Amazing!"];

    stars.forEach((s, i) => {
        if (i < rating) {
            s.classList.add('active');
        } else {
            s.classList.remove('active');
        }
    });

    const labelEl = document.getElementById('starLabel');
    if (labelEl && !hover && rating > 0) {
        labelEl.textContent = labels[rating];
    } else if (labelEl && hover) {
        labelEl.textContent = labels[rating];
    }
}

// ============================================================
function submitReview() {
    const liked     = document.getElementById('likedText').value.trim();
    const suggest   = document.getElementById('suggestText').value.trim();
    const diff      = document.getElementById('difficulty').value;
    const recommend = document.querySelector('input[name="recommend"]:checked');
    const errEl     = document.getElementById('reviewError');

    // Validation
    if (starRating === 0) {
        errEl.textContent = "⚠️ Please give a star rating!";
        return;
    }
    if (!diff) {
        errEl.textContent = "⚠️ Please select difficulty level!";
        return;
    }
    if (!recommend) {
        errEl.textContent = "⚠️ Please answer if you'd recommend it!";
        return;
    }

    errEl.textContent = "";

    const name     = sessionStorage.getItem('playerName') || 'Anonymous';
    const resultData = JSON.parse(sessionStorage.getItem('latestResult'));

    const review = {
        id          : Date.now(),
        name        : name,
        quiz        : resultData ? resultData.quiz : 'Unknown',
        score       : resultData ? `${resultData.score}/${resultData.total}` : 'N/A',
        stars       : starRating,
        liked       : liked || '(nothing written)',
        suggestions : suggest || '(nothing written)',
        difficulty  : diff,
        recommend   : recommend.value,
        date        : new Date().toLocaleString('en-IN')
    };

    // Save
    const all = JSON.parse(localStorage.getItem('quizReviews') || '[]');
    all.push(review);
    localStorage.setItem('quizReviews', JSON.stringify(all));

    // Show success then redirect
    const card = document.querySelector('.card');
    card.innerHTML = `
        <div style="text-align:center; padding: 20px;">
            <div style="font-size:4rem; margin-bottom:15px;">🎉</div>
            <h2>Thank You, ${name}!</h2>
            <p class="subtitle">Your review has been submitted successfully!</p>
            <p style="color:#ffd32a; font-size:1.1rem; margin:15px 0;">
                ${'⭐'.repeat(starRating)}
            </p>
            <button class="main-btn" onclick="window.location.href='index.html'">
                🏠 Back to Home
            </button>
        </div>
    `;
}

// ============================================================
//   🔒  ADMIN PAGE
// ============================================================
function setupAdminPage() {
    if (sessionStorage.getItem('adminLoggedIn') === 'true') {
        showDashboard();
    }

    // Allow Enter key for login
    const pwdEl = document.getElementById('adminPassword');
    if (pwdEl) {
        pwdEl.addEventListener('keydown', e => {
            if (e.key === 'Enter') adminLogin();
        });
    }
}

// ============================================================
function adminLogin() {
    const pwd   = document.getElementById('adminPassword').value;
    const errEl = document.getElementById('loginError');

    if (pwd === ADMIN_PASSWORD) {
        sessionStorage.setItem('adminLoggedIn', 'true');
        showDashboard();
    } else {
        errEl.textContent = "❌ Wrong password! Try again.";
        document.getElementById('adminPassword').value = '';
        // Shake effect
        const input = document.getElementById('adminPassword');
        input.style.borderColor = '#ff4757';
        setTimeout(() => { input.style.borderColor = ''; }, 1500);
    }
}

// ============================================================
function showDashboard() {
    document.getElementById('loginSection').style.display    = 'none';
    document.getElementById('dashboardSection').style.display = 'block';
    loadStats();
    loadResults();
    loadReviews();
}

// ============================================================
function adminLogout() {
    sessionStorage.removeItem('adminLoggedIn');
    document.getElementById('loginSection').style.display    = 'block';
    document.getElementById('dashboardSection').style.display = 'none';
    document.getElementById('adminPassword').value = '';
}

// ============================================================
function loadStats() {
    const results = JSON.parse(localStorage.getItem('quizResults') || '[]');
    const reviews = JSON.parse(localStorage.getItem('quizReviews') || '[]');

    // Unique players
    const uniqueNames = [...new Set(results.map(r => r.name.toLowerCase()))];
    document.getElementById('totalPlayers').textContent = uniqueNames.length;

    // Total quizzes
    document.getElementById('totalQuizzes').textContent = results.length;

    // Average score %
    if (results.length > 0) {
        const avg = results.reduce((s, r) => s + r.percent, 0) / results.length;
        document.getElementById('avgScore').textContent = Math.round(avg) + '%';
    }

    // Total reviews
    document.getElementById('totalReviews').textContent = reviews.length;
}

// ============================================================
function loadResults(filterName = '') {
    const container = document.getElementById('resultsContainer');
    let results     = JSON.parse(localStorage.getItem('quizResults') || '[]');

    // Filter by name
    if (filterName) {
        results = results.filter(r =>
            r.name.toLowerCase().includes(filterName.toLowerCase())
        );
    }

    // Newest first
    results = results.reverse();

    if (results.length === 0) {
        container.innerHTML = `
            <div class="no-data">
                ${filterName
                    ? `No results found for "${filterName}"`
                    : '🎮 No one has played yet! Share the link with your friends!'
                }
            </div>`;
        return;
    }

    container.innerHTML = results.map(r => `
        <div class="result-entry">
            <div class="entry-top">
                <span class="entry-name">👤 ${r.name}</span>
                <span class="score-pill">${r.score}/${r.total} (${r.percent}%)</span>
            </div>
            <p class="entry-detail">📚 Quiz: ${r.quiz}</p>
            <p class="entry-detail">📅 ${r.date}</p>
            <p class="entry-detail">
                ${'⭐'.repeat(Math.round(r.percent / 20))}${'☆'.repeat(5 - Math.round(r.percent / 20))}
            </p>
        </div>
    `).join('');
}

// ============================================================
function loadReviews() {
    const container = document.getElementById('reviewsContainer');
    const reviews   = JSON.parse(localStorage.getItem('quizReviews') || '[]').reverse();

    if (reviews.length === 0) {
        container.innerHTML =
            '<div class="no-data">✍️ No reviews yet!</div>';
        return;
    }

    container.innerHTML = reviews.map(r => `
        <div class="review-entry">
            <div class="review-entry-name">👤 ${r.name}</div>
            <p class="review-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</p>
            <p><strong>📚 Quiz:</strong> ${r.quiz} | Score: ${r.score}</p>
            <p><strong>🎯 Difficulty:</strong> ${r.difficulty}</p>
            <p><strong>📢 Recommend:</strong> ${r.recommend}</p>
            <p><strong>👍 Liked:</strong> ${r.liked}</p>
            <p><strong>💡 Suggestions:</strong> ${r.suggestions}</p>
            <p class="small-text" style="margin-top:8px;">📅 ${r.date}</p>
        </div>
    `).join('');
}

// ============================================================
function filterResults() {
    const searchVal = document.getElementById('searchBox').value;
    loadResults(searchVal);
}

// ============================================================
function showTab(tabId, clickedBtn) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(t => {
        t.style.display = 'none';
    });

    // Remove active from all tab buttons
    document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabId).style.display = 'block';
    clickedBtn.classList.add('active');
}

// ============================================================
function clearResults() {
    if (confirm("⚠️ Delete ALL quiz results? This cannot be undone!")) {
        localStorage.removeItem('quizResults');
        loadStats();
        loadResults();
    }
}

function clearReviews() {
    if (confirm("⚠️ Delete ALL reviews? This cannot be undone!")) {
        localStorage.removeItem('quizReviews');
        loadReviews();
    }
}