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

export const getDateFormValue = (datetime) => {
  if(!datetime){
    return
  }

  if(datetime.length >= 24 && datetime.includes('T') && datetime.includes('Z')){
    let t = datetime.slice(0, -5).split(/[T]/);
    return t[0]
  }

  return
}

export const capitalize = (string) => {
  if (typeof string !== 'string') return ''

  let sentence = string.split([' ', "_"]).map(ele => ele.charAt(0).toUpperCase() + string.slice(1)).join(' ')
  return sentence;
}

export const getFormDataFromObject = object =>
  Object.keys(object).reduce((formData, key) => {
    formData.append(key, object[key]);
    return formData;
  }, new FormData());


export function objectToFormData(obj, rootName, ignoreList) {
    var formData = new FormData();

    function appendFormData(data, root) {
        if (!ignore(root)) {
            root = root || '';
            if (data instanceof File) {
                formData.append(root, data);
            } else if (Array.isArray(data)) {
                for (var i = 0; i < data.length; i++) {
                    appendFormData(data[i], root + '[' + i + ']');
                }
            } else if (typeof data === 'object' && data) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        if (root === '') {
                            appendFormData(data[key], key);
                        } else {
                            appendFormData(data[key], root + '.' + key);
                        }
                    }
                }
            } else {
                if (data !== null && typeof data !== 'undefined') {
                    formData.append(root, data);
                }
            }
        }
    }

    function ignore(root){
        return Array.isArray(ignoreList)
            && ignoreList.some(function(x) { return x === root; });
    }

    appendFormData(obj, rootName);

    return formData;
}