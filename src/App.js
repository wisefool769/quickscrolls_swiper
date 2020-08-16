import React from 'react';
// import { firstVids } from "./firstVids.js";

// Swiper.js
import { Swiper, SwiperSlide }  from 'swiper/react';
import SwiperCore, { Keyboard } from 'swiper';
import ContentView from "./components/ContentView"
import 'swiper/swiper.scss';

// graphql query stuff
import { useQuery } from "@apollo/react-hooks"
import gql from 'graphql-tag'
import { CircularProgress, Typography, Box} from '@material-ui/core';

import './styles.css';



SwiperCore.use([Keyboard]);

const query = gql`
  query scrollScene {
    viral(
      where: {
        type: {_eq: "video"},
        score_manual: {_gte: 5}
      },
      limit: 20
    ) {
      file
      thumbnail
      title_manual
      score_manual
    }
  }
`

function App() {
  const { data, loading, error } = useQuery(query);
  if (loading || error || (!data)) return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      {loading ?  <CircularProgress size={200}/> : <Typography>{error ? "Error" : "Not found"}</Typography>}
    </Box>
  );

  return (
    <div className="App">
      <Swiper
        keyboard
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        direction="vertical"
      >
      { [ ...Array(data.viral.length).keys() ].map( (i, el) => {
        // return <ContentView key={i} content={"Slide " + i}/>
        return (
          <SwiperSlide key={i}>
            {({isActive}) => (
              <ContentView id={i} url={data.viral[i].file} isActive={isActive}/>
            )}
          </SwiperSlide>
        )
      })}
      </Swiper>
    </div>
  );
}

export default App;
