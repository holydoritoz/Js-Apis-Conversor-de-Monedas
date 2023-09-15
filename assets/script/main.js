import {chartData} from './chart.js';

const dailyIndicators =  async () => {

  try{

    const response = await fetch('https://mindicador.cl/api');

    //Manejo de errores
    if(!response.ok){
      throw new Error('Ocurrio un error en la petición', response.status);
    }
    const data = await response.json();

    const userCalculator = () => {

      let getUserInput = document.getElementById('user-input');
      let currencySelect = document.getElementById('currency-select');
      let getUserResult = document.getElementById('user-result')

      // Accediendo a las Key y valores de nustro objeto
      let dolarData = data.dolar.valor;
      let euroData = data.euro.valor;

      let userButton = document.getElementById('user-btn');

        userButton.addEventListener('click', () => {

          const currentDate = new Date();
          const options = {month: 'short', day: 'numeric', year: 'numeric'};
          const formattedDate = currentDate.toLocaleDateString('en-US', options)

          if (getUserInput.value) {
              let userInput = getUserInput.value;
              let selectedCurrency = currencySelect.value;

              let result;
              if (selectedCurrency === 'dolar') {
                result = userInput/ dolarData;
                getUserResult.innerHTML = `
                <p>T/C al día de hoy ${ formattedDate } es de: ${ dolarData }<p>
                <h4 class="alert alert-success" role="alert"> Resultado: ${result.toFixed(2)} USD</h4>
                `;

              } else if (selectedCurrency === 'euro') {
                  result = userInput / euroData;
                  getUserResult.innerHTML = `
                  <p>T/C al día de hoy ${ formattedDate } es de: ${ euroData }<p>
                  <h4 class="alert alert-success" role="alert"> Resultado: ${result.toFixed(2)} USD</h4>
                  `;
              }

            chartData(selectedCurrency);
            
          }
      });

    }

    userCalculator();
    
  } catch(error){
    console.log('Ocurrió un error:', error)
  } 

}

dailyIndicators();