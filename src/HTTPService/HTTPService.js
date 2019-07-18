const API_HOST = 'http://localhost:8000';

class HTTPService {
  constructor() {
    this.state = {
      _csrfToken : null,
      id:null,
      joke:null,
      rating:null,
    };
    }

    async get(id='') {
        if (true) {
          const response = await fetch(`${API_HOST}/`, {
            credentials: 'include',
          });
          const data = await response.json();
          alert(data);
        }
      }
      
    async postRequest(state) {
      let method = 'POST'
        let headers= (method === 'POST' ? 
          {'X-CSRFToken': await this.getCsrfToken()} : {}
          )
        let body = JSON.stringify({'art':state});
    
        const response = await fetch(`${API_HOST}/art/`, {headers, method : 'POST', body,
        credentials: 'include',
        });
    
        const data = await response.json();
        //this.setState(data);
        console.log(data);
    }

    async getCsrfToken() {
      if (this.state._csrfToken === null) {
        const response = await fetch(`${API_HOST}/csrf/`, {
          credentials: 'include',
        });
        const data = await response.json();
        this.state._csrfToken = data.csrfToken;
      }
      return this.state._csrfToken;
    }
    
    setState = (jokeModel) => {
      this.app.setState({jokeModel});
    }
}


export default HTTPService;