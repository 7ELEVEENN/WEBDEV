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

// Dictionary API Implementation
async function getWordDefinition(word) {
    try {
        const response = await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`
        );

        if (!response.ok) {
            throw new Error('Word not found or invalid input');
        }

        const data = await response.json();
        
        // Format the response
        const definition = data[0].meanings.map(meaning => {
            return `${meaning.partOfSpeech}:\n${meaning.definitions[0].definition}`;
        }).join('\n\n');

        return definition;
    } catch (error) {
        console.error('Error details:', error);
        return `Error: ${error.message}`;
    }
}

// Handle form submission
submitQuestion.addEventListener('click', async () => {
    const word = userInput.value.trim();
    if (!word) return;

    responseArea.textContent = 'Loading...';
    submitQuestion.disabled = true;

    const answer = await getWordDefinition(word);
    responseArea.textContent = answer;
    submitQuestion.disabled = false;
});