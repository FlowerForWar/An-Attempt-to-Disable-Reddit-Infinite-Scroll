// ==UserScript==
// @name           An Attempt to Disable Reddit Infinite Scroll
// @namespace      1650776408
// @description    Attempts to disable Reddit infinite scroll by the help of blocking the address that dynamically loads posts (works on subreddits only)
// @version        0.02
// @author         FlowrForWar
// @match          https://www.reddit.com/r/*
// @grant          none
// @run-at         document-start
// @require        https://greasyfork.org/scripts/12228/code/setMutationHandler.js
// @noframes
// @license        MIT
// ==/UserScript==

/* 
For this to work you need to block the the address that loads the posts dynamically
Add the following line as a rule in the "List of your dynamic filtering rules" of uBlock origin
www.reddit.com https://gateway.reddit.com/desktopapi/v1/subreddits/ xmlhttprequest block

See this image: https://raw.githubusercontent.com/FlowerForWar/An-Attempt-to-Disable-Reddit-Infinite-Scroll/main/ublock.png

 */

setMutationHandler({
	selector: 'div',
	processExisting: !1,
	target: document,
	childList: !0,
	subtree: !0,
	attributes: !1,
	handler: nodes => {
		for (let index = 0; index < nodes.length; index++) {
			const node = nodes[index];
			if (node.textContent !== "Sorry, for some reason reddit can't be reached.Try again") continue;
			// node.offsetParent.remove();
			// return !1;
			const lastPost = [...document.querySelectorAll('div[data-testid="post-container"][id^="t3_"]')].pop();
			node.offsetParent.setAttribute('style', 'text-align: center; margin-top: 20px;');
			// const href = `${location.origin}${location.pathname}?after=${lastPost.id}`;
			const href = location.search.includes('after=')
				? location.href.replace(/after=[^&]+/, `after=${lastPost.id}`)
				: location.search
				? location.href + `&after=${lastPost.id}`
				: location.href + `?after=${lastPost.id}`;
			const style = `border-radius: 4px; color: #FFF; white-space: nowrap; background-color: #E91E63; padding: 5px 20px 5px 20px; margin: 5px;`;
			node.offsetParent.innerHTML = `<a href="${href}" style="${style}">NEXT ›</a>`;
			return !1;
		}
	},
});
