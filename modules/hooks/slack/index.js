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
	moment = require('moment-timezone'),
	slack = require('slack/slack');

function sendQueryMessage(build, query, data) {
	var date = moment(data.date).format('MMMM DD, HH:mm'),
		url = config.client.url + '/build/' + build.id + '/query/' + query.id,
		title = 'Detected ' + (data.change > 0 ? 'growth' : 'drop')+ ' in *' + query.title + '*',
		text = '<' + url +'|Build #' + build.id + ': ' + '*' + query.title + '*>, ' + date;

	slack.send(title, [
		{
			fallback: 'Build #' + build.id + ': ' + query.title + ', ' + date,
			text: text,
			fields: [
				{
					title: 'Change',
					value: (data.change > 0 ? '+' : '') + data.change.toFixed(2) + "%",
					short: true
				},
				{
					title: 'Value',
					value: data.value,
					short: true
				}
			],
			mrkdwn_in: ['text'],
			color: (data.change > 0 ? '#689F38' : '#E53935')
		}
	]);
}

function onSuccessBuild(build) {
	console.log('Success:', build.id);
	build.queries.forEach((query) => {
		var data = query.data[query.data.length - 1];
		if (data.exceeded) {
			sendQueryMessage(build, query, data);
		}
	});
}

function dispatch(event, data) {
	console.log('slack.dispatch', event);

	switch (event) {
		case 'build.success':
			return onSuccessBuild(data);
		default:
			console.log('Not supported event');
	}
}

module.exports = {
	dispatch: dispatch
};