/**
 * GA Anomalies Monitor h ooks(https://github.com/fraszczakszymon/ga-anomalies-monitor-hooks)
 *
 * Copyright © 2016 Frąszczak Szymon. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

/*global module, require*/
var hooks = [
	require('hooks/slack')
];

function dispatch(event, data) {
	hooks.forEach((hook) => {
		hook.dispatch(event, data);
	});
}

module.exports = {
	dispatch: dispatch
};