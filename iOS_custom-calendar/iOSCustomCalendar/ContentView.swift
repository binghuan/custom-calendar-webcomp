import SwiftUI
import WebKit


class WebView: NSObject, ObservableObject {
    var webView: WKWebView?
    let url: URL
    
    init(url: URL) {
        self.url = url
    }
    
    func load() {
        let request = URLRequest(url: url)
        webView?.load(request)
    }
    
    func sendMessageToIframe(message: String) {
        let script = "handleDateClick('\(message)')"
        webView?.evaluateJavaScript(script, completionHandler: nil)
        
    }
    
    // Implement WKScriptMessageHandler method
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        if message.name == "callbackHandler" {
            print("JavaScript message received: \(message.body)")
            // Handle the message or call a SwiftUI action
        }
    }
}

struct ContentView: View {
    @State private var selectedDate: Date = Date()
    @StateObject private var webView = WebView(url: URL(string: "http://localhost:3000/today-events.html")!)
    
    var body: some View {
        VStack {
            CalendarView(selectedDate: $selectedDate)
                .padding(.horizontal, 20)
                .padding(.top, 20)
                .padding(.bottom, 10)  .onReceive([self.selectedDate].publisher.first()) { date in
                    let formattedDate = DateFormatter.localizedString(from: date, dateStyle: .medium, timeStyle: .none)
                    self.webView.sendMessageToIframe(message: formattedDate)
                }
            WebViewWrapper(webView: webView)
        }
    }
}



struct WebViewWrapper: UIViewRepresentable {
    let webView: WebView
    
    func makeUIView(context: Context) -> WKWebView {
        let preferences = WKPreferences()
        let configuration = WKWebViewConfiguration()
        configuration.preferences = preferences
        
        // Add script message handler
        configuration.userContentController.add(context.coordinator, name: "callbackHandler")
        
        let webView = WKWebView(frame: .zero, configuration: configuration)
        webView.navigationDelegate = context.coordinator
        self.webView.webView = webView
        self.webView.load()
        return webView
    }
    
    func updateUIView(_ uiView: WKWebView, context: Context) {
        self.webView.webView = uiView
    }
    
    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }
    
    class Coordinator: NSObject, WKNavigationDelegate, WKScriptMessageHandler {
        let parent: WebViewWrapper
        
        init(_ parent: WebViewWrapper) {
            self.parent = parent
        }
        
        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            print("WebView finished loading")
        }
        
        // WKScriptMessageHandler method
        func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
            if message.name == "callbackHandler" {
                print("Received message from JavaScript:", message.body)
                // Handle the message here
            }
        }
    }
}


struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
