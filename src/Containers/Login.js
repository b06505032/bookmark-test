import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useLazyQuery } from '@apollo/client';
import { QueryCheckUser } from '../graphql/querys';
import { useEffect, useState } from 'react';



const Login = ({setAccount, setSignIn, LOCALSTORAGE_KEY, LOCALSTORAGE_KEY_LOGIN, setUserCookie, setLoginCookie}) => { 

    const [input, setInput] = useState({name:"", password:""})
    
    const onFinish = (values) => {
        const { username, password } = values
        setInput({name: username, password: password})
        checkUser({variables:{name: username, password: password}})
    }

    const [checkUser, { data }] = useLazyQuery(QueryCheckUser)    

    useEffect(()=>{
        if (data){
            const { msg } = data.getuser
            switch(msg){
                case "success": {
                    const loginAccount = {name: input.name, password: input.password}
                    setAccount(loginAccount)
                    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(loginAccount))
                    localStorage.setItem(LOCALSTORAGE_KEY_LOGIN, true)
                    setUserCookie('account', loginAccount, {path: '/'})
                    setLoginCookie('login', true, {path: '/'})
                    setSignIn(true)
                    break
                }
                case "wrong_password":{
                    message.error('Wrong Password!')
                    break
                }
                case "not_exist": {
                    message.warning('User not exist!')
                    break
                }
                default: { }
            }
        }
    }, [data])

    return(
        <Form
            style={{background: "white"}}
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            {/* username inout */}
            <Form.Item
                name="username"
                rules={[
                {
                    required: true,
                    message: 'Please input your Username!',
                },
                ]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                    id = "login_name"
                />
            </Form.Item>
            
            {/* password input */}
            <Form.Item
                name="password"
                rules={[
                {
                    required: true,
                    message: 'Please input your Password!',
                },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    id = "login_password"
                />
            </Form.Item>
            
            {/* remember me check (not implement yet) */}
            {/* <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
            </Form.Item> */}
            
            {/* Login Button */}
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" id="normal_login_button">
                    Log in
                </Button>
            {/* Or <a href="">register now!</a> */}
            </Form.Item>
        </Form>
    )
}
export default Login