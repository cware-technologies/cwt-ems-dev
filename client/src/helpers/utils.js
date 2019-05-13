export const setAuthToken = (token) => {
    localStorage.setItem('loggedInUser', JSON.stringify(token))
    return
}

export const getAuthToken = () => {
    let user = localStorage.getItem('loggedInUser');
    return user ? JSON.parse(user) : false
}

export const combineStyles = (...styles) => {
    return function CombineStyles(theme) {
      const outStyles = styles.map((arg) => {
        // Apply the "theme" object for style functions.
        if (typeof arg === 'function') {
          return arg(theme);
        }
        // Objects need no change.
        return arg;
      });
  
      return outStyles.reduce((acc, val) => Object.assign(acc, val));
    };
  }

export const getDate = (datetime) => {
  var t, result = null;

  if (typeof datetime === 'string') {
      t = datetime.slice(0, -5).split(/[- :T]/);

      //when t[3], t[4] and t[5] are missing they defaults to zero
      result = new Date(t[0], t[1] - 1, t[2], t[3] || 0, t[4] || 0, t[5] || 0);
  }

  return result
}
  
  export default combineStyles;