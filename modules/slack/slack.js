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
	fetch = require('node-fetch'),
	FormData = require('form-data');

function sendMessage(text, attachments) {
	var data = {
			attachments: attachments,
			channel: config.hooks.slack.channel,
			icon_emoji: config.hooks.slack.icon_emoji,
			text: text,
			username: config.hooks.slack.username
		},
		form = new FormData(),
		url = 'https://hooks.slack.com/services/' + config.hooks.slack.token;

	form.append('payload', JSON.stringify(data))
	fetch(url, {
		method: 'POST',
		body: form
	}).then((res) => {return res.text()})
		.then((body) => {console.log(body)});
}

module.exports = {
	send: sendMessage
};