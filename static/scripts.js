var gk_isXlsx = false;
var gk_xlsxFileLookup = {};
var gk_fileData = {};

function filledCell(cell) {
    return cell !== '' && cell != null;
}

function loadFileData(filename) {
    if (gk_isXlsx && gk_xlsxFileLookup[filename]) {
        try {
            var workbook = XLSX.read(gk_fileData[filename], { type: 'base64' });
            var firstSheetName = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[firstSheetName];
            var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, blankrows: false, defval: '' });
            var filteredData = jsonData.filter(row => row.some(filledCell));
            var headerRowIndex = filteredData.findIndex((row, index) =>
                row.filter(filledCell).length >= filteredData[index + 1]?.filter(filledCell).length
            );
            if (headerRowIndex === -1 || headerRowIndex > 25) {
                headerRowIndex = 0;
            }
            var csv = XLSX.utils.aoa_to_sheet(filteredData.slice(headerRowIndex));
            csv = XLSX.utils.sheet_to_csv(csv, { header: 1 });
            return csv;
        } catch (e) {
            console.error(e);
            return "";
        }
    }
    return gk_fileData[filename] || "";
}

if (!localStorage.getItem('cookieConsent')) {
    document.getElementById('cookie-consent').style.display = 'block';
}

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    document.getElementById('cookie-consent').style.display = 'none';
    gtag('consent', 'update', { 'analytics_storage': 'granted' });
}

function declineCookies() {
    localStorage.setItem('cookieConsent', 'declined');
    document.getElementById('cookie-consent').style.display = 'none';
    gtag('consent', 'update', { 'analytics_storage': 'denied' });
}

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-XXXXX-Y');

i18next.init({
    lng: 'en',
    resources: {
        en: {
            translation: {
                "welcome_message": "Welcome to Greenhouse Telehealth TCD",
                "hero_subtitle": "Empowering Chad with innovative telehealth for accessible, quality healthcare.",
                "book_appointment": "Book an Appointment",
                "cookie_message": "We use cookies to improve your experience.",
                "symptom_placeholder": "Enter symptoms (e.g., fever, cough)",
                "search_resources": "Search resources...",
                "quiz_question_1": "What is a key benefit of telehealth?",
                "quiz_answer_1_correct": "Correct! Telehealth improves access to care, especially in remote areas.",
                "quiz_answer_1_incorrect": "Try again! Accessibility is a key benefit of telehealth.",
                "quiz_question_2": "What is a common health issue in Chad addressed by telehealth?",
                "quiz_answer_2_correct": "Correct! Maternal health is a major focus due to high mortality rates.",
                "quiz_answer_2_incorrect": "Try again! Maternal health is a critical issue in Chad.",
                "quiz_question_3": "How can telehealth help with chronic diseases?",
                "quiz_answer_3_correct": "Correct! Remote monitoring allows ongoing care without frequent travel.",
                "quiz_answer_3_incorrect": "Try again! Remote monitoring is key for chronic disease management.",
                "quiz_question_4": "What technology supports telehealth consultations?",
                "quiz_answer_4_correct": "Correct! Video calls enable direct doctor-patient interactions.",
                "quiz_answer_4_incorrect": "Try again! Video calls are essential for telehealth.",
                "next_question": "Next Question",
                "nav_login": "Login"
            }
        },
        fr: {
            translation: {
                "welcome_message": "Bienvenue à Greenhouse Telehealth TCD",
                "hero_subtitle": "Autonomiser le Tchad avec des solutions de télésanté innovantes pour des soins accessibles et de qualité.",
                "book_appointment": "Prendre un rendez-vous",
                "cookie_message": "Nous utilisons des cookies pour améliorer votre expérience.",
                "symptom_placeholder": "Entrez les symptômes (par ex., fièvre, toux)",
                "search_resources": "Rechercher des ressources...",
                "quiz_question_1": "Quel est un avantage clé de la télésanté ?",
                "quiz_answer_1_correct": "Correct ! La télésanté améliore l'accès aux soins, surtout dans les zones éloignées.",
                "quiz_answer_1_incorrect": "Réessayez ! L'accessibilité est un avantage clé de la télésanté.",
                "quiz_question_2": "Quel est un problème de santé courant au Tchad abordé par la télésanté ?",
                "quiz_answer_2_correct": "Correct ! La santé maternelle est une priorité en raison des taux de mortalité élevés.",
                "quiz_answer_2_incorrect": "Réessayez ! La santé maternelle est un problème crucial au Tchad.",
                "quiz_question_3": "Comment la télésanté aide-t-elle avec les maladies chroniques ?",
                "quiz_answer_3_correct": "Correct ! La surveillance à distance permet un suivi continu sans déplacements fréquents.",
                "quiz_answer_3_incorrect": "Réessayez ! La surveillance à distance est essentielle pour gérer les maladies chroniques.",
                "quiz_question_4": "Quelle technologie soutient les consultations en télésanté ?",
                "quiz_answer_4_correct": "Correct ! Les appels vidéo permettent des interactions directes entre médecins et patients.",
                "quiz_answer_4_incorrect": "Réessayez ! Les appels vidéo sont essentiels pour la télésanté.",
                "next_question": "Question suivante",
                "nav_login": "Connexion"
            }
        },
        ar: {
            translation: {
                "welcome_message": "مرحبًا بكم في Greenhouse Telehealth TCD",
                "hero_subtitle": "تمكين تشاد بحلول التطبيب عن بُعد المبتكرة لتوفير رعاية صحية عالية الجودة وسهلة الوصول.",
                "book_appointment": "حجز موعد",
                "cookie_message": "نستخدم ملفات تعريف الارتباط لتحسين تجربتك.",
                "symptom_placeholder": "أدخل الأعراض (مثل الحمى، السعال)",
                "search_resources": "البحث في الموارد...",
                "quiz_question_1": "ما هي فائدة رئيسية للتطبيب عن بُعد؟",
                "quiz_answer_1_correct": "صحيح! التطبيب عن بُعد يحسن الوصول إلى الرعاية، خاصة في المناطق النائية.",
                "quiz_answer_1_incorrect": "حاول مرة أخرى! الوصولية هي فائدة رئيسية للتطبيب عن بُعد.",
                "quiz_question_2": "ما هي مشكلة صحية شائعة في تشاد يعالجها التطبيب عن بُعد؟",
                "quiz_answer_2_correct": "صحيح! صحة الأم هي محور رئيسي بسبب ارتفاع معدلات الوفيات.",
                "quiz_answer_2_incorrect": "حاول مرة أخرى! صحة الأم هي مشكلة حاسمة في تشاد.",
                "quiz_question_3": "كيف يساعد التطبيب عن بُعد في الأمراض المزمنة؟",
                "quiz_answer_3_correct": "صحيح! المراقبة عن بُعد تتيح الرعاية المستمرة دون سفر متكرر.",
                "quiz_answer_3_incorrect": "حاول مرة أخرى! المراقبة عن بُعد أساسية لإدارة الأمراض المزمنة.",
                "quiz_question_4": "ما هي التكنولوجيا التي تدعم استشارات التطبيب عن بُعد؟",
                "quiz_answer_4_correct": "صحيح! مكالمات الفيديو تمكن من التفاعل المباشر بين الأطباء والمرضى.",
                "quiz_answer_4_incorrect": "حاول مرة أخرى! مكالمات الفيديو ضرورية للتطبيب عن بُعد.",
                "next_question": "السؤال التالي",
                "nav_login": "تسجيل الدخول"
            }
        }
    }
}, function(err, t) {
    updateContent();
});

function updateContent() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        element.innerHTML = i18next.t(element.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        element.placeholder = i18next.t(element.getAttribute('data-i18n-placeholder'));
    });
    document.querySelector('.hero-buttons a').textContent = i18next.t('book_appointment');
    document.querySelector('header.hero h1').textContent = i18next.t('welcome_message');
    document.querySelector('header.hero p').textContent = i18next.t('hero_subtitle');
    document.querySelector('nav.mainNav ul li a[href="#login"]').textContent = i18next.t('nav_login');
    updateQuizContent();
}

function updateQuizContent() {
    const questionElement = document.getElementById('quiz-question');
    if (questionElement) {
        questionElement.setAttribute('data-i18n', `quiz_question_${currentQuestion + 1}`);
        questionElement.textContent = i18next.t(`quiz_question_${currentQuestion + 1}`);
    }
    const nextButton = document.getElementById('next-question');
    if (nextButton) {
        nextButton.textContent = i18next.t('next_question');
    }
}

document.getElementById('lang-switcher')?.addEventListener('change', (e) => {
    i18next.changeLanguage(e.target.value);
    document.body.setAttribute('lang', e.target.value);
    updateContent();
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(error => console.error('Service Worker registration failed:', error));
}

window.addEventListener('scroll', () => {
    const nav = document.querySelector('.mainNav');
    nav.classList.toggle('scrolled', window.scrollY > 50);
    document.getElementById('back-to-top').style.display = window.scrollY > 200 ? 'block' : 'none';
});

document.getElementById('theme-toggle')?.addEventListener('click', () => {
    document.documentElement.setAttribute('data-theme', document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
});

function checkSymptoms() {
    const loading = document.getElementById('symptom-loading');
    const result = document.getElementById('symptom-result');
    const conditionList = document.getElementById('condition-list');
    loading.style.display = 'block';
    result.classList.remove('show');
    const symptoms = document.getElementById('symptom-input').value.toLowerCase();
    const conditions = symptoms.includes('fever') ? ['Possible flu', 'Malaria risk'] : symptoms.includes('cough') ? ['Possible bronchitis', 'Cold'] : ['General discomfort'];
    setTimeout(() => {
        loading.style.display = 'none';
        conditionList.innerHTML = conditions.map(c => `<li>${c}</li>`).join('');
        result.classList.add('show');
    }, 1000);
}

const ctx = document.getElementById('data-chart')?.getContext('2d');
if (ctx) {
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr'],
            datasets: [{
                label: 'Patient Consultations',
                data: [120, 150, 180, 200],
                backgroundColor: '#ff6f61',
                borderColor: '#e55a50',
                borderWidth: 1
            }]
        },
        options: {
            scales: { y: { beginAtZero: true } }
        }
    });
}

const map = L.map('map').setView([12.1348, 15.0557], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);
L.marker([12.1348, 15.0557]).addTo(map).bindPopup('N\'Djamena Telehealth Hub');
L.marker([13.8303, 20.8324]).addTo(map).bindPopup('Abéché Telehealth Hub');
L.marker([8.5667, 16.0833]).addTo(map).bindPopup('Moundou Telehealth Hub');
L.marker([9.1500, 18.3833]).addTo(map).bindPopup('Sarh Telehealth Hub');

let currentQuestion = 0;
const quizQuestions = [
    {
        question: 'quiz_question_1',
        options: ['Accessibility', 'Cost', 'Speed'],
        correctAnswer: 'Accessibility',
        correctResponse: 'quiz_answer_1_correct',
        incorrectResponse: 'quiz_answer_1_incorrect'
    },
    {
        question: 'quiz_question_2',
        options: ['Maternal Health', 'Asthma', 'Allergies'],
        correctAnswer: 'Maternal Health',
        correctResponse: 'quiz_answer_2_correct',
        incorrectResponse: 'quiz_answer_2_incorrect'
    },
    {
        question: 'quiz_question_3',
        options: ['Remote Monitoring', 'Surgery', 'In-Person Visits'],
        correctAnswer: 'Remote Monitoring',
        correctResponse: 'quiz_answer_3_correct',
        incorrectResponse: 'quiz_answer_3_incorrect'
    },
    {
        question: 'quiz_question_4',
        options: ['Video Calls', 'Email', 'Text Messages'],
        correctAnswer: 'Video Calls',
        correctResponse: 'quiz_answer_4_correct',
        incorrectResponse: 'quiz_answer_4_incorrect'
    }
];

function answerQuiz(questionIndex, answer) {
    const resultElement = document.getElementById('quiz-result');
    const nextButton = document.getElementById('next-question');
    const isCorrect = answer === quizQuestions[questionIndex].correctAnswer;
    resultElement.textContent = i18next.t(isCorrect ? quizQuestions[questionIndex].correctResponse : quizQuestions[questionIndex].incorrectResponse);
    nextButton.style.display = 'block';
}

function nextQuestion() {
    currentQuestion = (currentQuestion + 1) % quizQuestions.length;
    const questionElement = document.getElementById('quiz-question');
    const optionsContainer = document.querySelector('.quiz-options');
    const resultElement = document.getElementById('quiz-result');
    const nextButton = document.getElementById('next-question');
    questionElement.setAttribute('data-i18n', quizQuestions[currentQuestion].question);
    questionElement.textContent = i18next.t(quizQuestions[currentQuestion].question);
    optionsContainer.innerHTML = quizQuestions[currentQuestion].options.map((option, index) =>
        `<button onclick="answerQuiz(${currentQuestion}, '${option}')" aria-label="Select ${option} as the answer">${option}</button>`
    ).join('');
    resultElement.textContent = '';
    nextButton.style.display = 'none';
}

document.querySelector('.section-resources input')?.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    document.querySelectorAll('.section-resources .card-grid .card').forEach(card => {
        card.style.display = card.textContent.toLowerCase().includes(searchTerm) ? 'block' : 'none';
    });
});
