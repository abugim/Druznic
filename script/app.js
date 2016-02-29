(function () {
    var app = angular.module('controle', [ ]);

    app.controller('CtrlController', function () {
        this.ip = '10.13.99.69',
        this.porta = '20081',
        this.escrita = '0',
        this.leitura_um = '0',
        this.leitura_dois = '1',
        this.onda = {
            amp : 0,
            amp_sup : 0,
            amp_inf : 0,
            periodo : 0,
            periodo_sup : 0,
            periodo_inf : 0,
            offset : 0
        };
    });

    app.controller('CtrlConfigController' ,function () {
        this.selectCtrl = function (ctrlOpt) {
            this.ctrl = ctrlOpt;
        };

        this.isCtrlSelected = function (ctrlOpt) {
            return this.ctrl === ctrlOpt;
        }
    });

    app.controller('OndaConfigController', function () {
        this.selectOnda = function (ondaOpt) {
            this.onda = ondaOpt;
        }

        this.isOndaSelected = function (ondaOpt) {
            return this.onda === ondaOpt;
        }
    });

    var menuOpen = false;
    var controle = "";

    $('.controle').click(function(event){
        //console.log($(this).attr('value'));
        if (menuOpen) {
            if (controle == $(this).attr('value')) {
                $('#div_menu').slideUp("slow");
                menuOpen = false;
            } else {
                controle = $(this).attr('value');
            }
        } else {
            $('#div_menu').slideDown("slow");
            menuOpen = true;
            controle = $(this).attr('value');
        }
    });

    $('#btn_open_connect').click(function(){
        $('#div_conf_connect').animate({width: 'toggle'});
    });
    $('#btn_connect').click(function(){
        $('#div_conf_connect').animate({width: 'toggle'});
    });

    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

    $('#div_chart_um').highcharts({
        chart: {
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            events: {
                load: function () {

                    // set up the updating of the chart each second
                    var series = this.series[0];
                    setInterval(function () {
                        var x = (new Date()).getTime(), // current time
                            y = Math.random();
                        series.addPoint([x, y], true, true);
                    }, 1000);
                }
            }
        },
        title: {
            text: 'Live random data'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: 'Value'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                    Highcharts.numberFormat(this.y, 2);
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: 'Random data',
            data: (function () {
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;

                for (i = -19; i <= 0; i += 1) {
                    data.push({
                        x: time + i * 1000,
                        y: Math.random()
                    });
                }
                return data;
            }())
        }]
    });
    $('#div_chart_dois').highcharts({
        chart: {
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            events: {
                load: function () {

                    // set up the updating of the chart each second
                    var series = this.series[0];
                    setInterval(function () {
                        var x = (new Date()).getTime(), // current time
                            y = Math.random();
                        series.addPoint([x, y], true, true);
                    }, 100);
                }
            }
        },
        title: {
            text: 'Live random data'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: 'Value'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                    Highcharts.numberFormat(this.y, 2);
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: 'Random data',
            data: (function () {
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;

                for (i = -999; i <= 0; i += 1) {
                    data.push({
                        x: time + i * 100,
                        y: Math.random()
                    });
                }
                return data;
            }())
        }]
    });

})();
