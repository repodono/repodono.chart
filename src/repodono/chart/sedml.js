'use strict';


var Chart = require('Chart');
var Client = require('repodono/jobs/client').Client;


var default_kwargs = {
    'id_status': 'status',
    'id_render': 'render',
};

var ChartClient = function(kwargs) {
    Client.call(this, kwargs);
    for (var key in default_kwargs) {
        this[key] = kwargs && kwargs[key] || default_kwargs[key];
    }
};
ChartClient.prototype = Object.create(Client.prototype);
ChartClient.prototype.constructor = ChartClient;


ChartClient.prototype.set_status_msg = function(state, msg) {
    document.getElementById(this.id_status).innerHTML = state + ': ' + msg;
};


ChartClient.prototype.generate_request = function(xhr) {
    document.getElementById(this.id_status).innerHTML = '';
    document.getElementById(this.id_render).innerHTML = '';
    xhr.setRequestHeader(
        'Content-Type', 'application/x-www-form-urlencoded');
    // XXX the identifiers will need to be confirmed...
    // XXX this chart client MUST take an argument that execute this
    return 'sedml_url=' + encodeURI(
        document.forms['sedml_form']['sedml_url'].value);
};


ChartClient.prototype.response_job_success = function(poll_url, keys) {
    var self = this;
    keys.forEach(function (plot) {
        var plot_url = poll_url + '/' + plot;
        var canvas = document.createElement('canvas');
        document.getElementById(self.id_render).appendChild(canvas);
        self.render(canvas, plot_url);
    });
};


ChartClient.prototype.render = function(canvas, plot_url) {
    var after = function(obj) {
        var kwargs = {
            'type': 'line',
            'options': {
                'scales': {'xAxes': [{'type': 'linear', position: 'bottom'}]}
            },
            'data': obj,
        };
        new Chart(canvas, kwargs);
    };

    var before = function (xhr) {
        xhr.open('GET', plot_url);
    };

    this.raw_request(before, after);
};


exports.ChartClient = ChartClient;
