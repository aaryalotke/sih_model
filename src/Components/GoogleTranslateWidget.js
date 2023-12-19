import React, { useEffect } from 'react';
import "./GoogleTranslateWidget.css"

const GoogleTranslateWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'http://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
      };
    };

    return () => {
      document.head.removeChild(script);
      delete window.googleTranslateElementInit;
    };
  }, []
  );

  return (
    <div>
      <div id="google_translate_element"></div>
    </div>
  );
};

export default GoogleTranslateWidget;