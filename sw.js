chrome.action.onClicked.addListener(async (tab) => {
	// Get Badge Text current state
	let currState = await chrome.action.getBadgeText({ tabId: tab.id })

	// Set Badge Text to next state (ON/OFF)
	let nextState = currState === "ON" ? "OFF" : "ON"

	// Action Badge
	await chrome.action.setBadgeText({
		tabId: tab.id,
		text: nextState,
	})

	if (nextState === "ON") {
		await chrome.scripting.insertCSS({
			files: ["font-everywhere.css"],
			target: { tabId: tab.id },
		})
	} else if (nextState === "OFF") {
		await chrome.scripting.removeCSS({
			files: ["font-everywhere.css"],
			target: { tabId: tab.id },
		})
	}
})
