import { useRef, useState, useEffect, Buffer } from 'react';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { startsWith } from "../utility/utils"
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';

import Cookies from 'js-cookie'

const loginURL = '/login';
const validateOtpUrl = '/validateOtp';
const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [msg, setMsg] = useState('')
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])
    const handleSubmit = async (values) => {
            let mobile = values.mobileNum
            if (startsWith(mobile, 0)) {
                mobile = mobile.substring(1);
            }
            // e.preventDefault();
            let Data = generateOtpData(mobile)
            try {
                const response = await axios.post(loginURL,
                    Data
                );
                console.log(response.headers)
                if (response.status === 'ok') {
                    setMsg('در حال انتقال به صفحه اصلی...')
                    setTimeout(() => setMsg(''), 5000)
                    navigate(from, { replace: true })
                }else{
                    setMsg('Username or password is wrong')
                }
                // setUser('');
                // setPwd('');
                // localStorage.setItem('Token', accessToken);
            } catch (err) {
                if (!err?.response) {
                    setErrMsg('خطای ارتباط با سرور');
                } else if (err.response?.status === 400) {
                    setErrMsg('شماره موبایل خود را وارد کنید');
                } else if (err.response?.status === 401) {
                    setErrMsg('Unauthorized');
                } else {
                    setErrMsg('Login Failed');
                }
                errRef.current.focus();
            }
        
    }


    return (
        <section dir='ltr' className='loginSec'>
            <p ref={errRef} className={errMsg ? "errmsg labels" : "offscreen labels"} aria-live="assertive">{errMsg}</p>
            <p className={msg ? "msg labels" : "offscreen labels"} aria-live="assertive">{msg}</p>
            <h1 className='labels' style={{ textAlign: 'center' }}>Login</h1>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
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
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{backgroundColor:'#8115e6',borderColor:'#8115e6' ,width:'100%'}}>
                        Log in
                    </Button>
                </Form.Item>
                Or <a href="" style={{color:'blue'}}>register now!</a>
            </Form>
            {/* <form onSubmit={handleSubmit}>
                <label htmlFor="username" className='labels'>لطفا شماره موبایل خود را وارد کنید</label>
                    <Input id='username' prefix={<PhoneOutlined />} required type={"number"} style={{direction:"ltr"}}/>
                <button className='iranYekan buttonGra' style={{color:'white',fontWeight:'700'}}>ورود</button>
            </form> */}
        </section>
    )
}

export default Login