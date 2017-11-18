var market_cap, price, volume;
var currant_crypto;
var marketCapChart, volumeChart;
var offline = false;

var jsonPrices = {};

$(document).ready(function(){
  //loadData();
  //alert('cona');
  hideprogressbar();

});

/*$.ajax({
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
});*/



function onChangeCrypto(crypto){
  if($('#checkbox'+crypto).is(":checked")){
    showprogressbar();
    addCoin(crypto);
    console.log('add'+crypto);
    hideprogressbar();
  }
  else{
    removeCoin(crypto);
    console.log('remove'+crypto);
  }
}

function addCoin(crypto){

  var priceName = 'price'+crypto;
  var dataa;
  if(jsonPrices[priceName]!= null){
    dataa = jsonPrices[priceName];
  }
  else{
    jsonPrices["price"+crypto] = getData(crypto);
  }
  priceChart.addSeries({
                name: crypto,
                data: jsonPrices[priceName]
            });
}

function removeCoin(crypto){
  for(var i = 0; i < priceChart.series.length; i++ ) {
    if(priceChart.series[i].name == crypto){
      priceChart.series[i].remove();
    }
  }
}

function loadData(){
  jsonPrices["priceBTC"] = getData('BTC');
  jsonPrices["priceETH"] = getData('ETH');
  jsonPrices["priceETH"] = getData('XRP');
  jsonPrices["priceBCH"] = getData('BCH');
  jsonPrices["priceLTC"] = getData('LTC');
  jsonPrices["priceDASH"] = getData('DASH');
  jsonPrices["priceXEM"] = getData('XEM');
  jsonPrices["priceBCC"] = getData('BCC');
  jsonPrices["priceXMR"] = getData('XMR');
  jsonPrices["priceETC"] = getData('ETC');
  jsonPrices["priceMIOTA"] = getData('MIOTA');
  jsonPrices["priceOMG"] = getData('OMG');
  jsonPrices["priceADA"] = getData('ADA');
  jsonPrices["priceQTUM"] = getData('QTUM');
}

function getData(crypto){
  if(offline){
    $.ajax({
      url: "data/history/history" + crypto + ".json",
      dataType: 'json',
      async: true,
      success: function(data) {
        //console.log(data);
        //market_cap = data.market_cap;
        price = data.price;
        //volume = data.volume;
      }
    });
  }

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
  return price;
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

        yAxis: {
        type: 'logarithmic',

      },

        series: [//{

          //name: 'btc',
          //data: price,
          //tooltip: {
          //    valueDecimals: 2
          //}
        /*}*/]
    });
});

function transformTimestamps(arra){
  var d = new Date(timestamp);
}

function showprogressbar(){
  $("#progressbar").fadeIn();
}

function hideprogressbar(){
  $("#progressbar").fadeOut();
}
