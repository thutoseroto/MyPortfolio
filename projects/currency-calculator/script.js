// ========================================
// CURRENCY CALCULATOR - USD | ZAR | BWP
// WITH REAL-TIME API
// ========================================

// 🔴 IMPORTANT: Replace with YOUR actual API key
const API_KEY = '3327f4bd83254594c57def58'; // Get from exchangerate-api.com

// API URL - using exchangerate-api.com (free tier)
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

// DOM Elements
const amountInput = document.getElementById('amount');
const fromSelect = document.getElementById('fromCurrency');
const toSelect = document.getElementById('toCurrency');
const swapBtn = document.getElementById('swapBtn');
const resultDisplay = document.getElementById('result');
const rateDisplay = document.getElementById('rate');
const lastUpdated = document.getElementById('lastUpdated');

// ========================================
// 1. FETCH REAL-TIME EXCHANGE RATES
// ========================================
async function fetchExchangeRates(baseCurrency) {
    try {
        // Show loading state
        resultDisplay.textContent = 'Loading...';
        rateDisplay.textContent = 'Fetching latest rates...';

        // Fetch from API
        const response = await fetch(`${API_URL}${baseCurrency}`);
        const data = await response.json();

        // Check if API call was successful
        if (data.result === 'success') {
            return {
                USD: data.conversion_rates.USD,
                ZAR: data.conversion_rates.ZAR,
                BWP: data.conversion_rates.BWP
            };
        } else {
            throw new Error('Failed to fetch rates');
        }
    } catch (error) {
        console.error('Error fetching rates:', error);
        showError('Failed to fetch live rates. Using fallback rates.');
        return null;
    }
}

// ========================================
// 2. FALLBACK RATES (if API fails)
// ========================================
const fallbackRates = {
    USD: { USD: 1, ZAR: 18.50, BWP: 13.75 },
    ZAR: { USD: 0.054, ZAR: 1, BWP: 0.74 },
    BWP: { USD: 0.073, ZAR: 1.35, BWP: 1 }
};

// ========================================
// 3. CONVERSION FUNCTION
// ========================================
async function convertCurrency() {
    // Get values
    let amount = parseFloat(amountInput.value);
    const fromCurrency = fromSelect.value;
    const toCurrency = toSelect.value;

    // Validate amount
    if (isNaN(amount) || amount < 0) {
        amount = 0;
        amountInput.value = 0;
    }

    try {
        // Fetch latest rates
        const rates = await fetchExchangeRates(fromCurrency);

        let rate;
        if (rates) {
            // Use API rates
            rate = rates[toCurrency];
        } else {
            // Use fallback rates
            rate = fallbackRates[fromCurrency][toCurrency];
        }

        // Perform conversion
        const convertedAmount = amount * rate;

        // Display result
        resultDisplay.textContent = formatCurrency(convertedAmount, toCurrency);
        rateDisplay.textContent = `1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;

    } catch (error) {
        console.error('Conversion error:', error);
        showError('Error during conversion. Please try again.');
    }
}

// ========================================
// 4. FORMAT CURRENCY
// ========================================
function formatCurrency(amount, currency) {
    const formatted = amount.toFixed(2);

    switch(currency) {
        case 'USD':
            return `$${formatted}`;
        case 'ZAR':
            return `R ${formatted}`;
        case 'BWP':
            return `P ${formatted}`;
        default:
            return formatted;
    }
}

// ========================================
// 5. SHOW ERROR MESSAGE
// ========================================
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        background: #f8d7da;
        color: #721c24;
        padding: 10px;
        border-radius: 8px;
        margin-top: 10px;
        text-align: center;
        font-size: 0.9rem;
    `;

    // Remove any existing error
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Add new error
    document.querySelector('.converter-card').appendChild(errorDiv);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentElement) {
            errorDiv.remove();
        }
    }, 5000);
}

// ========================================
// 6. SWAP CURRENCIES
// ========================================
function swapCurrencies() {
    const fromValue = fromSelect.value;
    const toValue = toSelect.value;

    fromSelect.value = toValue;
    toSelect.value = fromValue;

    convertCurrency();
}

// ========================================
// 7. UPDATE TIMESTAMP
// ========================================
function updateTimestamp() {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    lastUpdated.textContent = `Rates updated: ${formattedTime}`;
}

// ========================================
// 8. EVENT LISTENERS
// ========================================
amountInput.addEventListener('input', convertCurrency);
fromSelect.addEventListener('change', convertCurrency);
toSelect.addEventListener('change', convertCurrency);
swapBtn.addEventListener('click', swapCurrencies);

// ========================================
// 9. INITIAL CONVERSION ON PAGE LOAD
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    convertCurrency();
    updateTimestamp();

    // Refresh rates every 30 minutes
    setInterval(convertCurrency, 1800000);
    // Update timestamp every minute
    setInterval(updateTimestamp, 60000);
});