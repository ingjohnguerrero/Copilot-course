// This file is intentionally left blank.
let barChart; // Make barChart accessible globally

function getMonthlyIncomeExpenses() {
  const months = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];
  const data = {};
  months.forEach(month => {
    const income = parseFloat(document.getElementById(`income-${month}`).value) || 0;
    const expenses = parseFloat(document.getElementById(`expenses-${month}`).value) || 0;
    data[month] = { income, expenses };
  });
  return data;
}

function updateBarChart() {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const monthlyData = getMonthlyIncomeExpenses();
  const incomeData = months.map(m => monthlyData[m.toLowerCase()].income);
  const expensesData = months.map(m => monthlyData[m.toLowerCase()].expenses);

  barChart.data.labels = months;
  barChart.data.datasets[0].data = incomeData;
  barChart.data.datasets[1].data = expensesData;
  barChart.update();
}

$(document).ready(function() {
  // Only initialize when the chart tab is shown
  $('a[data-toggle="tab"][href="#chart"]').on('shown.bs.tab', function () {
    if (!window.barChartInitialized) {
      var ctx = document.getElementById('barChart').getContext('2d');
      barChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
          ],
          datasets: [{
            label: 'Income',
            data: [],
            backgroundColor: 'rgba(54, 162, 235, 0.7)'
          }, {
            label: 'Expenses',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.7)'
          }]
        },
        options: {
          responsive: true,
          scales: {
            yAxes: [{ ticks: { beginAtZero: true } }]
          }
        }
      });
      window.barChartInitialized = true;
      updateBarChart();
    } else {
      updateBarChart();
    }
  });

  // Update chart when any input changes
  $('input[type="number"]').on('input', function() {
    if (window.barChartInitialized) {
      updateBarChart();
    }
  });

  // Download button functionality
  $('#downloadBtn').on('click', function() {
    var canvas = document.getElementById('barChart');
    var link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'chart.png';
    link.click();
  });

  // input with id "username" on change event
  $('#username').on('input', function() {
    var username = $(this).val();
    // check using regex if username has at least 1 capital letter, 1 special character, 1 number and at least 8 characters long
      var regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&~])[A-Za-z\d@$!%*?&~]{8,}$/;
      if (regex.test(username)) {
          $('#username').removeClass('is-invalid').addClass('is-valid');
          $('#usernameFeedback').text('Valid username').removeClass('text-danger').addClass('text-success');
      } else {
          $('#username').removeClass('is-valid').addClass('is-invalid');
          $('#usernameFeedback').text('Invalid username. Must contain at least 1 capital letter, 1 special character, 1 number and be at least 8 characters long.').removeClass('text-success').addClass('text-danger');
      }
    if (username) {
      $('#welcomeMessage').text('Welcome, ' + username + '!');
    } else {
      $('#welcomeMessage').text('');
    }
  });

  // Add custom styles for is-valid and is-invalid
  var style = document.createElement('style');
  style.innerHTML = `
    .is-valid {
      border-color: #28a745 !important;
      box-shadow: 0 0 0 2px rgba(40,167,69,.25);
    }
    .is-invalid {
      border-color: #dc3545 !important;
      box-shadow: 0 0 0 2px rgba(220,53,69,.25);
    }
  `;
  document.head.appendChild(style);
});