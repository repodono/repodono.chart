'use strict';

window.mocha.setup('bdd');

var utils = require('nunja/utils');
var sedml = require('repodono/chart/sedml');


describe('repodono/chart/sedml base test cases', function() {

    var $ = utils.$;

    beforeEach(function() {
        this.clock = sinon.useFakeTimers();
        this.server = sinon.fakeServer.create();
        this.server.autoRespond = true;
        // create default form
        document.body.innerHTML = [
            '<form id="sedml_form">',
            '<input id="sedml_url" name="sedml_url"/>',
            '<button name="run">Run</button>',
            '</form>',
            '<div id="status"></div>',
            '<div id="render"></div>',
        ].join('\n');
    });

    afterEach(function() {
        document.body.innerHTML = '';
        this.server.restore();
        this.clock.restore();
    });

    it('base ChartClient', function() {
        var cli = new sedml.ChartClient();
        expect(cli.id_render).to.equal('render');
        expect(cli.id_status).to.equal('status');
    });

    it('set_status_msg', function() {
        var cli = new sedml.ChartClient();
        cli.set_status_msg('status', 'good');
        expect($('#status')[0].innerHTML).to.equal('status: good');
    });

    it('generate_request', function() {
        $('#sedml_url')[0].value = 'http://example.com/file.sedml';
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/', true);
        var cli = new sedml.ChartClient();
        var data = cli.generate_request(xhr);
        expect(data).to.equal('sedml_url=http://example.com/file.sedml');
    });

    it('response_job_success', function() {
        var headers = {'Content-Type': 'application/json'};
        this.server.respondWith('GET', '/poll/1/plot1.json', function (xhr) {
            xhr.respond(200, headers, JSON.stringify({
                "datasets": [{
                    "data": [
                        {"x" : 0, "y" : 0},
                        {"x" : 1, "y" : 2},
                        {"x" : 2, "y" : 4},
                        {"x" : 3, "y" : 6}
                    ],
                    "dgIdX" : "xDataGenerator1_1",
                    "dgIdY" : "yDataGenerator1_1",
                    "label" : "curve1_1"
                }]
            }));
        });

        this.server.respondWith('GET', '/poll/1/plot2.json', function (xhr) {
            xhr.respond(200, headers, JSON.stringify({
                "datasets": [{
                    "data": [
                        {"x" : 0, "y" : 0},
                        {"x" : 1, "y" : 1},
                        {"x" : 2, "y" : 4},
                        {"x" : 3, "y" : 9}
                    ],
                    "dgIdX" : "xDataGenerator2_1",
                    "dgIdY" : "yDataGenerator2_1",
                    "label" : "curve2_1"
                }]
            }));
        });

        var cli = new sedml.ChartClient();
        cli.response_job_success('/poll/1', ['plot1.json', 'plot2.json']);
        this.clock.tick(500);
        expect($('canvas', $('#render')[0]).length).to.equal(2);
        // the test terminates before the actual rendering is done, but
        // that is the responsibility of Chart.js.
    });

});
