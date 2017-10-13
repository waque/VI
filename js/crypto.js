var market_cap, price, volume;
var currant_crypto;
var marketCapChart, volumeChart;



$.ajax({
  url: "http://coincap.io/history/365day/BTC",
  dataType: 'json',
  async: false,
  success: function(data) {
    //console.log(data);
    market_cap = data.market_cap;
    price = data.price;
    volume = data.volume;
  },
  error: function (xhr, ajaxOptions, thrownError) {

        $.ajax({
          url: "/data/history/history" + crypto + ".txt",
          dataType: 'json',
          async: false,
          success: function(data) {
            //console.log(data);
            market_cap = data.market_cap;
            price = data.price;
            volume = data.volume;
          }
        });

  }
});



function changeCrypto(crypto){
  getData(crypto);
  volumeChart.series[0].setData(volume);
  marketCapChart.series[0].setData(market_cap);
  marketCapChart.series[1].setData(price);
}

function getData(crypto){
  $.ajax({
    url: "http://coincap.io/history/365day/BTC",
    dataType: 'json',
    async: false,
    success: function(data) {
      //console.log(data);
      market_cap = data.market_cap;
      price = data.price;
      volume = data.volume;
    },
    error: function (xhr, ajaxOptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);

          $.ajax({
            url: "/data/history/history" + crypto + ".txt",
            dataType: 'json',
            async: false,
            success: function(data) {
              //console.log(data);
              market_cap = data.market_cap;
              price = data.price;
              volume = data.volume;
            }
          });

    }
  });
}


$(function () {
    // Create the chart
    marketCapChart = Highcharts.stockChart('chart1', {


        rangeSelector: {
            selected: 2
        },

        title: {
            text: 'Market Capital'
        },

        yAxis: [{ // Primary yAxis
        labels: {
            format: '{market_cap}',
            style: {
                color: Highcharts.getOptions().colors[2]
            }
        },
        title: {
            text: 'market_cap',
            style: {
                color: Highcharts.getOptions().colors[2]
            }
        },
        opposite: false

        }, { // Secondary yAxis
            gridLineWidth: 0,
            title: {
                text: 'price',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '{value} $',
                min: 0,
                max: 8000,
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            }

        }],

        plotOptions: {
            series: {
                compare: 'percent',
                showInNavigator: true
            }
        },

        series: [{
            name: 'market_cap',
            data: market_cap,
            tooltip: {
                valueDecimals: 2
            }
        },{
          name: 'price',
          data: price,
          tooltip: {
              valueDecimals: 2
          }
        }]
    });
});

$(function () {
    // Create the chart
    volumeChart = Highcharts.stockChart('chart2', {


        rangeSelector: {
            selected: 1
        },

        title: {
            text: 'volume  enchanged last 24h'
        },

        series: [{
            name: 'volume enchanged last 24h',
            data: volume,
            tooltip: {
                valueDecimals: 2
            }
        }]
    });
});
