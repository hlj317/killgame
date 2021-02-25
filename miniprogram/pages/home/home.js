var wxCharts = require('../../utils/wxcharts.js');
var myData = require('../../data/mydata.js');
var app = getApp();
var lineChart = null;
Page({
    data: {
        sumMoney:'',
        overallRemain:'',
        overallProfit:'',
        totalIncome:'',
        overallCapitalNum:'',
        overallTodayNum:'',
        overallTodayNumColor:false,
        overallRemainColor:false,
        overallProfitColor:false,
        totalIncomeColor:false
    },
    initData: function(){
        this.setData({
            sumMoney:this.formatSumMoney(),
            overallRemain:this.formatOverallRemain(),
            overallProfit:this.formatOverallProfit(),
            totalIncome:this.formatTotalIncome(),
            overallTodayNum:this.formatOverallTodayNum(),
            overallCapitalNum:this.formatOverallCapitalNum()
        })
    },
    formatSumMoney: function(){
        let currentMoney = myData.profits[myData.profits.length-1].value;
        let overallCapital = Number(myData.overallCapital);
        let _value = String(overallCapital + currentMoney);
        _value = _value.length >= 4 ? _value.slice(0,_value.length-3)+','+_value.slice(_value.length-3) : _value;
        return _value;
    },
    formatOverallRemain: function(){
        let currentMoney = myData.profits[myData.profits.length-1].value;
        let _value = String(currentMoney);
        if(currentMoney >= 0){
            this.setData({'overallRemainColor':true});
            _value = _value.length >= 4 ? '+' + _value.slice(0,_value.length-3)+','+_value.slice(_value.length-3) : _value;
        }else{
            _value = _value.length >= 4 ? _value.slice(0,_value.length-3)+','+_value.slice(_value.length-3) : _value;
        }
        return _value;
    },
    formatOverallProfit: function(){
        let currentMoney = myData.profits[myData.profits.length-1].value;
        let _value = String((Math.abs(currentMoney) / Number(myData.overallCapital) * 100).toFixed(2));
        _value = currentMoney > 0 ? '+' + _value + '%' : '-' + _value + '%';
        if(currentMoney >= 0){
            this.setData({'overallProfitColor':true});
        }
        return _value;
    },
    formatTotalIncome: function(){
        let currentMoney = myData.profits[myData.profits.length-1].value;
        let _value = String(currentMoney);
        if(currentMoney >= 0){
            this.setData({'totalIncomeColor':true});
            _value = _value.length >= 4 ? '+' + _value.slice(0,_value.length-3)+','+_value.slice(_value.length-3) : '+' + _value;
        }else{
            _value = _value.length >= 4 ? _value.slice(0,_value.length-3)+','+_value.slice(_value.length-3) : _value;
        }
        return _value;
    },
    formatOverallTodayNum:function(){
        let _value = String(myData.overallToday);
        if(myData.overallToday >= 0){
            this.setData({'overallTodayNumColor':true});
            _value = _value.length >= 4 ? '+' + _value.slice(0,_value.length-3)+','+_value.slice(_value.length-3) : '+' + _value;
        }else{
            _value = _value.length >= 4 ? _value.slice(0,_value.length-3)+','+_value.slice(_value.length-3) : _value;
        }
        return _value;
    },
    formatOverallCapitalNum:function(){
        let _value = String(myData.overallCapital);
        _value = _value.length >= 4 ? _value.slice(0,_value.length-3)+','+_value.slice(_value.length-3) : _value;
        return _value;
    },
    touchHandler: function (e) {
        lineChart.showToolTip(e, {
            // background: '#7cb5ec',
            format: function (item, category) {
                return category + ' ' + item.name + ':' + item.data 
            }
        });
    },    
    touchstart: function(e) {
        lineChart.scrollStart(e);
      },
    touchmove: function(e) {
        lineChart.scroll(e); 
    },
    touchend: function(e) {
        lineChart.scrollEnd(e);
    },
    createSimulationData: function () {
        var categories = [];
        var data = [];
        for (var i = 0; i < myData.profits.length; i++) {
            categories.push(myData.profits[i].date);
            data.push(myData.profits[i].value);
        }
        return {
            categories: categories,
            data: data
        }
    },
    onLoad: function (e) {
        this.initData();
        var windowWidth = 320;
        try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }
        
        var simulationData = this.createSimulationData();
        lineChart = new wxCharts({
            canvasId: 'lineCanvas',
            type: 'line',
            categories: simulationData.categories,
            // background: '#f5f5f5',
            series: [{
                name: '基金收益趋势',
                data: simulationData.data,
                format: function (val, name) {
                    return val.toFixed(2) + '万';
                }
            }],
            enableScroll:true,
            xAxis: {
                disableGrid: true,
                minInterval: 1,
                interval: 1
            },
            yAxis: {
                title: '篮彩基金收益 (元)',
                format: function (val) {
                    return val.toFixed(2);
                }
            },
            width: windowWidth,
            height: 210,
            dataLabel: false,
            dataPointShape: true,
            extra: {
                lineStyle: 'curve'
            }
        });
    }
});