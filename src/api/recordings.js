import api from './base'
import moment from 'moment';;


const getParsedTime = duration => {
  let hours = 0;
  let minutes = Math.floor(duration/60);

  if (minutes > 60) {
    hours = Math.floor(minutes/60);
    minutes %= 60;
  }

  let seconds = duration%60

  const withForwardingZero = (num) => {
    let normalizedNum = num;

    if (normalizedNum < 10) {
      normalizedNum = `0${normalizedNum}`;
    }

    return normalizedNum;
  }

  return [
    withForwardingZero(hours),
    withForwardingZero(minutes),
    withForwardingZero(seconds)
  ].join(':');
}

const recordingsApi = {
  getList: () => {
    return api('GET https://i2x-challenge.herokuapp.com/ai/recording/list/').then(response => {
      let results = response.results.map(item => ({
        ...item,
        created: moment(item.created).format('DD.MM.YYYY'),
        duration: getParsedTime(item.duration),
      }));

      return {
        ...response,
        results
      }
    });
  }
};

export default recordingsApi;
