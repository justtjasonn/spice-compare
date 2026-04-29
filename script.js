// Scoville units data
const scovilleData = {
    option1: { name: 'Bell pepper', su: 0 },
    option2: { name: 'Buldak ramen', su: 4400 },
    option3: { name: 'Carolina Reaper', su: 2200000 },
    option4: { name: 'Tabasco Sauce', su: 2500 },
    option5: { name: 'Jalapeño pepper', su: 4500 }
};

// Get elements
const option1Select = document.getElementById('option1');
const option2Select = document.getElementById('option2');
const compareBtn = document.getElementById('compare_btn');
const resultDiv = document.getElementById('result');

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

    const ratio = Math.round(higher.su / lower.su);
    resultDiv.textContent = `${higher.name} is ${ratio} times hotter than ${lower.name}.`;
});