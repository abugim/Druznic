(function () {
    var qtdPontos = 1200;
    var chartControle;
    var chartNivel;
    var ws = new WebSocket('ws://' + 'localhost:9002' + '/ws');

    var worker = new Worker('receiver.js');

    ws.onmessage = function(message) {
        console.log("got:'" + message.data + "'");

        var chartControle = $('#div_chart_um').highcharts();
        var chartNivel = $('#div_chart_dois').highcharts();

        var msg = message.data.split('|');
        var tempo = msg[0];
        var vetControle = msg[1].split(',');
        var vetNivel = msg[2].split(',');

        var i = 0;
        for (i = 0; i < chartControle.series.length; i++) {
            chartControle.series[i].addPoint([tempo, parseFloat(vetControle[i])], true, chartControle.series[i].data.length == qtdPontos);
        }
        for (i = 0; i < chartNivel.series.length; i++) {
            chartNivel.series[i].addPoint([tempo, parseFloat(vetNivel[i])], true, chartNivel.series[i].data.length == qtdPontos);
        }
    };

    function setMA() {
        chartControle.addSeries({
            name: 'Sinal Gerado',
            data: [],
            turboThreshold: qtdPontos});
        chartControle.addSeries({
            name: 'Sinal Saturado',
            data: [],
            turboThreshold: qtdPontos
        });

        chartNivel.addSeries({
            name: 'Nível 1',
            data: [],
            turboThreshold: qtdPontos
        });
        chartNivel.addSeries({
            name: 'Nível 2',
            data: [],
            turboThreshold: qtdPontos
        });
    }

    function setMF() {
        chartControle.addSeries({
            name: 'Erro',
            data: [],
            turboThreshold: qtdPontos
        });
        chartControle.addSeries({
            name: 'Erro Saturado',
            data: [],
            turboThreshold: qtdPontos
        });

        chartNivel.addSeries({
            name: 'Nível 1',
            data: [],
            turboThreshold: qtdPontos
        });
        chartNivel.addSeries({
            name: 'Nível 2',
            data: [],
            turboThreshold: qtdPontos
        });
        chartNivel.addSeries({
            name: 'Referência',
            data: [],
            turboThreshold: qtdPontos
        });
    }

    function setPID() {
        chartControle.addSeries({
            name: 'Erro',
            data: [],
            turboThreshold: qtdPontos
        });
        chartControle.addSeries({
            name: 'Ação Proporcional',
            data: [],
            turboThreshold: qtdPontos
        });
        chartControle.addSeries({
            name: 'Ação Integral',
            data: [],
            turboThreshold: qtdPontos
        });
        chartControle.addSeries({
            name: 'Ação Derivativa',
            data: [],
            turboThreshold: qtdPontos
        });
        chartControle.addSeries({
            name: 'Controle',
            data: [],
            turboThreshold: qtdPontos
        });
        chartControle.addSeries({
            name: 'Controle Saturado',
            data: [],
            turboThreshold: qtdPontos
        });

        chartNivel.addSeries({
            name: 'Nível 1',
            data: [],
            turboThreshold: qtdPontos
        });
        chartNivel.addSeries({
            name: 'Nível 2',
            data: [],
            turboThreshold: qtdPontos
        });
        chartNivel.addSeries({
            name: 'Referência',
            data: [],
            turboThreshold: qtdPontos
        });
    }

    function setPIDPID() {
        chartControle.addSeries({
            name: 'Sinal Gerado',
            data: [],
            turboThreshold: qtdPontos
        });
        chartControle.addSeries({
            name: 'Sinal Saturado',
            data: [],
            turboThreshold: qtdPontos
        });

        chartNivel.addSeries({
            name: 'Nível 1',
            data: [],
            turboThreshold: qtdPontos
        });
        chartNivel.addSeries({
            name: 'Nível 2',
            data: [],
            turboThreshold: qtdPontos
        });
    }

    function setOE() {
        chartControle.addSeries({
            name: 'Sinal Gerado',
            data: [],
            turboThreshold: qtdPontos
        });
        chartControle.addSeries({
            name: 'Sinal Saturado',
            data: [],
            turboThreshold: qtdPontos
        });

        chartNivel.addSeries({
            name: 'Nivel 1',
            data: [],
            turboThreshold: qtdPontos
        });
        chartNivel.addSeries({
            name: 'Nivel 2',
            data: [],
            turboThreshold: qtdPontos
        });
    }

    function setSR() {
        chartControle.addSeries({
            name: 'Sinal Gerado',
            data: [],
            turboThreshold: qtdPontos
        });
        chartControle.addSeries({
            name: 'Sinal Saturado',
            data: [],
            turboThreshold: qtdPontos
        });

        chartNivel.addSeries({
            name: 'Nivel 1',
            data: [],
            turboThreshold: qtdPontos
        });
        chartNivel.addSeries({
            name: 'Nivel 2',
            data: [],
            turboThreshold: qtdPontos
        });
    }

    var app = angular.module('controle', [ ]);

    app.factory('ConexaoParam', function () {
        return {
            ip: '10.13.99.69',
            porta: '20081',
            escrita: '0',
            canal_selected: [true, true, false, false, false, false, false, false]
        };
    });

    app.factory('ControleParam', function () {
        return {
            leitura_um: {
                id: '0',
                name: 'Canal 0'
            },
            leitura_dois: {
                id: '1',
                name: 'Canal 1'
            },
            onda: {
                tipo: '0',
                amp: 0,
                amp_sup: 0,
                amp_inf: 0,
                periodo: 0,
                periodo_sup: 0,
                periodo_inf: 0,
                offset: 0
            },
            ctrl_param: {
                tipo_ctrl: '0',
                params: ''
            }
        };
    });

    app.factory('PIDParam', function () {
        return {
            pid_selected: '0',
            kp: 0,
            ki: 0,
            ti: 0,
            kd: 0,
            td: 0
        };
    });

    app.controller('ConexaoController', function (ConexaoParam) {
        this.ip = ConexaoParam.ip;
        this.porta = ConexaoParam.porta;
        this.escrita = ConexaoParam.escrita;
        this.canal_selected = ConexaoParam.canal_selected;

        this.status = 'Desconectado';

        this.conectar = function () {
            var msg = '0 ' + this.ip + ' ' + this.porta;
            console.log('Conectar: ' + msg);
            ws.send(msg);
            setInterval(function(){
                ws.send(3);
            }, 100);
        }
    });

    app.controller('CtrlConfigController' ,function (ConexaoParam, ControleParam, PIDParam) {

        this.canal_selected = ConexaoParam.canal_selected;
        this.leitura_um = ControleParam.leitura_um;
        this.leitura_dois = ControleParam.leitura_dois;

        this.onda = ControleParam.onda;
        this.ctrl_param = ControleParam.ctrl_param;

        this.getOptions = function () {
            var selectedOptions = [ ];
            // console.log(this.canal_selected);
            for (var i = 0; i < this.canal_selected.length; i++) {
                if (this.canal_selected[i] && i != this.leitura_dois.id) {
                    selectedOptions.push({id: i, opt: "Canal " + i});
                }
            }
            return selectedOptions;
        }

        this.getOptions2 = function () {
            var selectedOptions = [ ];
            for (var i = 0; i < this.canal_selected.length; i++) {
                if (this.canal_selected[i] && i != this.leitura_um.id) {
                    selectedOptions.push({id: i, opt: "Canal " + i});
                }
            }
            return selectedOptions;
        }

        this.canalIsSelected = function (canal) {
            return canal_selected[canal];
        }

        this.selectCtrl = function (ctrlOpt) {
            this.ctrl_param.tipo_ctrl = ctrlOpt;
        };

        this.isCtrlSelected = function (ctrlOpt) {
            return this.ctrl_param.tipo_ctrl === ctrlOpt;
        }

        this.enviar = function () {
            var msg = '2 ' + this.leitura_um.id + ' ' + this.leitura_dois.id + ' ' + ConexaoParam.escrita;
            for (var param in this.onda) {
                if (this.onda.hasOwnProperty(param)) {
                    msg += ' ' + this.onda[param];
                }
            }

            for (var param in this.ctrl_param) {
                if (this.ctrl_param.hasOwnProperty(param)) {
                    msg += ' ' + this.ctrl_param[param];
                }
            }
            // Configurar series
            chartControle = $('#div_chart_um').highcharts();
            while (chartControle.series.length) {
                chartControle.series[0].remove();
            }

            chartNivel = $('#div_chart_dois').highcharts();
            while (chartNivel.series.length) {
                chartNivel.series[0].remove();
            }

            switch (this.ctrl_param.tipo_ctrl) {
                case 0:
                    setMA();
                    break;
                case 1:
                    setMF();
                    break;
                case 2:
                    this.ctrl_param.params = '' + PIDParam.kp +
                                                ' ' + PIDParam.ki +
                                                ' ' + PIDParam.kd +
                                                ' ' + (PIDParam.pid_selected == 4 ? 1 : 0);
                    setPID();
                    break;
                case 3:
                    setPIDPID();
                    break;
                case 4:
                    setOE();
                    break;
                case 5:
                    setSR();
                    break;
                default:
            }
            msg += this.ctrl_param.params;
            console.log('Enviar configurações: ' + msg);
            ws.send(msg);
        }

        this.secarTanque = function () {
            var msg = '' + this.leitura_um.id + ' ' + this.leitura_dois.id +' 2 0 0 0 0 0 0 0 0 0';
            console.log('Secar tanque: ' + msg);
            ws.send(msg);
        }
    });

    app.controller('OndaConfigController', function (ControleParam) {
        this.onda = ControleParam.onda;

        this.limparForm = function () {
            for (var param in ControleParam.onda) {
                if (ControleParam.onda.hasOwnProperty(param) && param != 'tipo') {
                    ControleParam.onda[param] = 0;
                }
            }
        }

        this.isOndaSelected = function (ondaOpt) {
            return this.onda.tipo === ondaOpt;
        }
    });

    app.controller('PIDConfigController', function (PIDParam) {
        this.pidParam = PIDParam;

        this.limparForm = function () {
            for (var param in this.pidParam) {
                if (this.pidParam.hasOwnProperty(param) && param != 'pid_selected') {
                    this.pidParam[param] = 0;
                }
            }
        }

        this.isPIDSelected = function (pidOpt) {
            return this.pidParam.pid_selected === pidOpt;
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
            animation: false, // don't animate in old IE
            marginRight: 10,
            events: {
                load: function () {
                    chartControle = this.series;
                }
            }
        },
        title: {
            text: 'Controle'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: 'Tensão (V)'
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
            enabled: true
        },
        exporting: {
            enabled: false
        }
    });
    $('#div_chart_dois').highcharts({
        chart: {
            type: 'spline',
            animation: false, // don't animate in old IE
            marginRight: 10,
            events: {
                load: function () {
                    chartNivel = this;
                }
            }
        },
        title: {
            text: 'Nível'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: 'Nível ()'
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
            enabled: true
        },
        exporting: {
            enabled: false
        }
    });

})();
