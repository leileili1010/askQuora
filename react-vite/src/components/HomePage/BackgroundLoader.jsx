import { useState, useEffect } from 'react';

function BackgroundLoader() {
   const [bgIndex, setBgIndex] = useState(0);
   const backgrounds = [
      "https://askcora.s3.us-west-1.amazonaws.com/background_img/pexels-maoriginalphotography-1485894.jpg",
      "https://askcora.s3.us-west-1.amazonaws.com/background_img/pexels-brotherkehn-3584437.jpg",
      "https://askcora.s3.us-west-1.amazonaws.com/background_img/pexels-mo-eid-1268975-6356236.jpg",
      "https://askcora.s3.us-west-1.amazonaws.com/background_img/pexels-picjumbo-com-55570-196642.jpg"
   ];

   useEffect(() => {
      const changeBackground = () => {
          setBgIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
      };

      const intervalId = setInterval(changeBackground, 6000);

      return () => clearInterval(intervalId);
   }, [backgrounds.length]);

   return (
      <div 
         style={{
            backgroundImage: `url(${backgrounds[bgIndex]})`,
            transition: 'background-image 2s ease-in-out',
            width: '100%',
            height: '100vh',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            // backgroundRepeat: 'no-repeat'
         }}
      >
      </div>
   );
}

export default BackgroundLoader;
