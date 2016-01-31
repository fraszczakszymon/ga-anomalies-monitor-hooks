/**
 * GA Anomalies Monitor h ooks(https://github.com/fraszczakszymon/ga-anomalies-monitor-hooks)
 *
 * Copyright © 2016 Frąszczak Szymon. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

/*global module, require*/
var config = require('config'),
	eventDispatcher = require('event/dispatcher'),
	fetch = require('node-fetch'),
	q = require('q');

function getBuild(id) {
	return fetch(config.server.url + '/build/' + id)
		.then(function (res) {
			return res.text();
		})
		.then(function (build) {
			return JSON.parse(build);
		})
		.catch(function () {
			return null;
		});
}

function getFinishedBuild(build) {
	var deferred = q.defer();

	function recursiveGet() {
		setTimeout(function () {
			getBuild(build.id)
				.then(function (build) {
					if (build.status === 1) {
						recursiveGet();
					} else {
						deferred.resolve(build);
					}
				});
		}, 5000);
	}

	recursiveGet();

	return deferred.promise;
}

function build() {
	return fetch(config.server.url + '/build', {method: 'POST'})
		.then(function (res) {
			return res.text();
		})
		.then(function (build) {
			return JSON.parse(build);
		})
		.then(function (build) {
			return getFinishedBuild(build);
		})
		.then(function (finishedBuild) {
			var event = finishedBuild.status === 0 ? 'build.success' : 'build.failure';
			eventDispatcher.dispatch(event, finishedBuild);
		});
}

module.exports = {
	build: build
};