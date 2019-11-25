'use strict';

const JSONFileName = 'assets/springfield.json';

var generationConfig = {
    chart: {
        type: 'area',
        backgroundColor: "transparent",
    },
    title: {
        text: 'Generation',
        align:'left',
        x:30
    },

    legend:{
        enabled: false
    },

    tooltip: {
        positioner: function () {
            // console.log("in positioner")
            return {x: this.chart.chartWidth - this.label.width -10, y: 10 };
        },
        borderWidth:0,
        split: false,
        valueSuffix: ' MW',
        crosshair: true,
        formatter: function(){
            // console.log("in formatter", this.point)
            var name = document.getElementById('pieChart').attributes['name'].value;
            if (name == 'pie'){
                plotPie(this.point.x)
            }
            else{
                plotBar(this.point.x)
            }
            updateLegend(this.point.x)
            return('<br/><span style="color:' + this.point.color + '">\u25A0</span> '+this.point.series.name+ ': '+Math.round(this.point.y)+' MW  Total: '+Math.round(this.point.total)+' MW')
        }
    },

    xAxis: {
        tickInterval:48,
        tickmarkPlacement: 'on',
        title: {
            enabled: false
        },
        crosshair: true,
        labels:{
            formatter: function(){
                var monthNames = [
                    "Jan", "Feb", "Mar",
                    "Apr", "May", "June", "July",
                    "Aug", "Sept", "Oct",
                    "Nov", "Dec"
                ];
        
                var dayNames = [
                    "Sun","Mon", "Tue", 'Wed', "Thu", "Fri", "Sat"
                ];
                // console.log("in formatter",this);
                return dayNames[this.value.getUTCDay()]+' '+this.value.getUTCDate()+' '+monthNames[this.value.getUTCMonth()];
            }
        }
    
    },
    yAxis: {
        title: {
            text: 'MW',
            align: 'high',
            rotation: 0,
            y:-30,
            x:130
        },
        min: -100,
        reversedStacks: false
    },
 
    plotOptions: {
        area: {
            stacking: 'normal',
            lineColor: '#666666',
            lineWidth: 1,
            marker: {
                lineWidth: 1,
                lineColor: '#666666'
            }
        }
    },
    // colors: ['#17202A', '#EB984E', '#2E86C1', '#1E8449', '#F4D03F', '#A569BD', '#5DADE2'],
    
    series: []
}

var priceConfig = {

    chart: {
        height: 200,
        backgroundColor: "transparent"
    },

    tooltip:{
        positioner: function () {
            // console.log("in positioner")
            return {x: this.chart.chartWidth - this.label.width -10, y: 10 };
        },
        borderWidth:0,
    },

    rangeSelector: {
        selected: 3
    },
    
    title: {
        text: 'Price',
        align:'left',
        x:30
    },

    yAxis: {
        title: {
            text: '$/MWH',
            align: 'high',
            rotation: 0,
            y:-30,
            x:80
        },
        max: 400,
        min: -200
    },

    xAxis:{
        crosshair: true,
        visible: false
    },

    legend:{
        enabled: false
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            }
        },
        line:{
            color: '#C0392B'
        }
    },

    series: []
}

var temperatureConfig = {

    chart:{
        height: 200,
        backgroundColor: "transparent"
    },

    tooltip:{
        positioner: function () {
            // console.log("in positioner")
            return {x: this.chart.chartWidth - this.label.width -10, y: 10 };
        },
        borderWidth:0,
    },

    title: {
        text: 'Temperature',
        align:'left',
        x:30
    },

    yAxis: {
        title: {
            text: '°F',
            align: 'high',
            rotation: 0,
            y:-30,
            x:150
        },
        min:0
    },

    xAxis:{
        crosshair: true,
        visible: false
    },

    legend:{
        enabled: false
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            }
        },
        line:{
            color: '#C0392B'
        }
    },

    series: []
}

var pieConfig = {
    title: {
        text: '',
        y:220
    },
    chart: {
        backgroundColor: "transparent",
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
        animation: false
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            shadow: false
        },
        series:{
            animation:{
                duration: 0
            }
        }
    },
    series: []
}

var barConfig = {
    chart: {
        type: 'bar',
        backgroundColor: "transparent",
        height: 400,
        width: 400,
        animation: false,
        align: "center"
    },
    title: {
        text: ''
    },
    xAxis: {
        categories: ["Black Coal", "Distillate", "Gas (CCGT)", "Hydro", "Wind"],
        title: {
            text: null
        }
    },
    yAxis: {
        title:{
            text: ''
        }
    },
    tooltip: {
        enabled: false,
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        },
        series:{
            animation:{
                duration: 0
            }
        }
    },
    series:[]
}

var colorDict = {'wind': '#006400', 'hydro': '#4169E1', 'pumps': '#87CEFA', 'gas_ccgt': '#FFA500', 'distillate':'#FF0000', 'black_coal': '#000000', 'exports': '#9370DB'}


// Utility function to fetch any file from the server
function fetchJSONFile(filePath, callbackFunc) {
    console.debug("Fetching file:", filePath);
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200 || httpRequest.status === 0) {
                // console.info("Loaded file:", filePath);
                var data = JSON.parse(httpRequest.responseText);
                console.debug("Data parsed into valid JSON!");
                console.debug(data);
                if (callbackFunc) callbackFunc(data);
            } else {
                console.error("Error while fetching file", filePath, 
                    "with error:", httpRequest.statusText);
            }
        }
    };
    httpRequest.open('GET', filePath);
    httpRequest.send();
}

function getDateArray(start, last, interval){
    var DateArray = new Array();
    var temp = start
    while (temp < last){
        DateArray.push(new Date(temp*1000));
        temp += 60*interval;
    }
    // DateArray.push(new Date(last*1000));
    return DateArray
}

function plotGeneration() {
    fetchJSONFile(JSONFileName, function(data){

        var effectiveDates = getDateArray(1571579700, 1572183000, 30)
        var seriesData = data.slice(0,7).map(function(elm) {
            var start = parseInt(elm['history']['start']);
            var last = parseInt(elm['history']['last']);
            var interval = parseInt(elm['history']['interval']);
            // console.log((start-last)/interval/60)
            var currentDates = getDateArray(start, last, interval);
            // console.log(currentDates);
            var allData = elm['history']['data']
            var constant = 1
            if (elm['fuel_tech'] == 'pumps' || elm['fuel_tech'] == 'exports'){
                constant = -1;
            }
            var dateDataDict = {};
            currentDates.forEach((value, i) => dateDataDict[value] = allData[i]);
            var effectiveData = new Array();
            for(var date of effectiveDates){
                effectiveData.push(dateDataDict[date]*constant);
            }
            // console.log(effectiveData)
            var obj = {};
            obj['name'] = elm['fuel_tech'];
            obj['data'] = effectiveData
            obj['color'] = colorDict[obj['name']];
            return obj;
        });
        generationConfig['series'] = seriesData;
        generationConfig['xAxis']['categories'] = effectiveDates;
        // console.log(generationConfig['series'])
        Highcharts.chart('generationChart', generationConfig)
    });
}

function plotPrice() {
    fetchJSONFile(JSONFileName, function(data){

        // var jsonCfg = priceConfig;
        var seriesData = data.slice(8,9).map(function(elm) {

            var obj = {};
            obj['name'] = 'price';
            obj['data'] = elm['history']['data'];
            return obj;
        });
        // console.log(seriesData);
        priceConfig['series'] = seriesData;
        Highcharts.chart('priceChart', priceConfig)
    });
}
function plotTemperature() {
    fetchJSONFile(JSONFileName, function(data){

        // var jsonCfg = temperatureConfig;
        var seriesData = data.slice(10,11).map(function(elm) {

            var obj = {};
            obj['name'] = 'temperature';
            obj['data'] = elm['history']['data'];
            return obj;
        });
        // console.log(seriesData);
        temperatureConfig['series'] = seriesData;
        Highcharts.chart('temperatureChart', temperatureConfig)
    });
}

function plotPie(x) {
    
    fetchJSONFile(JSONFileName, function(data){

        var effectiveDates = getDateArray(1571579700, 1572183000, 30)
        var seriesData = data.slice(0,7).map(function(elm) {
            var start = parseInt(elm['history']['start']);
            var last = parseInt(elm['history']['last']);
            var interval = parseInt(elm['history']['interval']);
            // console.log((start-last)/interval/60)
            var currentDates = getDateArray(start, last, interval);
            // console.log(currentDates);
            var allData = elm['history']['data']
            var constant = 1
            if (elm['fuel_tech'] == 'pumps' || elm['fuel_tech'] == 'exports'){
                constant = -1;
            }
            var dateDataDict = {};
            currentDates.forEach((value, i) => dateDataDict[value] = allData[i]);
            var effectiveData = new Array();
            for(var date of effectiveDates){
                effectiveData.push(dateDataDict[date]*constant);
            }
            // console.log(effectiveData)
            var obj = {};
            obj['name'] = elm['fuel_tech'];
            obj['data'] = effectiveData
            obj['color'] = colorDict[obj['name']];
            return obj;
        });
        var newSeriesData = [{}];
        var data = []; 
        var total_sum = 0;
        var positive = 0;
        var negative = 0;
        for (var i = 0; i < 7; i++){
            var obj = {}
            if (seriesData[i]['name'] == 'pumps' || seriesData[i]['name'] == 'exports'){
                continue;
            }
            obj['name'] = seriesData[i]['name'];
            obj['color'] = colorDict[obj['name']];
            obj['y'] = seriesData[i]['data'][x];
            if (obj['name'] == 'pumps' || obj['name'] == 'exports'){
                negative = negative + obj['y'];
            }
            else{
                positive = positive + obj['y']
            }
            total_sum = total_sum + obj['y'];
            data.push(obj)
        }
    
        newSeriesData[0]['name'] = 'Energy';
        newSeriesData[0]['data'] = data;
        newSeriesData[0]['innerSize'] = "50%"
        pieConfig['series'] = newSeriesData;
        pieConfig['title']['text'] = Math.round(positive)+" MW"
        Highcharts.chart('pieChart', pieConfig);
        // Highcharts.charts[3].setTitle({text: Math.round(positive)+" MW"});
    });


}

function updateLegend(x){
    fetchJSONFile(JSONFileName, function(data){
        var price = data[8]['history']['data'][x];

        var effectiveDates = getDateArray(1571579700, 1572183000, 30)
        var seriesData = data.slice(0,7).map(function(elm) {
            var start = parseInt(elm['history']['start']);
            var last = parseInt(elm['history']['last']);
            var interval = parseInt(elm['history']['interval']);
            // console.log((start-last)/interval/60)
            var currentDates = getDateArray(start, last, interval);
            // console.log(currentDates);
            var allData = elm['history']['data']
            var constant = 1
            if (elm['fuel_tech'] == 'pumps' || elm['fuel_tech'] == 'exports'){
                constant = -1;
            }
            var dateDataDict = {};
            currentDates.forEach((value, i) => dateDataDict[value] = allData[i]);
            var effectiveData = new Array();
            for(var date of effectiveDates){
                effectiveData.push(dateDataDict[date]*constant);
            }
            // console.log(effectiveData)
            var obj = {};
            obj['name'] = elm['fuel_tech'];
            obj['data'] = effectiveData
            obj['color'] = colorDict[obj['name']];
            return obj;
        });
        var data = []; 
        var total_sum = 0;
        var negative = 0;
        var positive = 0;
        for (var i = 0; i < 7; i++){
            var obj = {}
            obj['name'] = seriesData[i]['name'];
            obj['color'] = colorDict[obj['name']];
            obj['y'] = seriesData[i]['data'][x];
            if (obj['name'] == 'pumps' || obj['name'] == 'exports'){
                negative = negative + obj['y'];
            }
            else{
                positive = positive + obj['y']
            }
            total_sum = total_sum + obj['y'];
            data.push(obj)
        }
        var table = document.getElementById('legendTable');
    
        var monthNames = [
            "Jan", "Feb", "Mar",
            "Apr", "May", "June", "July",
            "Aug", "Sept", "Oct",
            "Nov", "Dec"
        ];

        var dayNames = [
            "Sun","Mon", "Tue", 'Wed', "Thur", "Fri", "Sat"
        ];
        var date = effectiveDates[x];
        table.rows[0].cells[3].innerHTML = date.getUTCDate()+' '+monthNames[date.getUTCMonth()]+', '+date.getUTCHours()+': '+date.getUTCMinutes()
        table.rows[2].cells[3].innerHTML = '<b>'+'$'+price+'.00'+'</b>'
        table.rows[2].cells[1].innerHTML = '<b>'+Math.round(positive)+'</b>'
        table.rows[3].cells[1].innerHTML = Math.round(data[5]['y'])
        table.rows[3].cells[2].innerHTML = Number( (data[5]['y']/total_sum*100).toPrecision(2) ) +'%'
        table.rows[4].cells[1].innerHTML = Math.round(data[3]['y'])
        table.rows[4].cells[2].innerHTML = Number( (data[3]['y']/total_sum*100).toPrecision(2) ) +'%'
        table.rows[5].cells[1].innerHTML = Math.round(data[2]['y'])
        table.rows[5].cells[2].innerHTML = Number( (data[2]['y']/total_sum*100).toPrecision(2) ) +'%'
        table.rows[6].cells[1].innerHTML = Math.round(data[1]['y'])
        table.rows[6].cells[2].innerHTML = Number( (data[1]['y']/total_sum*100).toPrecision(2) ) +'%'
        table.rows[7].cells[1].innerHTML = Math.round(data[0]['y'])
        table.rows[7].cells[2].innerHTML = Number( (data[0]['y']/total_sum*100).toPrecision(2) ) +'%'
        table.rows[8].cells[1].innerHTML = '<b>'+Math.round(negative)+'</b>'
        table.rows[9].cells[1].innerHTML = Math.round(data[6]['y'])
        table.rows[9].cells[2].innerHTML = Number( (data[6]['y']/total_sum*100).toPrecision(2) ) +'%'
        table.rows[10].cells[1].innerHTML = Math.round(data[4]['y'])
        table.rows[10].cells[2].innerHTML = Number( (data[4]['y']/total_sum*100).toPrecision(2) ) +'%'
        table.rows[11].cells[1].innerHTML = '<b>'+Math.round(total_sum)+'</b>'
        table.rows[12].cells[2].innerHTML = '<b>'+Number( ((data[5]['y']+data[3]['y'])/total_sum*100).toPrecision(2) ) +'%'+'</b>'
        if (data[6]['y'] == 0){
            table.rows[9].cells[1].innerHTML = '-'
            table.rows[9].cells[2].innerHTML = '-'
        }
    });

}

function plotBar(x) {
    
    fetchJSONFile(JSONFileName, function(data){

        var effectiveDates = getDateArray(1571579700, 1572183000, 30)
        var seriesData = data.slice(0,7).map(function(elm) {
            var start = parseInt(elm['history']['start']);
            var last = parseInt(elm['history']['last']);
            var interval = parseInt(elm['history']['interval']);
            // console.log((start-last)/interval/60)
            var currentDates = getDateArray(start, last, interval);
            // console.log(currentDates);
            var allData = elm['history']['data']
            var constant = 1
            if (elm['fuel_tech'] == 'pumps' || elm['fuel_tech'] == 'exports'){
                constant = -1;
            }
            var dateDataDict = {};
            currentDates.forEach((value, i) => dateDataDict[value] = allData[i]);
            var effectiveData = new Array();
            for(var date of effectiveDates){
                effectiveData.push(dateDataDict[date]*constant);
            }
            // console.log(effectiveData)
            var obj = {};
            obj['name'] = elm['fuel_tech'];
            obj['data'] = effectiveData
            obj['color'] = colorDict[obj['name']];
            return obj;
        });

        var newSeriesData = [{}];
        var data = []; 
        var total_sum = 0;
        var positive = 0;
        var negative = 0;
        for (var i = 0; i < 7; i++){
            var obj = {}
            if (seriesData[i]['name'] == 'pumps' || seriesData[i]['name'] == 'exports'){
                continue;
            }
            obj['name'] = seriesData[i]['name'];
            obj['color'] = colorDict[obj['name']];
            obj['y'] = seriesData[i]['data'][x];
            if (obj['name'] == 'pumps' || obj['name'] == 'exports'){
                negative = negative + obj['y'];
            }
            else{
                positive = positive + obj['y']
            }
            total_sum = total_sum + obj['y'];
            data.push(obj)
        }
        
        newSeriesData[0]['data'] = data;
        barConfig['series'] = newSeriesData;
        // console.log(newSeriesData)
        Highcharts.chart('pieChart', barConfig);
    });

}


/**
 * In order to synchronize tooltips and crosshairs, override the
 * built-in events with handlers defined on the parent element.
 */
['generationChart','priceChart','temperatureChart'].forEach(function(mychart){
    ['mousemove', 'touchmove', 'touchstart'].forEach(function (eventType) {
        document.getElementById(mychart).addEventListener(
            eventType,
            function (e) {
                var chart,
                    point,
                    i,
                    event;
    
                for (i = 0; i < 3; i = i + 1) {
                    chart = Highcharts.charts[i];
                    // Find coordinates within the chart
                    event = chart.pointer.normalize(e);
                    // Get the hovered point
                    point = chart.series[0].searchPoint(event, true);
                    // var index = chart.series[0].data.indexOf(point);
    
                    if (point) {
                        point.highlight(e);
                    }
                }
            }
        );
    });
})

document.getElementById('pieBut').addEventListener('click', function(){
    // console.log("hello")
    var name = document.getElementById('pieChart').attributes['name'].value;
    console.log(name)
    if (name == 'pie'){
        return
    }
    document.getElementById('pieChart').setAttribute('name', 'pie');
    plotPie(0);
})

document.getElementById('barBut').addEventListener('click', function(){
    // console.log("hello")
    var name = document.getElementById('pieChart').attributes['name'].value;
    console.log(name)
    if (name == 'bar'){
        return
    }
    document.getElementById('pieChart').setAttribute('name', 'bar');
    plotBar(0);
})

/**
 * Override the reset function, we don't need to hide the tooltips and
 * crosshairs.
 */
Highcharts.Pointer.prototype.reset = function () {
    return undefined;
};

/**
 * Highlight a point by showing tooltip, setting hover state and draw crosshair
 */
Highcharts.Point.prototype.highlight = function (event) {
    event = this.series.chart.pointer.normalize(event);
    // console.log(event)
    this.onMouseOver(); // Show the hover marker
    // this.series.chart.tooltip.refresh(this); // Show the tooltip
    this.series.chart.xAxis[0].drawCrosshair(event, this); // Show the crosshair
};

/**
 * Synchronize zooming through the setExtremes event handler.
 */
function syncExtremes(e) {
    var thisChart = this.chart;

    if (e.trigger !== 'syncExtremes') { // Prevent feedback loop
        Highcharts.each(Highcharts.charts, function (chart) {
            if (chart !== thisChart) {
                if (chart.xAxis[0].setExtremes) { // It is null while updating
                    chart.xAxis[0].setExtremes(
                        e.min,
                        e.max,
                        undefined,
                        false,
                        { trigger: 'syncExtremes' }
                    );
                }
            }
        });
    }
}


// The entrypoint of the script execution
function doMain() {
    plotGeneration();
    plotPrice();
    plotTemperature();
    plotPie(0);
    updateLegend(0);
}

document.onload = doMain();