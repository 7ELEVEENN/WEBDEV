// DOM Elements
const changeColorBtn = document.getElementById('changeColorBtn');
const incrementBtn = document.getElementById('incrementBtn');
const counterElement = document.getElementById('counter');
const submitQuestion = document.getElementById('submitQuestion');
const userInput = document.getElementById('userInput');
const responseArea = document.getElementById('response');

// Counter functionality
let count = 0;
incrementBtn.addEventListener('click', () => {
    count++;
    counterElement.textContent = count;
});

// Change color functionality
changeColorBtn.addEventListener('click', () => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    changeColorBtn.style.backgroundColor = randomColor;
});

// ChatGPT API Implementation
const OPENAI_API_KEY = 'your-api-key-here'; // Replace with your actual API key

async function getChatGPTResponse(prompt) {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{
                    role: "user",
                    content: prompt
                }],
                temperature: 0.7
            })
        });

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Error:', error);
        return 'An error occurred while fetching the response.';
    }
}

// Handle form submission
submitQuestion.addEventListener('click', async () => {
    const question = userInput.value.trim();
    if (!question) return;

    responseArea.textContent = 'Loading...';
    submitQuestion.disabled = true;

    const answer = await getChatGPTResponse(question);
    responseArea.textContent = answer;
    submitQuestion.disabled = false;
});