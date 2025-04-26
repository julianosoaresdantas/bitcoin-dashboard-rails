import "@hotwired/turbo-rails"
import "./controllers"
import Chart from 'chart.js/auto';

console.log('MEU JAVASCRIPT ESTÁ RODANDO! (DADOS FIXOS)');

function buscarPrecosCripto() {
  console.log('--- buscarPrecosCripto() EXECUTADA (DADOS FIXOS) ---');
  const dataFixaPrecos = {
    'BTC': {'USD': {'price': '60000.00', 'change24h': '1.50'}},
    'ETH': {'USD': {'price': '3000.00', 'change24h': '-0.80'}},
    'LTC': {'USD': {'price': '200.00', 'change24h': '0.30'}},
    'DOGE': {'USD': {'price': '0.15', 'change24h': '2.00'}},
    'ADA': {'USD': {'price': '1.20', 'change24h': '-1.00'}},
    'SOL': {'USD': {'price': '150.00', 'change24h': '0.50'}}
  };
  const currency = document.getElementById('currency-selector').value.toUpperCase();

  function atualizarPreco(cripto, moeda, data) {
    const precoElementId = `${cripto.toLowerCase()}-preco`;
    const mudancaElementId = `${cripto.toLowerCase()}-mudanca`;
    const mudancaAbsElementId = `${cripto.toLowerCase()}-mudanca-abs`;

    if (data[cripto] && data[cripto][moeda]) {
      document.getElementById(precoElementId).textContent = parseFloat(data[cripto][moeda].price).toFixed(2);
      document.getElementById(mudancaElementId).textContent = `${parseFloat(data[cripto][moeda].change24h).toFixed(2)}%`;
      document.getElementById(mudancaAbsElementId).textContent = 'N/A';
    } else {
      document.getElementById(precoElementId).textContent = 'N/A';
      document.getElementById(mudancaElementId).textContent = 'N/A';
      document.getElementById(mudancaAbsElementId).textContent = 'N/A';
    }
  }

  atualizarPreco('BTC', currency, dataFixaPrecos);
  atualizarPreco('ETH', currency, dataFixaPrecos);
  atualizarPreco('LTC', currency, dataFixaPrecos);
  atualizarPreco('DOGE', currency, dataFixaPrecos);
  atualizarPreco('ADA', currency, dataFixaPrecos);
  atualizarPreco('SOL', currency, dataFixaPrecos);
}

function buscarHistoricoPrecoBitcoin() {
  console.log('--- buscarHistoricoPrecoBitcoin() EXECUTADA (DADOS FIXOS) ---');
  const currency = document.getElementById('currency-selector').value.toLowerCase();
  const dataFixaHistorico = {
    'prices': [
      [1619673600000, 55000],
      [1619760000000, 56000],
      [1619846400000, 57000],
      [1619932800000, 56500],
      [1620019200000, 58000]
    ]
  };

  if (dataFixaHistorico && dataFixaHistorico.prices) {
    const prices = dataFixaHistorico.prices;
    const labels = prices.map(price => new Date(price[0]).toLocaleTimeString());
    const priceData = prices.map(price => price[1]);

    const ctx = document.getElementById('bitcoinPriceChart').getContext('2d');
    if (window.bitcoinChart) {
      window.bitcoinChart.destroy();
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
              autoSkipPadding: 10,
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
}

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOMContentLoaded disparado! (DADOS FIXOS)');
  buscarPrecosCripto();
  buscarHistoricoPrecoBitcoin();
});

document.getElementById('currency-selector').addEventListener('change', function() {
  console.log('Evento de change no seletor disparado! (DADOS FIXOS)');
  buscarPrecosCripto();
  buscarHistoricoPrecoBitcoin();
});

setInterval(function() {
  console.log('setInterval disparado! (DADOS FIXOS)');
  buscarPrecosCripto();
}, 30000);