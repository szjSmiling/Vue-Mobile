
export function asyncLoadJs (url, id) {
  return new Promise((resolve, reject) => {
    if(document.getElementById(id)) return;
    let st = document.createElement('script');
    st.src = url
    st.defer = 'defer'
    
    document.body.appendChild(st);

    st.onload = function () {
      return resolve();
    }
    st.onerror = function () {
      return reject();
    }
  })
}