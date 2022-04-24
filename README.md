# An-Attempt-to-Disable-Reddit-Infinite-Scroll
Attempts to disable Reddit infinite scroll by the help of blocking the address that dynamically loads posts

If there is another (an elegant) way to disable Reddit infinite scroll, please do share.


For this to work you need to block the the address that loads the posts dynamically. 
Add the following line as a rule in the "List of your dynamic filtering rules" of uBlock origin
* www.reddit.com https://gateway.reddit.com/desktopapi/v1/subreddits/ xmlhttprequest block

See this image: https://raw.githubusercontent.com/FlowerForWar/An-Attempt-to-Disable-Reddit-Infinite-Scroll/main/ublock.png
