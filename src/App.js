import React from 'react';
import theme from './theme';
// import { firstVids } from "./firstVids.js";

// Swiper.js
import { Swiper, SwiperSlide }  from 'swiper/react';
import SwiperCore, { Keyboard } from 'swiper';
import ContentView from "./components/ContentView"
import 'swiper/swiper.scss';

// graphql query stuff
import { useQuery } from "@apollo/react-hooks"
import gql from 'graphql-tag'
import { MuiThemeProvider, CssBaseline, CircularProgress, Typography, Box} from '@material-ui/core';

import { MuteContext } from "./context";

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
const useStateWithLocalStorage = ({ localStorageKey, defaultValue }) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(localStorageKey) || defaultValue
  );
 
  React.useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value, localStorageKey]);
 
  return [value, setValue];
};


function App() {
  const { data, loading, error } = useQuery(query);
  const [muted, setMuted] = useStateWithLocalStorage(
    'muted', true
  );
  const onToggleMuted = () => {
    setMuted(!muted);
  }

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
      <MuiThemeProvider theme={theme}>
        <CssBaseline>
          <MuteContext.Provider value={{"muted": muted, "onToggleMuted": onToggleMuted}}>
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
          </MuteContext.Provider>
        </CssBaseline>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
