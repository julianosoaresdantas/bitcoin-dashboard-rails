function buscarHistoricoPrecoBitcoin() {
  console.log('--- buscarHistoricoPrecoBitcoin() INICIADA ---');
  const currency = document.getElementById('currency-selector').value.toLowerCase();
  const days = 1; // Vamos buscar os dados das últimas 24 horas (1 dia)
  const url = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${currency}&days=${days}`;

  console.log('URL da requisição CoinGecko (Histórico Bitcoin):', url);
  console.log('Moeda selecionada:', currency);
  console.log('Dias:', days);

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Dados históricos do Bitcoin recebidos:', data);
      if (data && data.prices) {
        const prices = data.prices;
        const labels = prices.map(price => new Date(price[0]).toLocaleTimeString()); // Formatar os timestamps
        const priceData = prices.map(price => price[1]);

        const ctx = document.getElementById('bitcoinPriceChart').getContext('2d');
        if (window.bitcoinChart) {
          window.bitcoinChart.destroy(); // Destruir o gráfico existente se houver
        }
        window.bitcoinChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: `Preço do Bitcoin (${currency.toUpperCase()})`,
              data: priceData,
              borderColor: 'blue',
              borderWidth: 1,
              fill: false
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: false,
                title: {
                  display: true,
                  text: `Preço (${currency.toUpperCase()})`
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Hora'
                },
                ticks: {
                  autoSkipPadding: 10, // Ajuste conforme necessário para evitar sobreposição
                  maxRotation: 0
                }
              }
            },
            plugins: {
              tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                  label: function(context) {
                    let label = context.dataset.label || '';
                    if (label) {
                      label += ': ';
                    }
                    if (context.parsed.y !== null) {
                      label += new Intl.NumberFormat(undefined, { style: 'currency', currency: currency.toUpperCase() }).format(context.parsed.y);
                    }
                    return label;
                  },
                  title: function(context) {
                    return new Date(context[0].label).toLocaleString();
                  }
                }
              }
            }
          }
        });
      }
    })
    .catch(error => console.error('Erro ao buscar histórico de preço do Bitcoin:', error));
}