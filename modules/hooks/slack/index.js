/**
 * GA Anomalies Monitor h ooks(https://github.com/fraszczakszymon/ga-anomalies-monitor-hooks)
 *
 * Copyright © 2016 Frąszczak Szymon. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

/*global module*/
function onSuccessBuild(build) {
	console.log('Success:', build.id);
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