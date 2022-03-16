
const ctx = document.getElementById('stats').getContext('2d');
const options = {
    scales: {
        r: {
          grid :{
            color:'white'
          },
          pointLabels:{
            color:'white'
          },
            angleLines: {
              color:'white'
            },
            suggestedMin: 50,
            suggestedMax: 100
        }
    }
}

function loadData(stats){
  return {
    labels: stats.map(x=> x.stat.name),
    datasets: [{
      label: 'Stats Pokemon',
      data: stats.map(x=> x.base_stat),
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderColor: 'rgb(255, 99, 132)',
      pointBackgroundColor: 'rgb(255, 1, 56)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255, 99, 132)'
    }]
  };

}

export function createChart(stats){
  let data =loadData(stats);
  const config = {
    type: 'radar',
    data,
    maintainAspectRation:false,
    options,
    plugins:{
      legend:{
        display:false
      }
    }
  };
  return new Chart(ctx,config);
}