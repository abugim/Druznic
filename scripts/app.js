(function() {
    var qtdPontos = 50000;
    var chartControle;
    var chartNivel;
    var ws = new WebSocket('ws://localhost:9002/ws');
    var freeze_global = {freeze: false};
    var isConectado = false;

    function pedirEstado() {
        setTimeout(function() {
            ws.send(3);
            pedirEstado();
        }, 100);
    }

    ws.onmessage = function(message) {
        //console.log("got:'" + message.data + "'");

        var chartControle = $('#div_chart_um').highcharts();
        var chartNivel = $('#div_chart_dois').highcharts();
        //console.log('Message: ' + message.data);
        if (message.data != "" && !(message.data.match(/^\s+$/))) {
            var estados = message.data.split(';');
            var n1, n2;
            for (estado of estados) {
                if (estado.length != 0) {
                    var est = estado.split('|');

                    var tempo = est[0] * 1000;
                    var vetControle = est[1].split(',');
                    var vetNivel = est[2].split(',');
                    var vetAnalise;
                    if (est.length == 4 && est[3] != '') {
                        vetAnalise = est[3].split(',');
                        console.log(vetAnalise);
                    }
                    n1 = vetNivel[0];
                    n2 = vetNivel[1];
                    var i = 0;
                    for (i = 0; i < chartControle.series.length; i++) {
                        chartControle.series[i].addPoint({x: tempo, y: parseFloat(vetControle[i])}, false, (chartControle.series[i].data.length > 1200), false);
                    }
                    for (i = 0; i < chartNivel.series.length; i++) {
                        chartNivel.series[i].addPoint({x: tempo, y: parseFloat(vetNivel[i])}, false, (chartNivel.series[i].data.length > 1200), false);
                    }

                    // console.log(chartControle.xAxis);
                    if (chartControle.xAxis[0].min && chartControle.series[0].data.length > 1200) {
                        delete chartControle.xAxis[0].min;
                        delete chartNivel.xAxis[0].min;
                    } else {
                        chartControle.xAxis.min = 0;
                        chartNivel.xAxis.min = 0;
                    }

                    if (Array.isArray(vetAnalise) && vetAnalise.length != 0) {
                        var dadosVisuais = 'Nível 1: ' + n1 + '\tNível 2: ' + n2;
                        if (vetAnalise[0] == 1) {
                            dadosVisuais += '\tTempo de pico: ' + vetAnalise[1];
                        }
                        if (vetAnalise[2] == 1) {
                            dadosVisuais += '\tSobre sinal: ' + vetAnalise[3];
                        }
                        if (vetAnalise[4] == 1) {
                            dadosVisuais += '\tTempo de subida: ' + vetAnalise[5];
                        }
                        if (vetAnalise[6] == 1) {
                            dadosVisuais += '\tTempo de acomodação: ' + vetAnalise[7];
                        }
                        if (vetAnalise[8] == 1) {
                            dadosVisuais += '\tErro de Regime: ' + vetAnalise[9];
                        }

                    }
                    $('#div_stat').html(dadosVisuais);

                }
            }

            if (!freeze_global.freeze){
                chartControle.redraw();
                chartNivel.redraw();
            }
        }
    };

    function setMA() {
        chartControle.addSeries({
            name: 'Sinal Gerado',
            tooltip: {
                enabled: false
            },
            marker: {
                enabled: false
            },
            shadow: false,
            data: [],
            turboThreshold: qtdPontos
        });
        chartControle.addSeries({
            name: 'Sinal Saturado',
            tooltip: {
                enabled: false
            },
            marker: {
                enabled: false
            },
            shadow: false,
            data: [],
            turboThreshold: qtdPontos
        });

        chartNivel.addSeries({
            name: 'Nível 1',
            tooltip: {
                enabled: false
            },
            marker: {
                enabled: false
            },
            shadow: false,
            data: [],
            turboThreshold: qtdPontos
        });
        chartNivel.addSeries({
            name: 'Nível 2',
            tooltip: {
                enabled: false
            },
            marker: {
                enabled: false
            },
            shadow: false,
            data: [],
            turboThreshold: qtdPontos
        });
    }

    function setMF() {
        chartControle.addSeries({
            name: 'Erro',
            tooltip: {
                enabled: false
            },
            marker: {
                enabled: false
            },
            shadow: false,
            data: [],
            turboThreshold: qtdPontos
        });
        chartControle.addSeries({
            name: 'Controle Saturado',
            tooltip: {
                enabled: false
            },
            marker: {
                enabled: false
            },
            shadow: false,
            data: [],
            turboThreshold: qtdPontos
        });

        chartNivel.addSeries({
            name: 'Nível 1',
            tooltip: {
                enabled: false
            },
            marker: {
                enabled: false
            },
            shadow: false,
            data: [],
            turboThreshold: qtdPontos
        });
        chartNivel.addSeries({
            name: 'Nível 2',
            tooltip: {
                enabled: false
            },
            marker: {
                enabled: false
            },
            shadow: false,
            data: [],
            turboThreshold: qtdPontos
        });
        chartNivel.addSeries({
            name: 'Referência',
            tooltip: {
                enabled: false
            },
            marker: {
                enabled: false
            },
            shadow: false,
            data: [],
            turboThreshold: qtdPontos
        });
    }

    function setPID() {
        chartControle.addSeries({
            name: 'Erro',
            tooltip: {
                enabled: false
            },
            marker: {
                enabled: false
            },
            shadow: false,
            data: [],
            turboThreshold: qtdPontos
        });
        chartControle.addSeries({
            name: 'Ação Proporcional',
            tooltip: {
                enabled: false
            },
            marker: {
                enabled: false
            },
            shadow: false,
            data: [],
            turboThreshold: qtdPontos
        });
        chartControle.addSeries({
            name: 'Ação Integral',
            tooltip: {
                enabled: false
            },
            marker: {
                enabled: false
            },
            shadow: false,
            data: [],
            turboThreshold: qtdPontos
        });
        chartControle.addSeries({
            name: 'Ação Derivativa',
            tooltip: {
                enabled: false
            },
            marker: {
                enabled: false
            },
            shadow: false,
            data: [],
            turboThreshold: qtdPontos
        });
        chartControle.addSeries({
            name: 'Controle',
            tooltip: {
                enabled: false
            },
            marker: {
                enabled: false
            },
            shadow: false,
            data: [],
            turboThreshold: qtdPontos
        });
        chartControle.addSeries({
            name: 'Controle Saturado',
            tooltip: {
                enabled: false
            },
            marker: {
                enabled: false
            },
            shadow: false,
            data: [],
            turboThreshold: qtdPontos
        });

        chartNivel.addSeries({
            name: 'Nível 1',
            tooltip: {
                enabled: false
            },
            marker: {
                enabled: false
            },
            shadow: false,
            data: [],
            turboThreshold: qtdPontos
        });
        chartNivel.addSeries({
            name: 'Nível 2',
            tooltip: {
                enabled: false
            },
            marker: {
                enabled: false
            },
            shadow: false,
            data: [],
            turboThreshold: qtdPontos
        });
        chartNivel.addSeries({
            name: 'Referência',
            tooltip: {
                enabled: false
            },
            marker: {
                enabled: false
            },
            shadow: false,
            data: [],
            turboThreshold: qtdPontos
        });
    }

    function setPIDPID() {
        chartControle.addSeries({
            name: 'Erro M.',
            tooltip: {
                enabled: false
            },
            marker: {
                enabled: false
            },
            shadow: false,
            data: [],
            turboThreshold: qtdPontos
        });
        chartControle.addSeries({
            name: 'Ação P. M.',
            tooltip: {
                enabled: false
            },
            marker: {
                enabled: false
            },
            shadow: false,
            data: [],
            turboThreshold: qtdPontos
        });
        chartControle.addSeries({
            name: 'Ação I. M.',
            tooltip: {
                enabled: false
            },
            marker: {
                enabled: false
            },
            shadow: false,
            data: [],
            turboThreshold: qtdPontos
        });
        chartControle.addSeries({
            name: 'Ação D. M.',
            tooltip: {
                enabled: false
            },
            marker: {
                enabled: false
            },
            shadow: false,
            data: [],
            turboThreshold: qtdPontos
        });
        chartControle.addSeries({
            name: 'Controle M.',
            tooltip: {
                enabled: false
            },
            marker: {
                enabled: false
            },
            shadow: false,
            data: [],
            turboThreshold: qtdPontos
        });
        chartControle.addSeries({
            name: 'Erro E.',
            tooltip: {
                enabled: false
            },
            marker: {
                enabled: false
            },
            shadow: false,
            data: [],
            turboThreshold: qtdPontos
        });
        chartControle.addSeries({
            name: 'Ação P. E.',
            tooltip: {
                enabled: false
            },
            marker: {
                enabled: false
            },
            shadow: false,
            data: [],
            turboThreshold: qtdPontos
        });
        chartControle.addSeries({
            name: 'Ação I. E.',
            tooltip: {
                enabled: false
            },
            marker: {
                enabled: false
            },
            shadow: false,
            data: [],
            turboThreshold: qtdPontos
        });
        chartControle.addSeries({
            name: 'Ação D. E.',
            tooltip: {
                enabled: false
            },
            marker: {
                enabled: false
            },
            shadow: false,
            data: [],
            turboThreshold: qtdPontos
        });
        chartControle.addSeries({
            name: 'Controle E.',
            tooltip: {
                enabled: false
            },
            marker: {
                enabled: false
            },
            shadow: false,
            data: [],
            turboThreshold: qtdPontos
        });
        chartControle.addSeries({
            name: 'Controle Saturado',
            tooltip: {
                enabled: false
            },
            marker: {
                enabled: false
            },
            shadow: false,
            data: [],
            turboThreshold: qtdPontos
        });

        chartNivel.addSeries({
            name: 'Nível 1',
            tooltip: {
                enabled: false
            },
            marker: {
                enabled: false
            },
            shadow: false,
            data: [],
            turboThreshold: qtdPontos
        });
        chartNivel.addSeries({
            name: 'Nível 2',
            tooltip: {
                enabled: false
            },
            marker: {
                enabled: false
            },
            shadow: false,
            data: [],
            turboThreshold: qtdPontos
        });
        chartNivel.addSeries({
            name: 'Referência',
            tooltip: {
                enabled: false
            },
            marker: {
                enabled: false
            },
            shadow: false,
            data: [],
            turboThreshold: qtdPontos
        });
    }

    function setOE() {
        chartControle.addSeries({
            name: 'Sinal Gerado',
            tooltip: {
                enabled: false
            },
            marker: {
                enabled: false
            },
            shadow: false,
            data: [],
            turboThreshold: qtdPontos
        });
        chartControle.addSeries({
            name: 'Sinal Saturado',
            tooltip: {
                enabled: false
            },
            marker: {
                enabled: false
            },
            shadow: false,
            data: [],
            turboThreshold: qtdPontos
        });

        chartNivel.addSeries({
            name: 'Nível 1',
            tooltip: {
                enabled: false
            },
            marker: {
                enabled: false
            },
            shadow: false,
            data: [],
            turboThreshold: qtdPontos
        });
        chartNivel.addSeries({
            name: 'Nível 2',
            tooltip: {
                enabled: false
            },
            marker: {
                enabled: false
            },
            shadow: false,
            data: [],
            turboThreshold: qtdPontos
        });
        chartNivel.addSeries({
            name: 'Nível 1 Estimado',
            tooltip: {
                enabled: false
            },
            marker: {
                enabled: false
            },
            shadow: false,
            data: [],
            turboThreshold: qtdPontos
        });
        chartNivel.addSeries({
            name: 'Nível 2 Estimado',
            tooltip: {
                enabled: false
            },
            marker: {
                enabled: false
            },
            shadow: false,
            data: [],
            turboThreshold: qtdPontos
        });
    }

    function setSR() {
        chartControle.addSeries({
            name: 'Sinal Gerado',
            tooltip: {
                enabled: false
            },
            marker: {
                enabled: false
            },
            shadow: false,
            data: [],
            turboThreshold: qtdPontos
        });
        chartControle.addSeries({
            name: 'Sinal Saturado',
            tooltip: {
                enabled: false
            },
            marker: {
                enabled: false
            },
            shadow: false,
            data: [],
            turboThreshold: qtdPontos
        });

        chartNivel.addSeries({
            name: 'Nível 1',
            tooltip: {
                enabled: false
            },
            marker: {
                enabled: false
            },
            shadow: false,
            data: [],
            turboThreshold: qtdPontos
        });
        chartNivel.addSeries({
            name: 'Nível 2',
            tooltip: {
                enabled: false
            },
            marker: {
                enabled: false
            },
            shadow: false,
            data: [],
            turboThreshold: qtdPontos
        });
    }

    function limparTudo() {
        // parar timeout
        chartControle = $('#div_chart_um').highcharts();
        while (chartControle.series.length) {
            chartControle.series[0].remove();
        }

        chartNivel = $('#div_chart_dois').highcharts();
        while (chartNivel.series.length) {
            chartNivel.series[0].remove();
        }
    }

    var app = angular.module('controle', ['diretivas']);

    app.factory('ConexaoParam', function() {
        return {
            ip: '127.0.0.1',
            porta: '20081',
            escrita: '0',
            canal_selected: [true, true, false, false, false, false, false, false]
        };
    });

    app.factory('ControleParam', function() {
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
                faixaSubida: '0',
                faixaAcomodacao: '0.02',
                unidadeSobressinal: '0',
                flagVarControle: '0',
                params: ''
            }
        };
    });

    app.factory('PIDParam', function() {
        return {
            pid_selected: '0',
            filtro: '0',
            kp: 0,
            ki: 0,
            ti: 0,
            kd: 0,
            td: 0,
            talt: 0
        };
    });

    app.factory('PIDParamMestre', function() {
        return {
            pid_selected: '0',
            filtro: '0',
            kp: 0,
            ki: 0,
            ti: 0,
            kd: 0,
            td: 0,
            talt: 0
        };
    });

    app.factory('OEParam', function() {
        return {
            polos: {
                x: [0, 0],
                y: [0, 0]
            },
            L: [[0], [0]]
        };
    });

    app.controller('ConexaoController', function(ConexaoParam) {
        this.ip = ConexaoParam.ip;
        this.porta = ConexaoParam.porta;
        this.escrita = ConexaoParam.escrita;
        this.canal_selected = ConexaoParam.canal_selected;

        this.status = 'Desconectado';
        this.txtConectar = 'Conectar';

        this.conectar = function() {
            if (isConectado) {
                this.status = 'Desconectado';
                this.txtConectar = 'Conectar';
                var msg = '1';
                console.log('Conectar: ' + msg);
                ws.send(msg);
            } else {
                this.status = 'Conectado';
                this.txtConectar = 'Desconectar';
                var msg = '0 ' + this.ip + ' ' + this.porta;
                console.log('Conectar: ' + msg);
                ws.send(msg);
            }
            isConectado = !isConectado;
        }
    });

    app.controller('CtrlConfigController', function(ConexaoParam, ControleParam, PIDParam, PIDParamMestre, OEParam) {

        this.canal_selected = ConexaoParam.canal_selected;
        this.leitura_um = ControleParam.leitura_um;
        this.leitura_dois = ControleParam.leitura_dois;

        this.onda = ControleParam.onda;
        this.ctrl_param = ControleParam.ctrl_param;

        this.lastN1;
        this.lastN2;

        this.freeze = freeze_global;

        this.getOptions = function() {
            var selectedOptions = [];
            // console.log(this.canal_selected);
            for (var i = 0; i < this.canal_selected.length; i++) {
                if (this.canal_selected[i] && i != this.leitura_dois.id) {
                    selectedOptions.push({
                        id: i,
                        opt: "Canal " + i
                    });
                }
            }
            return selectedOptions;
        }

        this.getOptions2 = function() {
            var selectedOptions = [];
            for (var i = 0; i < this.canal_selected.length; i++) {
                if (this.canal_selected[i] && i != this.leitura_um.id) {
                    selectedOptions.push({
                        id: i,
                        opt: "Canal " + i
                    });
                }
            }
            return selectedOptions;
        }

        this.canalIsSelected = function(canal) {
            return canal_selected[canal];
        }

        this.selectCtrl = function(ctrlOpt) {
            this.ctrl_param.tipo_ctrl = ctrlOpt;
            if (ctrlOpt == 4) {
                this.onda.tipo = '0';
                this.onda.amp = 15;
                this.ctrl_param.flagVarControle = '1';
            }
        };

        this.isCtrlSelected = function(ctrlOpt) {
            return this.ctrl_param.tipo_ctrl === ctrlOpt;
        }

        this.enviar = function() {
            var msg = '2 ' + this.leitura_um.id +
            ' ' + this.leitura_dois.id +
            ' ' + ConexaoParam.escrita;

            for (var param in this.onda) {
                if (this.onda.hasOwnProperty(param)) {
                    msg += ' ' + this.onda[param];
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

            msg += ' ' + this.ctrl_param.tipo_ctrl +
                    ' ' + this.ctrl_param.flagVarControle +
                    ' ' + this.ctrl_param.faixaSubida +
                    ' ' + this.ctrl_param.faixaAcomodacao +
                    ' ' + this.ctrl_param.unidadeSobressinal;
            switch (this.ctrl_param.tipo_ctrl) {
                case 0:
                setMA();
                break;
                case 1:
                setMF();
                break;
                case 2:
                this.ctrl_param.params = ' ' + PIDParam.kp +
                ' ' + PIDParam.ki +
                ' ' + PIDParam.kd +
                ' ' + (PIDParam.pid_selected == 4 ? 1 : 0) +
                ' ' + PIDParam.filtro +
                ' ' + PIDParam.talt;
                setPID();
                break;
                case 3:
                this.ctrl_param.params = ' ' + PIDParamMestre.kp +
                ' ' + PIDParamMestre.ki +
                ' ' + PIDParamMestre.kd +
                ' ' + (PIDParamMestre.pid_selected == 4 ? 1 : 0) +
                ' ' + PIDParamMestre.filtro +
                ' ' + PIDParamMestre.talt +
                ' ' + PIDParam.kp +
                ' ' + PIDParam.ki +
                ' ' + PIDParam.kd +
                ' ' + (PIDParam.pid_selected == 4 ? 1 : 0) +
                ' ' + PIDParam.filtro +
                ' ' + PIDParam.talt;
                setPIDPID();
                break;
                case 4:
                this.ctrl_param.params = ' ' + OEParam.L[0][0] +
                ' ' + OEParam.L[0][1];
                setOE();
                break;
                case 5:
                setSR();
                break;
                default:
                limparTudo();
            }
            msg += this.ctrl_param.params;
            console.log('Enviar configurações: ' + msg);
            setTimeout(pedirEstado(), 100);
            ws.send(msg);
        }

        this.atualizar = function () {
            var msg = '4 ' + this.leitura_um.id +
            ' ' + this.leitura_dois.id +
            ' ' + ConexaoParam.escrita;

            for (var param in this.onda) {
                if (this.onda.hasOwnProperty(param)) {
                    msg += ' ' + this.onda[param];
                }
            }

            msg += ' ' + this.ctrl_param.tipo_ctrl;

            switch (this.ctrl_param.tipo_ctrl) {
                case 2:
                this.ctrl_param.params = ' ' + PIDParam.kp +
                ' ' + PIDParam.ki +
                ' ' + PIDParam.kd +
                ' ' + (PIDParam.pid_selected == 4 ? 1 : 0) +
                ' ' + PIDParam.filtro +
                ' ' + PIDParam.talt;
                break;
                case 3:
                this.ctrl_param.params = ' ' + PIDParamMestre.kp +
                ' ' + PIDParamMestre.ki +
                ' ' + PIDParamMestre.kd +
                ' ' + (PIDParamMestre.pid_selected == 4 ? 1 : 0) +
                ' ' + PIDParamMestre.filtro +
                ' ' + PIDParamMestre.talt
                ' ' + PIDParam.kp +
                ' ' + PIDParam.ki +
                ' ' + PIDParam.kd +
                ' ' + (PIDParam.pid_selected == 4 ? 1 : 0) +
                ' ' + PIDParam.filtro +
                ' ' + PIDParam.talt;
                break;
                case 4:
                this.ctrl_param.params = ' ' + OEParam.L[0][0] +
                ' ' + OEParam.L[0][1];
                break;
                case 5:
                break;
                default:
            }
            msg += this.ctrl_param.params;
            console.log('Enviar configurações: ' + msg);
            ws.send(msg);
        }

        this.secarTanque = function() {
            this.selectCtrl(-1);
            limparTudo();
            var msg = '2 ' + this.leitura_um.id + ' ' + this.leitura_dois.id + ' ' + ConexaoParam.escrita + ' 0 0 0 0 0 0 0 0';
            console.log('Secar tanque: ' + msg);
            ws.send(msg);
        }
    });

    app.controller('OndaConfigController', function(ControleParam) {
        this.onda = ControleParam.onda;

        this.limparForm = function() {
            for (var param in ControleParam.onda) {
                if (ControleParam.onda.hasOwnProperty(param) && param != 'tipo') {
                    ControleParam.onda[param] = 0;
                }
            }
        }

        this.isOndaSelected = function(ondaOpt) {
            return this.onda.tipo === ondaOpt;
        }
    });

    app.controller('PIDConfigController', function(PIDParam) {
        this.pidParam = PIDParam;

        this.atualizarParam = function () {
            if (this.pidParam.kp != 0){
                this.atualizarParamTI();
                this.atualizarParamKI();
                this.atualizarParamTD();
                this.atualizarParamKD();
                this.atualizarParamTalt();
            }
        }

        this.atualizarParamTI = function () {
            if (this.pidParam.kp != 0 && this.pidParam.ki != 0) {
                this.pidParam.ti= this.pidParam.kp / this.pidParam.ki;
            } else {
                this.pidParam.ti = 0;
            }
        }

        this.atualizarParamKI = function () {
            if (this.pidParam.kp != 0 && this.pidParam.ki != 0) {
                this.pidParam.ki = this.pidParam.kp / this.pidParam.ti;
            } else {
                this.pidParam.ki = 0;
            }
        }

        this.atualizarParamTD = function () {
            if (this.pidParam.kp != 0 && this.pidParam.kd != 0) {
                this.pidParam.td = this.pidParam.kd / this.pidParam.kp;
            } else {
                this.pidParam.td = 0;
            }
        }

        this.atualizarParamKD = function () {
            if (this.pidParam.kp != 0 && this.pidParam.ti != 0) {
                this.pidParam.kd = this.pidParam.kp * this.pidParam.td;
            } else {
                this.pidParam.kd = 0;
            }
        }

        this.atualizarParamTalt = function () {
            if (this.pidParam.kd == 0) {
                this.pidParam.talt = Math.sqrt(1/this.pidParam.ki);
            } else {
                this.pidParam.talt = Math.sqrt(this.pidParam.kd/this.pidParam.ki);
            }
        }

        this.limparForm = function() {
            for (var param in this.pidParam) {
                if (this.pidParam.hasOwnProperty(param) && param != 'pid_selected') {
                    this.pidParam[param] = 0;
                }
            }
        }

        this.isPIDSelected = function(pidOpt) {
            return this.pidParam.pid_selected === pidOpt;
        }
    });

    app.controller('PidCascataController', function(PIDParam, PIDParamMestre) {
        this.pidMestre = PIDParamMestre;
        this.pidEscravo = PIDParam;

        this.isPIDSelected = function(pid, pidOpt) {
            return pid.pid_selected === pidOpt;
        };

        this.atualizarParam = function (pid) {
            if (this.kp != 0){
                this.atualizarParamTI(pid);
                this.atualizarParamKI(pid);
                this.atualizarParamTD(pid);
                this.atualizarParamKD(pid);
                this.atualizarParamTalt(pid);
            }
        };

        this.atualizarParamTI = function (pid) {
            if (pid.kp != 0 && pid.ki != 0) {
                pid.ti= pid.kp / pid.ki;
            } else {
                pid.ti = 0;
            }
        };

        this.atualizarParamKI = function (pid) {
            if (pid.kp != 0 && pid.ki != 0) {
                pid.ki = pid.kp / pid.ti;
            } else {
                pid.ki = 0;
            }
        };

        this.atualizarParamTD = function (pid) {
            if (pid.kp != 0 && pid.kd != 0) {
                pid.td = pid.kd / pid.kp;
            } else {
                pid.td = 0;
            }
        };
        this.atualizarParamKD = function (pid) {
            if (pid.kp != 0 && pid.ti != 0) {
                pid.kd = pid.kp * pid.td;
            } else {
                pid.kd = 0;
            }
        };

        this.atualizarParamTalt = function (pid) {
            if (pid.kd == 0) {
                pid.talt = Math.sqrt(1/pid.ki);
            } else {
                pid.talt = Math.sqrt(pid.kd/pid.ki);
            }
        };

        this.limparForm = function(pid) {
            for (var param in pid) {
                if (pid.hasOwnProperty(param) && param != 'pid_selected' && param != 'filtro') {
                    pid[param] = 0;
                }
            }
        };
    });

    app.controller('OEController', function(OEParam) {
        this.polos = OEParam.polos;
        this.L = OEParam.L;
        this.img = false;
        this.realDiff = false;


        this.calcularL = function() {
            if (this.polos.x[0] != '' && this.polos.x[1] != '' &&
                this.polos.y[0] != '' && this.polos.y[1] != '' &&
                !isNaN(this.polos.x[0]) && !isNaN(this.polos.x[1]) &&
                !isNaN(this.polos.y[0]) && !isNaN(this.polos.y[1])) {
                this.L = L(this.polos);
                // this.checarPolos();
            }
        };

        this.calcularPolos = function() {
            if (this.L[0][0] != '' && this.L[1][0] != '' &&
                !isNaN(this.L[0][0]) && !isNaN(this.L[1][0])) {
                this.polos = polos(this.L);
                console.log(this.polos);
                this.polos.x[0] = - this.polos.x[0];
                this.polos.x[1] = - this.polos.x[1];
                this.polos.y[0] = Math.abs(this.polos.y[0]);
                this.polos.y[1] = Math.abs(this.polos.y[1]);
                if (typeof(this.polos.y) == 'undefined') {
                    this.polos.y = [0, 0];
                }
                console.log(this.polos);
                // this.checarPolos();
            }
        };

        this.checarPolos = function(polo) {
            if (Math.sqrt(Math.pow(this.polos.x[0], 2) + Math.pow(this.polos.y[0], 2)) < 1 &&
                Math.sqrt(Math.pow(this.polos.x[1], 2) + Math.pow(this.polos.y[1], 2)) < 1) {
                    console.log('in');
                $('#div_oe').addClass('in').removeClass('out');
            } else {
                console.log('out');
                $('#div_oe').addClass('out').removeClass('in');
            }
            if (this.polos.x[0] != this.polos.x[1] && this.polos.x[0] != 0 && this.polos.x[1] != 0) {
                this.realDiff = true;
                this.polos.y = [0, 0];
            } else {
                this.realDiff = false;
                if (this.polos.y[polo] != 0) {
                    this.polos.x[(polo + 1) % 2] = this.polos.x[polo];
                    this.polos.y[(polo + 1) % 2] = this.polos.y[polo];
                }
            }
        };
    });

    var menuOpen = false;
    var controle = "";

    $('.controle').click(function(event) {
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

    $('#btn_open_connect').click(function() {
        $('#div_conf_connect').animate({
            width: 'toggle'
        });
    });
    $('#btn_connect').click(function() {
        $('#div_conf_connect').animate({
            width: 'toggle'
        });
    });

    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

    $('#div_chart_um').highcharts({
        chart: {
            type: 'line',
            animation: false,
            marginRight: 10,
            events: {
                load: function() {
                    chartControle = this.series;
                }
            }
        },
        title: {
            text: 'Controle'
        },
        xAxis: {
            type: 'datetime',
            floor: 0,
            minRange: 120000,
            dateTimeLabelFormats: {
                millisecond: '%M:%S',
                second: '%M:%S',
                minute: '%M:%S'
            },
            units: [[
                'second',
                [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
            ]],
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: 'Tensão (V)'
            },
            minRange: 4,
            startOnTick: true,
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            enabled: false
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
            type: 'line',
            animation: false,
            marginRight: 10,
            events: {
                load: function() {
                    chartNivel = this;
                }
            }
        },
        title: {
            text: 'Nível'
        },
        xAxis: {
            type: 'datetime',
            floor: 0,
            minRange: 120000,
            dateTimeLabelFormats: {
                millisecond: '%M:%S',
                second: '%M:%S',
                minute: '%M:%S'
            },
            units: [[
                'second',
                [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
            ]],
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: 'Nível (cm)'
            },
            max: 30,
            min: 0,
            // minRange: 30,
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            enabled: false
        },
        legend: {
            enabled: true
        },
        exporting: {
            enabled: false
        }
    });

})();
