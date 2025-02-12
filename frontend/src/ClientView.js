import StanceTimeDigits from './StanceTimeDigits';

import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';

function ClientView({ borderColor, stanceTime }) {
  const newWindowRef = useRef(null);
	const [container, setContainer] = useState(null);

	useEffect(() => {
		newWindowRef.current = window.open('', '_blank', 'width=800px,height=600px');

		if (newWindowRef.current) {
      // copies css from parent window to child
      let newWindow = newWindowRef.current.document;
      newWindow.head.innerHTML = window.document.head.innerHTML;

      setContainer(newWindow.body);

      // when the ClientView component is unloaded this runs to close the popup
			return () => {
				newWindowRef.current.close();
			};
		}
	}, []);

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
    <header className="App-header">
      <StanceTimeDigits stanceTime={stanceTime}/>
    </header>,
		container
	);
}

export default ClientView;
