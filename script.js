// Fire burst animation on button hover
const redirectBtn = document.querySelector('.redirect_btn');
const fireBurst = document.getElementById('fireBurst');
let lastFireBurstTime = 0;
const fireBurstCooldown = 1000; // 1 second cooldown in milliseconds

if (redirectBtn && fireBurst) {
    redirectBtn.addEventListener('mouseenter', () => {
        const now = Date.now();
        // Check if enough time has passed since the last animation
        if (now - lastFireBurstTime >= fireBurstCooldown) {
            lastFireBurstTime = now;
            // Remove animate class to reset animation
            fireBurst.classList.remove('animate');
            // Trigger reflow to restart animation
            void fireBurst.offsetWidth;
            // Add animate class to start animation
            fireBurst.classList.add('animate');
        }
    });
}
const scovilleData = {
    option1: {
        name: 'Bell pepper',
        su: 0,
        image: 'images/bell_pepper.png',
        level: 'low',
        label: 'spice level:low'
    },
    option2: {
        name: 'Buldak',
        su: 4400,
        image: 'images/buldak.png',
        level: 'medium',
        label: 'spice level:medium'
    },
    option3: {
        name: 'The Carolina Reaper',
        su: 2200000,
        image: 'images/carolina_reaper.png',
        level: 'high',
        label: 'spice level:high'
    },
    option4: {
        name: 'Tabasco hot Sauce',
        su: 2500,
        image: 'images/tabasco.png',
        level: 'medium',
        label: 'spice level:medium'
    },
    option5: {
        name: 'The Jalapeño pepper',
        su: 4500,
        image: 'images/jalapeno.png',
        level: 'medium',
        label: 'spice level:medium'
    }
};

// Get elements
const option1Select = document.getElementById('option1');
const option2Select = document.getElementById('option2');
const compareBtn = document.getElementById('compare_btn');
const resultDiv = document.getElementById('result');
const preview1 = document.getElementById('option1-preview');
const preview2 = document.getElementById('option2-preview');

function createPreviewCard(item) {
    const card = document.createElement('div');
    card.className = `${item.level}_item_description preview-card`;
    card.innerHTML = `
        <div class="${item.level}_spice_level">
            <p class="${item.level}_spice_level_text">${item.label}</p>
        </div>
        <div class="${item.level}_food_frame">
            <img alt="${item.name}" src="${item.image}">
        </div>
        <h2 class="description_text">${item.name}</h2>
        <p class="su_text"><b>Scoville units:</b> ${item.su.toLocaleString()}</p>
    `;
    return card;
}

function updatePreview(previewEl, item) {
    if (!previewEl || !item) return;
    previewEl.innerHTML = '';
    previewEl.appendChild(createPreviewCard(item));
}

option1Select.addEventListener('change', () => updatePreview(preview1, scovilleData[option1Select.value]));
option2Select.addEventListener('change', () => updatePreview(preview2, scovilleData[option2Select.value]));

// Add event listener to button
compareBtn.addEventListener('click', () => {
    const item1 = scovilleData[option1Select.value];
    const item2 = scovilleData[option2Select.value];

    if (!item1 || !item2) {
        resultDiv.textContent = 'Please select two valid items to compare.';
        return;
    }

    if (item1.su === item2.su) {
        resultDiv.textContent = `${item1.name} and ${item2.name} have the same spice level. They are both ${item1.su} Scoville units.`;
        return;
    }

    const higher = item1.su > item2.su ? item1 : item2;
    const lower = item1.su < item2.su ? item1 : item2;

    if (lower.su === 0) {
        resultDiv.textContent = `${lower.name} has no heat lol, ${higher.name} clears`;
        return;
    }

    const ratio = Math.round((higher.su / lower.su) * 100) / 100;
    resultDiv.textContent = `${higher.name} is ${ratio} times hotter than ${lower.name}.`;
});

// Initialize previews
updatePreview(preview1, scovilleData[option1Select.value]);
updatePreview(preview2, scovilleData[option2Select.value]);