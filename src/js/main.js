"use strict";


function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}


(function () {
  var url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json";

getData(url, drawBarChart);

function getData(url, callback) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      try {
        // store data in myDataObject variable
      var myDataObject = JSON.parse(this.responseText);
        } catch(error) {
          console.log(error.msg + " in " + xmlhttp.responseText);
          return
        }
        // do something with the data
      callback(myDataObject);
    }
  }
  xmlhttp.open("GET", url, true);
    xmlhttp.send();
}


  function drawBarChart(obj) {
    var ctx = document.getElementById('myChart').getContext('2d');
    var dateLabels = obj.data.map((arr) => arr[0]);
    var gdpData = obj.data.map((arr) => arr[1]);
    var data = {
      labels: dateLabels,
      datasets: [_defineProperty({
        label: 'USA GDP',
        data: gdpData,
        type: 'bar',
        pointRadius: 0,
        fill: true,

        borderWidth: 0,
        backgroundColor: 'blue',
        borderColor: '#1d638c',
      }, 'borderWidth', 1)]
    };
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        title: {
          display: true,
          text: 'USA Gross Domestic Product 1947-2015',
          fontSize: 25,
          fontColor: 'black'
        },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'GDP in Billions of Dollars',
              fontColor: 'black',
              fontStyle: 'bold'
            },
            ticks: {
              beginAtZero: true
            }
          }],
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: obj.description
              },
            }]
        }
      }
    });
  }

})();
