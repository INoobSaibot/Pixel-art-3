import React, {Component} from 'react';
import './login.css'
import {EventEmitter} from "../EventEmitter/events";

class Login extends Component {
    constructor(props) {
        super(props);
        this.registerEvents()
        this.state = {
            open:false
        }
    }

    componentDidMount() {
        setTimeout(()=>{this.openModal()},0)
    }

    handleChangeEmail = (event) => {
        this.setState({emailValue: event.target.value});
    }

    handleChangePass = (event) => {
        this.setState({passValue: event.target.value});
    }

    render() {
        // do stuff
        const css = '';
        const iconStyle = '';
        const style = {};
        const closing = this.state.open === false ? 'closing' : '';
        const classes =`Login ${closing}`
        const loading_spinner = <i className="fa fa-cog fa-spin"></i>
        const loading_checkmark = <div className={'check-wrapper'}><i className="fa fas fa-check"></i></div>

        return (
            <div className={classes} style={style} onClick={this.handleClick} value={this.value} onTransitionEnd={this.transitionEnd}>
                <div className='content'>
                    <button className='cancel' onClick={this.closePasswordModal}>Cancel</button>
                    <label>email</label>
                    <input id='email' type='text' onChange={this.handleChangeEmail}/>
                    <label>password</label>
                    <input id='password' type='password' onChange={this.handleChangePass}/>
                    <button onClick={this.handleSubmit}>submit</button>
                </div>
                <div className={'loading'}>
                    {this.state.successful && loading_checkmark}
                    {this.state.loading && loading_spinner}
                </div>
            </div>
        )
    }

    handleSubmit = ($event) => {
        $event.preventDefault();
        this.setState({loading:true})
        EventEmitter.dispatch('credentials-entered', {email: this.state.emailValue, password: this.state.passValue})
    }

    registerEvents = () => {
        EventEmitter.subscribe('successful-login', () => {
            this.setState({ successful:true, loading:false })
            setTimeout( () => {
                this.closePasswordModal();
            }, 500)
        })

        EventEmitter.subscribe('login-failed', () => {
            console.log('fail')
            this.setState({successful:undefined, loading:undefined, loginError:true})
        })

        EventEmitter.subscribe('login-request', () => {
            console.log('fail')
            // this.setState({successful:undefined, loading:undefined, loginError:true})
            this.openModal()
        })
    }

    closePasswordModal = () => {
        this.setState({ open:false })
        // this.setState({open:false})
    }

    transitionEnd = (e) => {
        if (this.state.open === false){
            this.props.passwordCancel()
        }
    }

    openModal(){
        this.setState({open:true})
    }
}

function MenuButton(props) {
    const css = '';
    const iconStyle = {};
    const style = {};
    return (
        <button className='btn btn-default row toolButton' style={style} onClick={props.onClick}>
            {/*<i className={css} style={iconStyle}></i>*/}
            login
        </button>
    )
}

export function LoginButton(props) {
    return (
        <MenuButton onClick={props.onClick}>foo</MenuButton>
    )
}

export default Login;
