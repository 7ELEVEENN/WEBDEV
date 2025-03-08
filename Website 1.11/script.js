class MemoryCalendar {
    constructor() {
        this.currentDate = new Date();
        this.memories = JSON.parse(localStorage.getItem('memories')) || {};
        this.initializeElements();
        this.setupEventListeners();
        this.renderCalendar();
    }

    initializeElements() {
        this.prevMonthBtn = document.getElementById('prevMonth');
        this.nextMonthBtn = document.getElementById('nextMonth');
        this.currentMonthElement = document.getElementById('currentMonth');
        this.calendarGrid = document.querySelector('.calendar-grid');
        this.modal = document.getElementById('memoryModal');
        this.modalDate = document.getElementById('modalDate');
        this.closeButton = document.querySelector('.close-button');
        this.memoryText = document.getElementById('memoryText');
        this.memoryImage = document.getElementById('memoryImage');
        this.saveMemoryBtn = document.getElementById('saveMemory');
        this.savedMemoriesContainer = document.getElementById('savedMemories');
    }

    setupEventListeners() {
        this.prevMonthBtn.addEventListener('click', () => this.changeMonth(-1));
        this.nextMonthBtn.addEventListener('click', () => this.changeMonth(1));
        this.closeButton.addEventListener('click', () => this.closeModal());
        this.saveMemoryBtn.addEventListener('click', () => this.saveMemory());
    }

    changeMonth(delta) {
        this.currentDate.setMonth(this.currentDate.getMonth() + delta);
        this.renderCalendar();
    }

    renderCalendar() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        this.currentMonthElement.textContent = new Date(year, month)
            .toLocaleString('default', { month: 'long', year: 'numeric' });

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();

        // Clear existing calendar days
        const existingDays = this.calendarGrid.querySelectorAll('.calendar-day');
        existingDays.forEach(day => day.remove());

        // Create calendar days
        for (let i = 0; i < startingDay + daysInMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');
            
            if (i >= startingDay) {
                const date = i - startingDay + 1;
                dayElement.textContent = date;
                
                const dateString = `${year}-${month + 1}-${date}`;
                if (this.memories[dateString]) {
                    dayElement.classList.add('has-memory');
                }

                dayElement.addEventListener('click', () => this.openModal(dateString));
            }

            this.calendarGrid.appendChild(dayElement);
        }
    }

    openModal(date) {
        this.currentSelectedDate = date;
        this.modal.style.display = 'block';
        this.modalDate.textContent = new Date(date).toLocaleDateString();
        this.displaySavedMemories();
    }

    closeModal() {
        this.modal.style.display = 'none';
        this.memoryText.value = '';
        this.memoryImage.value = '';
    }

    saveMemory() {
        if (!this.memoryText.value && !this.memoryImage.files[0]) return;

        if (!this.memories[this.currentSelectedDate]) {
            this.memories[this.currentSelectedDate] = [];
        }

        const memory = {
            text: this.memoryText.value,
            timestamp: new Date().toISOString()
        };

        if (this.memoryImage.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                memory.image = e.target.result;
                this.finalizeMemorySave(memory);
            };
            reader.readAsDataURL(this.memoryImage.files[0]);
        } else {
            this.finalizeMemorySave(memory);
        }
    }

    finalizeMemorySave(memory) {
        this.memories[this.currentSelectedDate].push(memory);
        localStorage.setItem('memories', JSON.stringify(this.memories));
        this.displaySavedMemories();
        this.renderCalendar();
        this.memoryText.value = '';
        this.memoryImage.value = '';
    }

    displaySavedMemories() {
        this.savedMemoriesContainer.innerHTML = '';
        const memories = this.memories[this.currentSelectedDate] || [];

        memories.forEach((memory, index) => {
            const memoryCard = document.createElement('div');
            memoryCard.classList.add('memory-card');

            const timestamp = new Date(memory.timestamp).toLocaleString();
            memoryCard.innerHTML = `
                <p>${memory.text}</p>
                <small>${timestamp}</small>
                ${memory.image ? `<img src="${memory.image}" class="memory-image">` : ''}
                <button onclick="calendar.deleteMemory(${index})">Delete</button>
            `;

            this.savedMemoriesContainer.appendChild(memoryCard);
        });
    }

    deleteMemory(index) {
        this.memories[this.currentSelectedDate].splice(index, 1);
        if (this.memories[this.currentSelectedDate].length === 0) {
            delete this.memories[this.currentSelectedDate];
        }
        localStorage.setItem('memories', JSON.stringify(this.memories));
        this.displaySavedMemories();
        this.renderCalendar();
    }
}

const calendar = new MemoryCalendar();
