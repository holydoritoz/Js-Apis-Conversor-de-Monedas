
export const chartData = async () => {

    try{

      let currencySelect = document.getElementById('currency-select');
      let selectedCurrency = currencySelect.value;

      //Condicionamos el fetch dependiendo del value del select.
      const apiUrl = selectedCurrency === 'dolar' ?
      'https://mindicador.cl/api/dolar/2023' : 'https://mindicador.cl/api/euro/2023';

      const chartResponse = await fetch(apiUrl);
      const chartData = await chartResponse.json();

      //Formateamos las fechas de nuestro objeto.
      const currentDate = new Date();
      const tenDaysAgo = new Date (currentDate);

      //Obtememos los últimos 10 días si es que existen.
      tenDaysAgo.setDate(tenDaysAgo.getDate()-10);

      const chartArray = chartData.serie.filter( day => {
      const dayDate = new Date(day.fecha);
      return dayDate >= tenDaysAgo && dayDate <= currentDate;
      });

      //Variable con scope global para verificar si existe o no y destruir
      let myChart;

      const renderChart = () => {

        const ctx = document.getElementById('user-chart').getContext('2d');

        //Destruimos el canvas anterior, para renderizar uno nuevo

        myChart = Chart.getChart('user-chart');

        if (myChart) { 
          myChart.destroy();
        };
  
        const formattedLabels = chartArray.map(day => {
          const date = new Date(day.fecha);
          return date.toLocaleDateString('en-US', {
            month: 'short',
            day:'numeric',
            year:'numeric'
          });
        });

        //Inverimos el orden de las fechas
        formattedLabels.reverse();

        //Propiedades del gráfico
        myChart = new Chart(ctx, {
          type:'line',
          data: {
            labels:formattedLabels,
            datasets: [{
              label:'Comportamiento de la moneda los últimos 10 días',
              data: chartArray.map(day => day.valor).reverse(),
              borderColor:'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }]
          }
        });
      };

      renderChart();

    } catch(error){
        console.log('Ocurrió un error:', error)
    };
  };

