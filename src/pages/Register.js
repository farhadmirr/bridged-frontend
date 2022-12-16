import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import axios from "../api/axios";


const USER_REGEX = /^[a-zA-z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const REGISTER_URL = "/sign-up"

const Register = () => {
    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('')
    const [validPwd, setValidPwd] = useState('')
    const [pwdFocus, setPwdFocus] = useState('')

    const [matchPwd, setMatchPwd] = useState('')
    const [validMatch, setValidMatch] = useState('')
    const [matchFocus, setMatchFocus] = useState('')

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [msg, setMsg] = useState('')

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user)
        setValidName(result)
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd)
        setValidPwd(result)
        const match = pwd === matchPwd
        setValidMatch(match)
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // a little bit more security 
        const v1 = USER_REGEX.test(user)
        const v2 = PWD_REGEX.test(pwd)
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return
        }
        try {
            const resposne = await axios.post(REGISTER_URL,
                JSON.stringify({ username: user, password: pwd }),
                {
                    headers: { 'Content-Type': "application/json" }
                }
            );
            console.log(resposne.data)
            setSuccess(true)
            //clear inpput fields
        } catch (err) {
            if (!err?.resposne){
                setErrMsg("No Server Response")
            } else if(err.resposne?.status===409){
                setErrMsg("Username is already taken")
            }else{
                setErrMsg("Registration Failed")
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
                <Form.Item
                    name="fullname"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Fullname!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="text"
                        placeholder="Fullname"
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

export default Register