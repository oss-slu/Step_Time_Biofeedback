import StanceTimeDigits from './StanceTimeDigits';

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function PatientView({ borderColor, stanceTime, view }) {
	const [container, setContainer] = useState(null);

	useEffect(() => {
		if (view) {
      // Copies CSS from the parent window to the child window
      view.document.head.innerHTML = window.document.head.innerHTML;
      setContainer(view.document.body);
		} else {
      alert("Please Allow Pop-ups in this window");
    }
	}, [view]);

  useEffect(() => {
    if (container) {
      const elements = container.querySelectorAll(".CurrentStanceTime li");
      elements.forEach(element => {
        element.style.borderColor = borderColor;
      });
    }
  }, [borderColor, container]);

	if (!container) return null;

	return ReactDOM.createPortal(
    <header className="App-header" style={{minHeight:"100vh"}}>
      <StanceTimeDigits stanceTime={stanceTime}/>
    </header>,
		container
	);
}

export default PatientView;