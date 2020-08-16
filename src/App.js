import React from 'react';
import { firstVids } from "./firstVids.js";

// Import Swiper React components
import { Swiper, SwiperSlide }  from 'swiper/react';
// import { Swiper }  from 'swiper/react';
import SwiperCore, { Keyboard } from 'swiper';
import ContentView from "./components/ContentView"
// Import Swiper styles
import 'swiper/swiper.scss';
import './styles.css';

SwiperCore.use([Keyboard]);

function App() {
  const numSlides = firstVids.length;

  return (
    <div className="App">
      <Swiper
        keyboard
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        direction="vertical"
      >
      { [ ...Array(numSlides).keys() ].map( (i, el) => {
        // return <ContentView key={i} content={"Slide " + i}/>
        return (
          <SwiperSlide key={i}>
            {({isActive}) => (
              <ContentView id={i} url={firstVids[i].url} isActive={isActive}/>
            )}
          </SwiperSlide>
        )
      })}
      </Swiper>
    </div>
  );
}

export default App;
