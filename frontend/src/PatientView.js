import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function PatientView({ borderColor, patientWindow, view }) {
	const [container, setContainer] = useState(null);

	useEffect(() => {
		if (patientWindow) {
      const patientDoc = patientWindow.document;

      // Copies CSS from the parent window to the child window
      patientDoc.head.innerHTML = document.head.innerHTML;
      setContainer(patientDoc.body);

      document.querySelectorAll('link[rel="stylesheet"], style').forEach((style) => {
        patientDoc.head.appendChild(style.cloneNode(true));
      });

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