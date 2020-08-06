import {EventEmitter} from '../EventEmitter/events';
import $ from "jquery";

const url = 'http://localhost:3000'

class HttpService {
    singleton; // static class member
    static singleton = [];

    constructor() {
        this.save = this.save.bind(this)
        this.post = this.post.bind(this)
        this.get = this.get.bind(this)
        this.put = this.put.bind(this)


        HttpService.auth_token = window.localStorage.getItem('auth_token')

        HttpService.headers = {
            "Content-Type": "application/json; charset=utf-8",
            'Accept': 'application/json',
            'Authorization': HttpService.auth_token
        }
        this.registerEvents()
    }

    static get service_singleton(){
        if (this.singleton.length === 0) {
            const svc = new HttpService()
            this.singleton.push(svc)
        }
        console.log(this.singleton.length)
        return this.singleton[this.singleton.length -1];
    }

    registerEvents(){
        EventEmitter.subscribe('credentials-entered', (auth) => {
            this.get_auth(auth).then((auth_headers)=>{
                console.log(auth_headers)
                if (auth_headers['Authorization']) {
                    EventEmitter.dispatch('successful-login')
                }
            }).catch(err => {
                EventEmitter.dispatch('login-failed')
            })
        })
    }

    init() {
        this.get_auth()
            .then(p => {
                // console.log(this.auth_token)
                this.get()
            })

    }


    async get_auth(auth) {
        console.log(auth)
        if (HttpService.headers['Authorization'] && !auth) {
            return  HttpService.headers
        }

        if(!auth){
            EventEmitter.dispatch('login-request')
            return
        }
        const email = auth?.email //|| window.prompt('enter email')
        const pass = auth?.password //|| window.prompt('enter password')
        const payload = {email: email, password: pass}

        let resp = $.post(url + '/auth/login', payload)

        let result = await resp;
        // wait until the promise resolves (*)
        console.log(result.auth_token)
        resp.then((r)=>{
            console.log(r)
            window.localStorage.setItem('auth_token', r.auth_token || 'oops')
            HttpService.auth_token = r.auth_token;
            HttpService.headers['Authorization'] = r.auth_token;
        })

        return  HttpService.headers
    }

    async post(k, v) {
        if (! HttpService.auth_token) {
            this.get_auth().then((promise) => {
                this.post(promise)
            });
        } else {
            let promise = new Promise((resolve, reject) => {
                this.save(k, v).then((data) => {
                    resolve(data)
                })
            });
            let result = await promise; // wait until the promise resolves (*)

            return result; // "done!"
        }

    }


    async save(k, v) {
        const model = JSON.stringify({title: k, content: v})
        let promise = new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: url + '/art',
                data: model,
                headers:  HttpService.headers,
                success: (resp) => {
                    console.log('ok')
                },
                error: (err) => {
                    console.log(err.responseJSON)
                }
            }).then((resp) => {
                    resolve(resp.id)
                }
            )
        });


        let result = await promise; // wait until the promise resolves (*)

        return result; // "done!"
    }

    async get(n) {
        const f_optional_number = n === undefined ? '' : '/' + n

        let promise = new Promise((resolve, reject) => {
            this.get_auth().then((headers) => {
                console.log(headers)
                // setTimeout(() => resolve(['done!!!']), 3500)
                $.ajax({
                    type: 'GET',
                    url: url + '/art' + f_optional_number,
                    headers: headers,
                    success:(resp) =>{
                        this.records = n !== undefined ? [resp] : resp;
                        resolve(this.records)
                    },
                    error: (err) => {
                        console.log(err.responseJSON)
                        HttpService.auth_token =  HttpService.headers['Authorization'] = undefined;
                        this.get_auth().then(()=>{
                            this.get(n)
                        })
                    }
                })

            })
        })


        let result = await promise; // wait until the promise resolves (*)
        return result;
    }

    put(n, data) {
        if (! HttpService.auth_token) {
            this.get_auth(this.put);
        } else {
            console.log('put')
            const f_optional_number = n === undefined ? '' : '/' + n

            $.ajax({
                type: "PUT",
                url: url + '/art' + f_optional_number,
                headers:  HttpService.headers,
                data: data,
                success: (resp) => {
                    // console.log(resp)
                },
                error: (err) => {
                    console.log(err.responseJSON)
                }
            })
        }
    }

    del(n) {
        const f_optional_number = n === undefined ? '' : '/' + n
        console.log(n + 'Delete')
        this.get_auth().then((t) => {
            $.ajax({
                type: "DELETE",
                url: url + '/art' + f_optional_number,
                headers:  HttpService.headers,
                data: this.faux_model,
                success: (resp) => {
                    console.log('DELETE')
                    this.records.shift(); // remove record from front of array to have syn with rest/database
                },
                error: (err) => {
                    console.log(err.responseJSON)
                }
            })
        });
    }
}

export default HttpService;