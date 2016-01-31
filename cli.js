/**
 * GA Anomalies Monitor h ooks(https://github.com/fraszczakszymon/ga-anomalies-monitor-hooks)
 *
 * Copyright © 2016 Frąszczak Szymon. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

/*global process, require*/
require('app-module-path').addPath(__dirname + '/modules');
require('app-module-path').addPath(__dirname + '/config');

var api = require('api/api'),
	program = require('commander');

program
	.command('build')
	.description('Run build and dispatch related events')
	.action(() => {
		api.build();
	});

program.parse(process.argv);

if (!process.argv.slice(2).length) {
	program.help();
}