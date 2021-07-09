import React from 'react';
import ReactDOM from 'react-dom';
import Quiz from './components/quiz';
import config from './config'

function app(window) {
  window.addEventListener('DOMContentLoaded', function(){
    const tag   = document.getElementById('energy_quiz');
    let rawData = tag.getAttribute('data-config') || "{}";
    let props = { ...config };

    rawData = rawData.replace(/'/g, "\"");
    try{
      const passed = JSON.parse(rawData);
      props = { ...config, ...passed };
    }catch(e){}
    
    ReactDOM.render(<Quiz {...(props || {})} />, document.getElementById('energy_quiz'));
  })
}



app(window);

export default app;
