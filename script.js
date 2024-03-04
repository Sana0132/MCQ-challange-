const quizData = [
      {
        question: '1.Who is first chief minister(PREMIERS) of west bengal?',
        options: ['(1)Dr. Prafulla Chandra Ghosh', '(2)Shri Jyoti Basu', '(3)Shri Buddhadeb Bhattacharjee', '(4)Shri Prafulla Chandra Sen '],
        correctAnswer: '(1)Dr. Prafulla Chandra Ghosh'
      },
      
      
      {
        question: '2.The oldest company in India?',
        options: ['(1)khan limited', '(2)tata', '(3)Bombay Burmah Trading Corporation Limited', '(4)jana corporation'],
        correctAnswer: '(3)Bombay Burmah Trading Corporation Limited'
      },
     
      
      
    {
        question: '3.Who is founder of google?',
        options: ['(1)Larry Page', '(2)Sergey Brin', '(3)jhon martin', '(4) option (1) and (2)'],
        correctAnswer: '(4) option (1) and (2)'
      },
      
      
      {
        question: '4.Who is first president in ?',
        options: ['(1)ramlal ghosh', '(2)Rajendra Prasad ', '(3)bahadur khan', '(4)lakshmi kar'],
        correctAnswer: '(2)Rajendra Prasad'
      },
        
      
      
      
      
      {
        question: '5.Who is 1st chief minister in india??',
        options: ['(1)rajendra prasad', '(2)Pandit Govind Ballabh Pant', '(3)ram bhadur', '(4)none of these'],
        correctAnswer: '(2)Pandit Govind Ballabh Pant'
      },
      
      
      {
        question: '6.Who is founder of tata?',
        options: ['(1)Jamsetji Nusserwanji', '(2)Nusserwanji Tata', '(3)ratan tata', '(4)natarajan tata'],
        correctAnswer: '(1)Jamsetji Nusserwanji'
      },
      
      
      
      
       {
        question: '7.who is present president of india?',
        options: ['(1)jhangir ali', '(2)Droupadi Murmu', '(3)Sarvepalli Radhakrishnan', '(4)Varahagiri Venkata Giri'],
        correctAnswer: '(2)Droupadi Murmu'
      },
      
      
      {
        question: '8.who is first woman chief minister of india?',
        options: ['(1)mamta banargee', '(2)J. Jayalalithaa', '(3)kahi maity', '(4)Sucheta Kriplani'],
        correctAnswer:'(4)Sucheta Kriplani' 
      },
      
      
      
       {
       
       
        question: '9.Indian first movie name?',
        options: ['(1)ham apka hai koun', '(2) rani mirabai', '(3)Raja Harishchandra', '(4)ajadi ka rang'],
        correctAnswer: '(3)Raja Harishchandra'
      },
      
      
      {
        question: '10.Indian first motor company name ?',
        options: ['(1)tata motors', '(2)mahindra ', '(3)Hyundai Motor', '(4)Hindustan Motors Limited'],
        correctAnswer:  '(4)Hindustan Motors Limited'
      },
      // Add more questions as needed
    ];

    let currentQuestion = 0;
    let timer;
    let userScore = 0; // Track user's score
    let incorrectAnswers = 0; // Track incorrect answers

    function loadQuestion() {
      const questionContainer = document.getElementById('question-container');
      const optionsContainer = document.getElementById('options-container');
      const timerContainer = document.getElementById('timer-container');

      questionContainer.textContent = quizData[currentQuestion].question;
      optionsContainer.innerHTML = '';

      quizData[currentQuestion].options.forEach((option) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', checkAnswer);
        optionsContainer.appendChild(button);
      });

      // Reset the timer and hide the timer container
      clearTimeout(timer);
      timerContainer.style.display = 'none';
    }

    function checkAnswer(event) {
      const userAnswer = event.target.textContent;
      const correctAnswer = quizData[currentQuestion].correctAnswer;

      const options = document.querySelectorAll('button');
      options.forEach(option => option.removeEventListener('click', checkAnswer));

      if (userAnswer === correctAnswer) {
        // Handle correct answer logic
        alert('Correct!');
        userScore++; // Increment the user's score for correct answers
      } else {
        // Handle incorrect answer logic
        alert('Incorrect. Try again!');
        incorrectAnswers++;

        if (incorrectAnswers === 3) {
          // Lock options for 10 seconds after 1 incorrect answer
          lockOptions(10);
          return;
        }
      }

      // Move to the next question
      currentQuestion++;
      if (currentQuestion < quizData.length) {
        loadQuestion();
      } else {
        // Show the certificate page when the quiz is completed
        document.getElementById('quiz-container').style.display = 'none';
        document.getElementById('certificate-page').style.display = 'block';
      }
    }

    function lockOptions(seconds) {
      const timerContainer = document.getElementById('timer-container');
      let remainingTime = seconds;

      timerContainer.style.display = 'block';

      function updateTimer() {
        timerContainer.textContent = `Retry in ${remainingTime} seconds`;
        remainingTime--;

        if (remainingTime < 0) {
          clearTimeout(timer);
          timerContainer.style.display = 'none';
          incorrectAnswers = 0; // Reset incorrect answers count
          loadQuestion();
        } else {
          timer = setTimeout(updateTimer, 1000);
        }
      }

      updateTimer();
    }

    function showCertificate() {
      const userName = document.getElementById('name-input').value;
      const certificateContainer = document.getElementById('certificate');

      if (userName.trim() !== '') {
        certificateContainer.innerHTML = `<p>This is to certify that<h3>${userName} </h3>has successfully completed the MCQ Quiz with a score of ${userScore}/${quizData.length}.</p>`;
        // You can add a background image style here
        certificateContainer.style.background = 'url("  https://i.postimg.cc/j5gCJWT9/Green-White-Modern-Participation-Certificate.png")';
        certificateContainer.style.backgroundSize = 'cover';
        certificateContainer.style.color = '#1b1b1b';
        certificateContainer.style.padding = '80px';
        certificateContainer.style.borderRadius = '8px';
        certificateContainer.style.marginTop = '20px';
        certificateContainer.style.textAlign = 'center';
        certificateContainer.style.display = 'block';
      } else {
        alert('Please enter your name.');
      }
    }

    function nextQuestion() {
      const timerContainer = document.getElementById('timer-container');

      // Check if the timer is active
      if (timerContainer.style.display === 'block') {
        alert('Options are locked. Please wait for the timer.');
      } else {
        if (currentQuestion < quizData.length) {
          loadQuestion();
        } else {
          // Show the certificate page when the quiz is completed
          document.getElementById('quiz-container').style.display = 'none';
          document.getElementById('certificate-page').style.display = 'block';
        }
      }
    }

    // Load the first question on page load
    loadQuestion();