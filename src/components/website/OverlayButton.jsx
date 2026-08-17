'use client'

import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'

const OverlayButton = () => {
    useEffect(() => {
        const options = {
            call: "+919762240419", // Call phone number
            whatsapp: "+919762240419", // WhatsApp number
            call_to_action: "Omvana Yoga", // Call to action
            button_color: "#FF6550", // Color of button
            position: "left", // Position may be 'right' or 'left'
            order: "call,whatsapp", // Order of buttons
            pre_filled_message: "Dear Team Omvana Yoga Retreat, Greetings! We are interested in visiting Rishikesh in the coming days and would like to check your Retreats availability. Could you please share your current availability, along with the best available offers, seasonal packages, or group rates for our dates? Providing these details at your earliest convenience will help us finalize our travel plans smoothly. Looking forward to your prompt response.", // WhatsApp pre-filled message
            
        };

        const proto = "https:",
            host = "getbutton.io",
            url = `${proto}//static.${host}/widget-send-button/js/init.js`;

        const s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = url;
        s.onload = () => {
            if (typeof WhWidgetSendButton !== "undefined") {
                WhWidgetSendButton.init(host, proto, options);
            }
        };

        document.body.appendChild(s);

        return () => {
            document.body.removeChild(s)
        };
    }, []);
    const pathname = usePathname()

    if (pathname.includes('/admin') || pathname.includes('/invoice') || pathname.includes('/package/calculator/pdf')) {
        return null
    }
}

export default OverlayButton