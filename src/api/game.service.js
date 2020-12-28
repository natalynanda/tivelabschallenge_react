import axios from 'axios';

class GameService {

    calculateGamers(dataJson) {
        const token = Buffer.from(`admin:123456`, 'utf8').toString('base64');
    
        let body = new FormData();
        body.set('jsonData', JSON.stringify(dataJson));
        return new Promise((resolve, reject) => {
          axios({
            method: 'post',
            url: 'http://192.168.1.106:8087/v1/calculateJson',
            data: body,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Basic ${token}`,
            },
          })
            .then((response) => {
              console.warn('Calculation complete', response);
              resolve(response);
            })
            .catch((e) => {
              console.warn('error message', e.message);
              reject(e);
            });
        });
      }
}

export default new GameService();