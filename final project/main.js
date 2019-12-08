var Banqiao = [0,24]
var Datong = [24,48]
var Dayuan = [48,72]
var Guanyin = [72,96]
var Keelung = [96,120]
var Linkou = [120,144]
var Longtan = [144,168]
var Pingzhen = [168,192]
var Sanchong = [192,216]
var Shilin = [216,240]
var Songshan = [240,264]
var Tamsui = [264,288]
var Taoyuan = [288,312]
var Tucheng = [312,336]
var Wanhua = [336,360]
var Wanli = [360,384]
var Xindian = [384,408]
var Xinzhuang = [408,432]
var Xizhi = [432,456]
var Yangming = [456,480]
var Yonghe = [480,504]
var Zhongli = [504,528]
var Zhongshan = [528,552]
var Chemicals = ['SO2','O3','NO','NO2','CO']
var colrs = ["#7cb5ec", "#434348", "#90ed7d", "#f7a35c", "#8085e9", "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"]

function fetchJSONFile(path, callback){
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function(){
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200 || httpRequest.status === 0) {
        var data = JSON.parse(httpRequest.responseText);
        if (callback) {
          callback(data);
        };
      }
    }
  };
  httpRequest.open('GET', path);
  httpRequest.send();
}

function drawMap(){
  var location = $("#tw");
  zingchart.bind(null, 'shape_click', function(e) {
    document.getElementById('tw').value = e.shapeid;
    location.trigger("change");
});
  zingchart.loadModules('maps,maps-twn',function(e){
    zingchart.render({
      id:'map',
      data:{
        graphset:[{
          shapes:[
            {
            type:'zingchart.maps',
            options:{
              name:'twn',
              zoom:5,
              offsetX:-320,
              offsetY:800,
              style:{
                label:{
                  visible:false,
                },
                tooltip:{
                  visible:true,
                  sticky:true,
                  x:"30%",
                  y:"5%",
                  text:'Norther Taiwan Weather Stations',
                  timeout: 1000000,
                },
                hoverState:{
                  visible:false
                }
              }
            }
          },
          {
            type:'circle',
            id:'Banqiao',
            x:'121.4618lon',
            y:'25.0114lat',
            map:'twn',
            size:10,
            "background-color": "#4dd0e1",
            cursor:"pointer",
            tooltip:{
              text:'Banqiao'
            },
            label:{
              text:'',
              fontsize:15,
            }
          },
          {
            type:'circle',
            id:'Datong',
            x:'121.5113lon',
            y:'25.0627lat',
            map:'twn',
            size:10,
            "background-color": "#4dd0e1",
            cursor:"pointer",
            tooltip:{
              text:'Datong'
            },
            label:{
              text:'',
              fontsize:15,
            }
          },
          {
            type:'circle',
            id:'Dayuan',
            x:'121.1939lon',
            y:'25.0493lat',
            map:'twn',
            size:10,
            "background-color": "#4dd0e1",
            cursor:"pointer",
            tooltip:{
              text:'Dayuan'
            },
            label:{
              text:'',
              fontsize:15,
            }
          },
          {
            type:'circle',
            id:'Guanyin',
            x:'121.1138lon',
            y:'25.0359lat',
            map:'twn',
            size:10,
            "background-color": "#4dd0e1",
            cursor:"pointer",
            tooltip:{
              text:'Guanyin'
            },
            label:{
              text:'',
              fontsize:15,
            }
          },
          {
            type:'circle',
            id:'Keelung',
            x:'121.7392lon',
            y:'25.1276lat',
            map:'twn',
            size:10,
            "background-color": "#4dd0e1",
            cursor:"pointer",
            tooltip:{
              text:'Keelung'
            },
            label:{
              text:'',
              fontsize:15,
            }
          },
          {
            type:'circle',
            id:'Linkou',
            x:'121.3881lon',
            y:'25.0790lat',
            map:'twn',
            size:10,
            "background-color": "#4dd0e1",
            cursor:"pointer",
            tooltip:{
              text:'Linkou'
            },
            label:{
              text:'',
              fontsize:15,
            }
          },
          {
            type:'circle',
            id:'Longtan',
            x:'121.2054lon',
            y:'24.8445lat',
            map:'twn',
            size:10,
            "background-color": "#4dd0e1",
            cursor:"pointer",
            tooltip:{
              text:'Longtan'
            },
            label:{
              text:'',
              fontsize:15,
            }
          },
          {
            type:'circle',
            id:'Pingzhen',
            x:'121.2054lon',
            y:'24.9296lat',
            map:'twn',
            size:10,
            "background-color": "#4dd0e1",
            cursor:"pointer",
            tooltip:{
              text:'Pingzhen'
            },
            label:{
              text:'',
              fontsize:15,
            }
          },
          {
            type:'circle',
            id:'Sanchong',
            x:'121.4867lon',
            y:'25.0615lat',
            map:'twn',
            size:10,
            "background-color": "#4dd0e1",
            cursor:"pointer",
            tooltip:{
              text:'Sanchong'
            },
            label:{
              text:'',
              fontsize:15,
            }
          },
          {
            type:'circle',
            id:'Shilin',
            x:'121.5246lon',
            y:'25.0950lat',
            map:'twn',
            size:10,
            "background-color": "#4dd0e1",
            cursor:"pointer",
            tooltip:{
              text:'Shilin'
            },
            label:{
              text:'',
              fontsize:15,
            }
          },
          {
            type:'circle',
            id:'Songshan',
            x:'121.5639lon',
            y:'25.0542lat',
            map:'twn',
            size:10,
            "background-color": "#4dd0e1",
            cursor:"pointer",
            tooltip:{
              text:'Songshan'
            },
            label:{
              text:'',
              fontsize:15,
            }
          },
          {
            type:'circle',
            id:'Tamsui',
            x:'121.4434lon',
            y:'25.1720lat',
            map:'twn',
            size:10,
            "background-color": "#4dd0e1",
            cursor:"pointer",
            tooltip:{
              text:'Tamsui'
            },
            label:{
              text:'',
              fontsize:15,
            }
          },
          {
            type:'circle',
            id:'Taoyuan',
            x:'121.3010lon',
            y:'24.9936lat',
            map:'twn',
            size:10,
            "background-color": "#4dd0e1",
            cursor:"pointer",
            tooltip:{
              text:'Taoyuan'
            },
            label:{
              text:'',
              fontsize:15,
            }
          },
          {
            type:'circle',
            id:'Tucheng',
            x:'121.4380lon',
            y:'24.9684lat',
            map:'twn',
            size:10,
            "background-color": "#4dd0e1",
            cursor:"pointer",
            tooltip:{
              text:'Tucheng'
            },
            label:{
              text:'',
              fontsize:15,
            }
          },
          {
            type:'circle',
            id:'Wanhua',
            x:'121.4970lon',
            y:'25.0263lat',
            map:'twn',
            size:10,
            "background-color": "#4dd0e1",
            cursor:"pointer",
            tooltip:{
              text:'Wanhua'
            },
            label:{
              text:'',
              fontsize:15,
            }
          },
          {
            type:'circle',
            id:'Wanli',
            x:'121.6397lon',
            y:'25.1676lat',
            map:'twn',
            size:10,
            "background-color": "#4dd0e1",
            cursor:"pointer",
            tooltip:{
              text:'Wanli'
            },
            label:{
              text:'',
              fontsize:15,
            }
          },
          {
            type:'circle',
            id:'Xindian',
            x:'121.5395lon',
            y:'24.9783lat',
            map:'twn',
            size:10,
            "background-color": "#4dd0e1",
            cursor:"pointer",
            tooltip:{
              text:'Xindian'
            },
            label:{
              text:'',
              fontsize:15,
            }
          },
          {
            type:'circle',
            id:'Xinzhuang',
            x:'121.4178lon',
            y:'25.0266lat',
            map:'twn',
            size:10,
            "background-color": "#4dd0e1",
            cursor:"pointer",
            tooltip:{
              text:'Xinzhuang'
            },
            label:{
              text:'',
              fontsize:15,
            }
          },
          {
            type:'circle',
            id:'Xizhi',
            x:'121.6397lon',
            y:'25.0616lat',
            map:'twn',
            size:10,
            "background-color": "#4dd0e1",
            cursor:"pointer",
            tooltip:{
              text:'Xizhi'
            },
            label:{
              text:'',
              fontsize:15,
            }
          },
          {
            type:'circle',
            id:'Yangming',
            x:'121.5609lon',
            y:'25.1942lat',
            map:'twn',
            size:10,
            "background-color": "#4dd0e1",
            cursor:"pointer",
            tooltip:{
              text:'Yangming'
            },
            label:{
              text:'',
              fontsize:15,
            }
          },
          {
            type:'circle',
            id:'Yonghe',
            x:'121.5145lon',
            y:'25.0103lat',
            map:'twn',
            size:10,
            "background-color": "#4dd0e1",
            cursor:"pointer",
            tooltip:{
              text:'Yonghe'
            },
            label:{
              text:'',
              fontsize:15,
            }
          },
          {
            type:'circle',
            id:'Zhongli',
            x:'121.2054lon',
            y:'24.9722lat',
            map:'twn',
            size:10,
            "background-color": "#4dd0e1",
            cursor:"pointer",
            tooltip:{
              text:'Zhongli'
            },
            label:{
              text:'',
              fontsize:15,
            }
          },
          {
            type:'circle',
            id:'Zhongshan',
            x:'121.5427lon',
            y:'25.0792lat',
            map:'twn',
            size:10,
            "background-color": "#4dd0e1",
            cursor:"pointer",
            tooltip:{
              text:'Zhongshan'
            },
            label:{
              text:'',
              fontsize:15,
            }
          },
        ]
        }]
      },
      height:400,
      width:'100%'
    });
  });
};

function drawStack(){
  Highcharts.chart("stack",stack);
  var location = $("#tw");
  location.change(function(){
    fetchJSONFile('taiwan.json',function(data){
      cur = location.val();
      curData = data.slice(eval(cur)[0],eval(cur)[1]);
      seriesData = [];
      var so2 = []
      var o3 = []
      var no = []
      var no2 = []
      var co = []

      for (var i = 0; i < curData.length; i++) {
        hourData = curData[i]
        so2.push(hourData['SO2'])
        o3.push(hourData['O3'])
        no.push(hourData['NO'])
        no2.push(hourData['NO2'])
        co.push(hourData['CO'])
      }

      seriesData.push({'name':'SO2','data':so2})
      seriesData.push({'name':'O3','data':o3})
      seriesData.push({'name':'NO','data':no})
      seriesData.push({'name':'NO2','data':no2})
      seriesData.push({'name':'CO','data':co})

      /*seriesData.forEach(function(datum,i){
            datum['color'] = colrs[i];
        });*/
      stack['series'] = seriesData;
      
      stack['title'] = {text:cur+"'s Harmful Gas Concentration",align:'center'}
      Highcharts.chart("stack",stack);
    });
  });
}

function drawGauge(){
  zingchart.render({
    id: 'gauge',
    data: gaugeConfig
  });
  var time = $("#time");
  time.change(function(){
    fetchJSONFile('taiwan.json',function(data){
      curTime = time.val();
      curData = data.slice(0,24);
      curTimeData = curData[curTime];
      hum = curTimeData['RH'];
      temp = curTimeData['AMB_TEMP'];
      pm = curTimeData['PM2.5'];
      p = gaugeConfig['graphset'][0];
      t = gaugeConfig['graphset'][1];
      g = gaugeConfig['graphset'][2]

      g['series'] = [
        {
          values: [hum], // starting value
          backgroundColor: 'black',
          indicator: [5, 5, 5, 5, 0.75],
          valueBox: {
            text: hum.toFixed().toString(), // default
            fontSize: '20px',
            placement: 'center',
          }
        }
      ]

      p['series'] = [
        {
          values: [pm], // starting value
          backgroundColor: 'black',
          indicator: [5, 5, 5, 5, 0.75],
          valueBox: {
            text: pm.toFixed().toString(), // default
            fontSize: '20px',
            placement: 'center',
            rules: [
              {
                text: pm.toFixed().toString()+'<br>Unhealthy',
                rule: '%v >= 35.4'
              },
              {
                text: pm.toFixed().toString()+'<br>Moderate',
                rule: '%v < 35.4 && %v > 12'
              },
              {
                text: pm.toFixed().toString()+'<br>Good',
                rule: '%v <  12'
              }
            ]
          }
        }
      ]

      t['series'] = [
        {
          values: [temp],
          tooltip: {
            visble: false
          },
          valueBox: {
            text: temp.toFixed().toString(),
            fontColor: '#515151',
            fontSize: '20px',
            offsetY: '10px',
            placement: 'bottom-out'
          },
          backgroundColor: '#FF0000 ',
          barWidth: '93%',
          maxTrackers: 0
        }
      ]


      zingchart.MODULESDIR ='https://cdn.zingchart.com/modules/';
      zingchart.render({
        id: 'gauge',
        data: gaugeConfig
      });
    })
  })
}

function drawBar(){
  var chart = Highcharts.chart("bar",bar);
  var data = $("#data");
  data.change(function(){
    d = data.val();
    datum = d.split(",").slice(0,5);
    seriesData = {};
    seriesData['type'] = 'bar';
    seriesData['data'] = [];
    for (var i = 0; i < datum.length; i++) {
      obj = {};
      obj['name'] = Chemicals[i];
      obj['y'] = parseFloat(datum[i]);
      obj['color'] = colrs[i];
      seriesData['data'].push(obj);
    }
    bar['series'] = [seriesData];
    Highcharts.chart('bar',bar);
  })
}

let stack = {
    chart:{
        type:'area',
        backgroundColor:"rgba(0,0,0,0)",
        animation:false,
    },
    title:{
        text:'Harmful Gas Concentration',
        align:'center'
    },
    subtitle:{
        text:'ppb',
        align:'left'
    },
    xAxis:{

    },
    yAxis: {
        title: {
            text: ''
        },
        labels: {
            formatter: function () {
                return this.value;
            }
        },
    },
    legend:{
        enabled:true,
    },
    tooltip: {
        enabled:true,
        crosshairs:true,
        shared:true,
        positioner:function(){
            return{
                x:this.chart.chartWidth - this.label.width,
                y:10
            };
        },

        formatter:function(){
            tm = this.points[0].x;

            timeSender = $("#time");
            timeSender.on("change", function(){
                    timeSender.val(tm);
                }).triggerHandler('change');


            dataSender = $("#data");
            datalst = '';
            sum = 0;
            for (var i = 0; i < this.points.length; i++) {
              datum = this.points[i].y
              sum += datum;
              datalst += datum+",";
            }
            dataSender.on("change", function(){
                    dataSender.val(datalst);
                    r = sum.toFixed()*2.6 + 20;
                    r = r.toString();
                    g = sum.toFixed()*-10.2 + 683.4;
                    g = g.toString();


                    document.body.style.backgroundColor = "rgb("+r+","+g+","+g+")";

                }).triggerHandler('change');

            return "Total: "+sum.toFixed(2).toString()+" ppb";
        },
        borderWidth:0,
        backgroundColor:'white',
        pointFormat:'{point.y}',
        headerFormat:'',
        shadow:false,

    },
    plotOptions: {
        area: {
            stacking: 'normal'
          },
        series:{
          animation:true,
        },
    },
    series:[{'name':'SO2','data':Array(10).fill(0)},
    {'name':'O3','data':Array(10).fill(0)},{'name':'NO','data':Array(10).fill(0)},
    {'name':'NO2','data':Array(10).fill(0)},{'name':'CO','data':Array(10).fill(0)}
  ]
};

let gaugeConfig = {
  graphset: [
    {
      type: 'gauge',
      x: '0px',
      y: '100px',
      "background-color": "transparent",
      title: {
        text: 'PM2.5',
        bold: false,
        fontColor: '#515151',
        y: '85%'
      },
      subtitle: {
        text: 'μg/m3',
        bold: false,
        fontSize: '15px',
        y: '76% '
      },
      plot: {
        size: '100%',
      },
      plotarea: {
        marginTop: '80px'
      },
      scale:{
        "size-factor": 1.5
      },
      scaleR: {
        aperture: 180,
        center: {
          visible: false
        },
        item: {
          offsetR: 0,
          rules: [
            {
              offsetX: '15px',
              rule: '%i == 9'
            }
          ]
        },
        // labels: ['0', '5', '10', '15', '20', '25', '30'],
        maxValue: 80,
        minValue: 0,
        ring: {
          rules: [
            {
              backgroundColor: '#00FF00',
              rule: '%v <= 12'
            },
            {
              backgroundColor: '#FFFF00',
              rule: '%v > 12 && %v < 35.4'
            },
            {
              backgroundColor: '#EF5350',
              rule: '%v >= 35.4 && %v < 55.4'
            },
            {
              backgroundColor: '#E53935',
              rule: '%v >= 55.4'
            }
          ],
          size: '20px'
        },
        step: 5,
        tick: {
          visible: false
        }
      },
      tooltip: {
        borderRadius: '5px'
      },
      series: [
        {
          values: [23], // starting value
          backgroundColor: 'black',
          indicator: [5, 5, 5, 5, 0.75],
          valueBox: {
            text: '%v', // default
            fontSize: '20px',
            placement: 'center',
            rules: [
              {
                text: '%v<br>Unhealthy',
                rule: '%v >= 35.4'
              },
              {
                text: '%v<br>Moderate',
                rule: '%v < 35.4 && %v > 12'
              },
              {
                text: '%v<br>Good',
                rule: '%v <  12'
              }
            ]
          }
        }
      ]
    },
    {
      type: 'bar',
      width: '18%',
      height: '70%',
      x: '45%',
      y: '70px',
      "background-color": "transparent",
      title: {
        text: 'Temp (℃ )',
        bold: false,
        fontColor: '#515151',
        y: '82%'
      },
      subtitle: {
        text: '',
        bold: false,
        fontSize: '15px',
        y: '80%'
      },
      plot: {
        tooltip: {
          visible: false
        },
        barsOverlap: '100%',
        borderRadius: '2px',
        hoverState: {
          visible: false
        }
      },
      plotarea: {
        marginTop: '10%',
        marginBottom: '30%'
      },
      scaleX: {
        visible: false
      },
      scaleY: {
        values: '0:32:1',
        guide: {
          visible: false
        },
        item: {
          fontSize: '16px',
          rules: [
            {
              rule: '%i % 2 == 1',
              visible: false
            }
          ]
        },
        lineColor: 'none',
        minorTick: {
          lineColor: '#C1C1C1',
          placement: 'inner',
          size: '7px'
        },
        minorTicks: 4,
        tick: {
          margin: '3px',
          lineColor: '#5F5F5F',
          lineWidth: '4px',
          placement: 'outter',
          rules: [
            {
              lineWidth: '2px',
              rule: '%i % 2 == 1'
            }
          ],
          size: '15px'
        }
      },
      scaleY2: {
        values: '0:100:10',
        guide: {
          visible: false
        },
        item: {
          visible: false
        },
        lineColor: 'none',

      },
      series: [
        {
          values: [10],
          tooltip: {
            visble: false
          },
          valueBox: {
            text: '%v',
            fontColor: '#515151',
            fontSize: '20px',
            offsetY: '10px',
            placement: 'bottom-out'
          },
          backgroundColor: '#FF0000 ',
          barWidth: '93%',
          maxTrackers: 0
        }
      ]
    },
    {
      type: 'gauge',
      x: '57%',
      y: '100px',
      "background-color": "transparent",
      title: {
        text: 'Humidity',
        bold: false,
        fontColor: '#515151',
        y: '85%'
      },
      subtitle: {
        text: 'percentage(%)',
        bold: false,
        fontSize: '15px',
        y: '76% '
      },
      plot: {
        size: '100%'
      },
      plotarea: {
        marginTop: '80px'
      },
      scale:{
        "size-factor": 1.5
      },
      scaleR: {
        aperture: 180,
        center: {
          visible: false
        },
        item: {
          offsetR: 0,
          rules: [
            {
              offsetX: '15px',
              rule: '%i == 9'
            }
          ]
        },
        // labels: ['0', '5', '10', '15', '20', '25', '30'],
        maxValue: 100,
        minValue: 0,
        ring: {
          backgroundColor: '#00BFFF',
          size: '20px'
        },
        step: 5,
        tick: {
          visible: false
        }
      },
      tooltip: {
        borderRadius: '5px'
      },
      series: [
        {
          values: [50], // starting value
          backgroundColor: 'black',
          indicator: [5, 5, 5, 5, 0.75],
          valueBox: {
            text: '%v', // default
            fontSize: '20px',
            placement: 'center',
          }
        }
      ]
    }
  ]
};

let bar = {
  chart: {
    type: 'bar',
    backgroundColor: 'rgba(0,0,0,0)',
    animation:false,
  },
  title: {
    text: ''
  },
  xAxis: {
    categories: ['SO2','O3','NO','NO2','CO']
  },
  tooltip: {
    enabled:false,
  },
  legend:{
    enabled:false,
  },
  plotOptions:{
                        series:{
                          animation:false,
                            dataLabels:{
                                enabled:true,
                                formatter:function(){return (this.y.toFixed(2)).toString()}
                            }
                        }
                    },
  series:[]
}
