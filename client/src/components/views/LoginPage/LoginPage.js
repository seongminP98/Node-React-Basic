import React, {useState} from 'react'
import Axios from 'axios'
import {useDispatch} from 'react-redux';
import{loginUser} from '../../../_actions/user_action';
function LoginPage(props) {
    const dispatch = useDispatch();
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event)=>{       //Email state바꿔주는 것
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event)=>{    //Password state바꿔주는 것
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event)=>{   
        event.preventDefault();  //없으면 login버튼 누를 때마다 page 리프레시

        
        let body={
            email: Email,
            password: Password
        }
        dispatch(loginUser(body))
        .then(response =>{
            if(response.payload.loginSuccess){
                props.history.push('/')
            } else{
                alert('Error')
            }
        })

        
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <form style={{display: 'flex', flexDirection:'column'}}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                <br />
                <button type = "submit">
                    Login
                </button>
            </form>

        </div>
    )
}

export default LoginPage
