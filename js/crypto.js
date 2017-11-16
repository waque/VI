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
  error: function () {

        $.ajax({
          url: "data/history/historyBTC.json",
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



function onChangeCrypto(crypto){
  if($('#checkbox'+crypto).is(":checked")){
    addCoin(crypto);
    console.log('add'+crypto);
  }
  else{
    removeCoin(crypto);
    console.log('remove'+crypto);
  }
}

function addCoin(crypto){
  getData(crypto);
  priceChart.addSeries({
                name: crypto,
                data: price
            });
}

function removeCoin(crypto){
  return null;
}


function getData(crypto){
  $.ajax({
    url: "http://coincap.io/history/365day/"+crypto,
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
            url: "data/history/history" + crypto + ".json",
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
    priceChart = Highcharts.stockChart('chart1', {

        rangeSelector: {
            selected: 1
        },

        title: {
            text: 'Price'
        },

        series: [{

          name: 'btc',
          data: price,
          tooltip: {
              valueDecimals: 2
          }
        }]
    });
});
