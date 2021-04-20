import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { TiWeatherCloudy, TiWeatherDownpour, TiWeatherPartlySunny} from 'react-icons/ti';
import moment from 'moment';

const WEATHER_QUERY = gql`
  query {
    weather {
      dt,
      dt_txt,
      weather {
        main,
        description
      },
      main {
        temp
      }
    }
  }
`;

class componentName extends Component {
  render() {
    return (
      <div>
        <Query query={WEATHER_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>
            if (error) console.log(error);
            console.log(data);
            return (<>
              <div className="weather-container">
                <p className="w-title">Weather Forecast</p>
                <div className="w-row y-top x-center">
                  <div className="d-80 w-row y-top">
                    <div style={{ width: 500, padding: '0px 20px' }}>
                      <p style={{ fontWeight: 'bold', fontSize: 18 }}>Today's Weather</p>
                      {((data.weather) ? data.weather : []).filter(opt => moment(opt.dt_txt).isAfter(moment(new Date())) && moment(new Date()).format("DD/MM/YYYY") === moment(opt.dt_txt).format('DD/MM/YYYY')).map((data, index) => {
                        let wIcon = (<TiWeatherPartlySunny style={{ fontSize: 50 }} />);
                        if (data.weather[0].main === 'Rain') {
                          wIcon = (<TiWeatherDownpour style={{ fontSize: 50 }} />);
                        }
                        if (data.weather[0].main === 'Clouds') {
                          wIcon = (<TiWeatherCloudy style={{ fontSize: 50 }} />);
                        }
                        if (moment(new Date()).format("DD/MM/YYYY") === moment(data.dt_txt).format('DD/MM/YYYY')) {
                          return (<div className="w-box w-row y-top" key={index}>
                            <div style={{ width: 80 }}>
                              {wIcon}
                            </div>
                            <div style={{ width: 'calc(100% - 80px)' }}>
                              <p style={{ fontSize: 20, fontWeight: 'bold' }}>{`${data.main.temp}`} &#176; C</p>
                              <p style={{ fontSize: 16 }}>{data.weather[0].main} - {data.weather[0].description}</p>
                              <p style={{ fontSize: 16 }}>{moment(new Date(data.dt_txt)).format('DD/MM/YYYY hh:mm A')}</p>
                            </div>
                          </div>)
                        }
                      })}
                    </div>
                    <div style={{ width: 'calc(100% - 500px)', padding: '0px 20px' }}>
                      {((data.weather) ? data.weather : []).filter(opt => moment(opt.dt_txt).isAfter(moment(new Date())) && moment(new Date()).format("DD/MM/YYYY") !== moment(opt.dt_txt).format('DD/MM/YYYY')).map((data, index) => {
                        let wIcon = (<TiWeatherPartlySunny style={{ fontSize: 35 }} />);
                        if (data.weather[0].main === 'Rain') {
                          wIcon = (<TiWeatherDownpour style={{ fontSize: 35 }} />);
                        }
                        if (data.weather[0].main === 'Clouds') {
                          wIcon = (<TiWeatherCloudy style={{ fontSize: 35 }} />);
                        }
                        if (index !== 0) {
                          return (<div className="w-box w-row y-top" key={index}>
                            <div style={{ width: 60 }}>
                              {wIcon}
                            </div>
                            <div style={{ width: 'calc(100% - 60px)' }}>
                              <p>{`${data.main.temp}`} &#176; C</p>
                              <p style={{ fontSize: 12 }}>{data.weather[0].main} - {data.weather[0].description}</p>
                              <p style={{ fontSize: 12 }}>{moment(new Date(data.dt_txt)).format('DD/MM/YYYY hh:mm A')}</p>
                            </div>
                          </div>)
                        }
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <style>{`
                p {
                  margin: 0;
                }
                .w-row {
                  display: flex;
                }
                .y-top {
                  align-items: flex-start;
                  flex-wrap: wrap;
                }
                .y-center {
                  align-items: center;
                  flex-wrap: wrap;
                }
                .x-center {
                  justify-content: center;
                }
                .d-50 { width: 50%; }
                .d-60 { width: 60%; }
                .d-70 { width: 70%; }
                .d-80 { width: 80%; }
                .d-90 { width: 90%; }
                .weather-container {
                  margin: 0;
                  font-family: 'Poppins-Regular';
                }
                .w-title {
                  font-weight: bold;
                  margin: 12px 0px;
                  background-color: #2d2d2d;
                  padding: 8px 15px;
                  border-radius: 5px;
                }
                .w-box {
                  background-color: #1d1d1d;
                  padding: 8px 15px;
                  border-radius: 5px;
                  border-left: solid 2px #585858;
                  border-bottom: solid 2px #585858;
                  margin: 10px 0px;
                }
              `}</style>
            </>)
          }}
        </Query>
      </div>
    );
  }
}

export default componentName;
