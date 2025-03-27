const Utils = {
    parseRequestURL: () => {
      // On récupère tout ce qui suit le '#' dans l'URL
      let url = location.hash.slice(1).toLowerCase() || '/';
  
      // On découpe la chaîne selon les '/'
      let r = url.split('/');
  
      let request = {
        ressource: null,
        id: null,
        verb: null,
        id2: null
      };

    request.ressource = r[1];
    request.id        = r[2]; 
    request.verb      = r[3]; 
    request.id2       = r[4]; 
  
    return request;
    }
  };
  
  export default Utils;