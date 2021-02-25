var app = getApp();
var myData = require('../../data/mydata.js');
Page({
    data: {
        myData:[],
        totalIncome:'',
        totalIncomeColor:false
    },
    initData: function(){
        let _right = 0,
            _value = 0,
            _isEarn = false,
            newArr = [];
        for(let i = myData.profits.length - 1;i >= 1;i--){
            _value = myData.profits[i].value - myData.profits[i-1].value;
            _right = Math.floor(Math.abs(_value) / 30);
            _isEarn = _value > 0 ? true : false;
            _value = String(Math.abs(_value));
            _value = _value.length >= 4 ? _value.slice(0,_value.length-3)+','+_value.slice(_value.length-3) : _value;
            newArr.push({
                date:myData.profits[i].date,
                value:_isEarn ? '+' + _value : '-' + _value,
                right:_right >= 20 ? _right : 20,
                isEarn:_isEarn
            })
        }
        this.setData({
            'myData':newArr,
            'totalIncome':this.formatTotalIncome()
        })
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
    onLoad: function (e) {
        this.initData();
    }
});