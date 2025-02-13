"use client";
import Script from "next/script";
import React, { useEffect } from "react";

const IubendaBanner = () => {
  return (
    <span suppressHydrationWarning>
      <Script
        id="iubenda-config"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              var _iub = _iub || [];
_iub.csConfiguration = {"siteId":3928206,"cookiePolicyId":75442792,"lang":"it","storage":{"useSiteId":true}};`,
        }}
        suppressHydrationWarning
      />
      <Script
        src="https://cs.iubenda.com/autoblocking/3928206.js"
        strategy="afterInteractive"
        suppressHydrationWarning
      />
      <Script
        src="//cdn.iubenda.com/cs/iubenda_cs.js"
        strategy="lazyOnload"
        charSet="UTF-8"
        suppressHydrationWarning
      />
    </span>
  );
};

export default IubendaBanner;
