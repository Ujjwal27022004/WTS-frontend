import React, { useEffect } from "react";

// Extend the Window interface to include the chatbase property
declare global {
  interface Window {
    chatbase?: any;
  }
}

const ChatBotComponent: React.FC = () => {
  useEffect(() => {
    const initializeChatBase = () => {
      if (
        !window.chatbase ||
        (typeof window.chatbase === "function" &&
          window.chatbase("getState") !== "initialized")
      ) {
        // Create the chatbase function
        const chatbaseFunction: any = (...args: any[]) => {
          if (!chatbaseFunction.q) {
            chatbaseFunction.q = [];
          }
          chatbaseFunction.q.push(args);
        };
        chatbaseFunction.q = [];
        window.chatbase = new Proxy(chatbaseFunction, {
          get(target, prop) {
            if (prop === "q") return target.q;
            return (...args: any[]) => target(prop, ...args);
          },
        });
      }

      // Load the script
      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = "z0ob7MZvhz2HBp0W4lqWw";
      script.setAttribute("domain", "www.chatbase.co");
      document.body.appendChild(script);
    };

    // Execute the function based on document readiness
    if (document.readyState === "complete") {
      initializeChatBase();
    } else {
      window.addEventListener("load", initializeChatBase);
    }

    // Cleanup event listener if the component unmounts
    return () => {
      window.removeEventListener("load", initializeChatBase);
    };
  }, []);

  return null; // No visible elements are needed for the bot component
};

export default ChatBotComponent;
