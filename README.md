custom-calendar-webcomp
=======================

- [custom-calendar-webcomp](#custom-calendar-webcomp)
    - [Solution 1: Write your own calendar widget](#solution-1-write-your-own-calendar-widget)
    - [Solution 2: Use a third-party calendar widget](#solution-2-use-a-third-party-calendar-widget)
    - [Solution 3: Use WebView to load a self-made H5 web page](#solution-3-use-webview-to-load-a-self-made-h5-web-page)
  - [Demo](#demo)

### Solution 1: Write your own calendar widget
  - **Pros:** 
    - Full control, allowing the implementation of any desired effect.
  - **Cons:** 
    - Requires building from scratch, which can be time-consuming.

### Solution 2: Use a third-party calendar widget
  - **Pros:** 
    - Quickly implement a calendar widget without needing to build it from scratch.
  - **Cons:** 
    - Some third-party calendar widgets do not support using the same codebase for iOS/Android/Mac/Linux, leading to inconsistent styles across platforms.
    - Some third-party widgets do not support customization, like Google Calendar's effect. Subsequent modifications might require altering the widget's source code, which is inconvenient.

### Solution 3: Use WebView to load a self-made H5 web page
  - **Pros:** 
    - Can use the same set of H5 code for iOS/Android/Mac/Linux.
    - Enables cross-platform implementation, such as for iOS/Android/Mac/Linux.
  - **Cons:** 
    - Requires implementing the interaction between the H5 web version and the native code yourself.
    - Initially, there might be slow loading issues due to caching when loading through the web.
  
![](./README/solution3.png)

## Demo 
![](./README/demo.png)