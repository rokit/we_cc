var bIsChrome = /Chrome/.test(navigator.userAgent);
var first_load = true;

function notify(msg){
	if (msg.new_state) {
		// console.log("new state");
		state = msg.new_state;

		if (first_load) {
			var css = document.createElement('style');
			css.innerText = state.css;
			document.head.appendChild(css);
			first_load = false;
		}

		let html = document.getElementsByTagName("HTML")[0];
		if (state.cc_toggle) {
			// console.log("toogle is true");
			html.classList.add("color-changer-sledge");
		} else {
			// console.log("toogle is false");
			html.classList.remove("color-changer-sledge");
		}
	}
}

function get_state() {
	if (bIsChrome) {
		chrome.runtime.sendMessage({content_request_state: true});
	} else {
		browser.runtime.sendMessage({content_request_state: true});
	}
}

if (bIsChrome) {
	chrome.runtime.onMessage.addListener(notify);
} else {
	browser.runtime.onMessage.addListener(notify);
}

get_state();