

const getDataForCountry = countryName => {
    axios.get(`https://restcountries.eu/rest/v2/name/${countryName}`)
        .then(response => {
            const country = response.data[0];
            document.getElementById('country-name').innerText = country.name;
            document.getElementById('country-population').innerText = country.population;
            document.getElementById('country-flag').setAttribute('src', country.flag);
        })
}

document.querySelector('button').onclick = () => {
    const userInput = document.getElementById('name').value;
    getDataForCountry(userInput);
}