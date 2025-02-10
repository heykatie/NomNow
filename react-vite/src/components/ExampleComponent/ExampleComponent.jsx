import React, { useEffect } from 'react';

function ExampleComponent() {
  useEffect(() => {
    console.log('Full URL:', window.location.href);
  }, []);

  return (
    <div>
      <p>Check the console to see the full URL.</p>
    </div>
  );
}

export default ExampleComponent;
