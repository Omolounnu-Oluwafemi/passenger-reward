export const checkInternetConnection = () => {
  return new Promise((resolve, reject) => {
    dns.resolve('www.google.com', (err) => {
      if (err) {
        reject(new Error('No internet connection'));
      } else {
        resolve();
      }
    });
  });
};