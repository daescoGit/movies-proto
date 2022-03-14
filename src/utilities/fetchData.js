
let getData = async (url, handleDataCallback) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  let response = await fetch(url, requestOptions)
    .catch(error => console.log('error', error))

  let jData = await response.json();

  handleDataCallback(jData);

  // handle error
}

export default getData;