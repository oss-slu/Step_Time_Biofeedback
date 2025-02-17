import StanceTimeDigits from './StanceTimeDigits';

import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';

function ClientView({ borderColor, stanceTime, closeCallback }) {
  const newWindowRef = useRef(null);
	const [container, setContainer] = useState(null);

  if (newWindowRef.current && newWindowRef.current.closed) closeCallback();

	useEffect(() => {
		newWindowRef.current = window.open('', '_blank', 'width=800px,height=600px');

		if (newWindowRef.current) {
      let newWindow = newWindowRef.current;

      // Copies CSS from the parent window to the child window
      newWindow.document.head.innerHTML = window.document.head.innerHTML;

      setContainer(newWindow.document.body);

      // when the ClientView component is unloaded this runs to close the popup
			return () => {
				newWindowRef.current.close();
			};
		} else {
      alert("Please Allow Pop-ups in this window");
      closeCallback();
    }
	}, [closeCallback]);

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

export default ClientView;