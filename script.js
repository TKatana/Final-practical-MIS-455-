function searchCountry() {
  let input = document.getElementById('countryInput').value.trim();
  let resultDiv = document.getElementById('result');
  resultDiv.innerHTML = ''; // clear previous
  if (!input) {
    resultDiv.innerHTML = '<p style="color:red;">Please enter a country name.</p>';
    return;
  }
  let url = `https://restcountries.com/v3.1/name/${input}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayCountryInfo(data[0]))
    .catch(err => {
      console.error(err);
      resultDiv.innerHTML = '<p style="color:red;">Country not found. Please try again.</p>';
    });
}

function displayCountryInfo(country) {
  document.getElementById('countryInput').value = ''; // Clear input field after search

  let resultDiv = document.getElementById('result');
  let currencies = Object.values(country.currencies || {}).map(c => `${c.name} (${c.symbol})`).join(', ');
  let card = `
    <div class="country-card">
      <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
      <h2>${country.name.common}</h2>
      <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
      <p><strong>Region:</strong> ${country.region}</p>
      <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
      <p><strong>Currency:</strong> ${currencies || 'N/A'}</p>
      <p><strong>Timezones:</strong> ${country.timezones.join(', ')}</p>
    </div>
  `;
  resultDiv.innerHTML = card;
}

document.getElementById("countryInput").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault(); 
    let query = this.value;
    searchCountry(); // Call the connect function to fetch data
    console.log("Searching for:", query);
  }
});
document.getElementById('year').textContent = new Date().getFullYear();