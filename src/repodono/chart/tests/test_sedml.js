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

});
