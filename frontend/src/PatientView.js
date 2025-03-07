import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function PatientView({ borderColor, patientWindow, view }) {
	const [container, setContainer] = useState(null);

	useEffect(() => {
		if (patientWindow) {
      // Copies CSS from the parent window to the child window
      patientWindow.document.head.innerHTML = window.document.head.innerHTML;
      setContainer(patientWindow.document.body);
		} else {
      alert("Please Allow Pop-ups in this window");
    }
	}, [patientWindow]);

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
      {view}
    </header>,
		container
	);
}

export default PatientView;