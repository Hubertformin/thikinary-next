import React, {useState} from 'react';
import SeoTags from "../../components/seo-tags";
import '../../styles/Login.module.less';
import {Button, Form, Input} from "antd";
import Link from "next/link";
import {fireAuth} from "../../core/firebase-client";
import {useRouter} from "next/router";
import {fire} from "../../core";

function Login() {
    const router = useRouter();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState(null);

    function onBoardUser(prom: Promise<any>) {
        prom
            .then((userCred) => {
            const url = router.query.redirectTo || router.query.src || '/';
            // @ts-ignore
            router.push(url);
        })
            .catch(err => {
                setLoginError(err.message);
            }).finally(() => {
            setIsLoading(false);
        });
    }

    function loginUser() {
        const {email, password} = form.getFieldsValue();
        setIsLoading(true);
        // login user
        onBoardUser(fireAuth.signInWithEmailAndPassword(email, password));

    }

    function loginWithGoogle() {
        onBoardUser(fireAuth.signInWithPopup(new fire.auth.GoogleAuthProvider()));
    }

    function loginWithFB() {
        onBoardUser(fireAuth.signInWithPopup(new fire.auth.FacebookAuthProvider()));
    }

    return(
        <>
            <SeoTags title="Login on Thinkinary" />
            <section id="login-body" className="body">
                <div className="overlay">
                    <section className="form py-6 px-6 md:px-10">
                        <h1 className="font-krona text-theme-primary text-center text-xl mb-6">Thinkinary</h1>
                        {
                            loginError ? <div className="py-2 px-4 text-sm text-center rounded text-red-700 bg-red-100 mb-3">{loginError}</div> : null
                        }
                        <Form
                            form={form}
                            name="basic"
                            colon={false}
                            layout="vertical"
                            onFinish={loginUser}
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: 'Please input your email' }]}
                            >
                                <Input placeholder="Email" />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password' }]}
                            >
                                <Input.Password placeholder="Password" />
                            </Form.Item>

                            <Form.Item>
                                <Button loading={isLoading} style={{width: '100%'}} type="primary" htmlType="submit">Login</Button>
                            </Form.Item>
                        </Form>
                        <p className="text-sm">Don't have an account? <Link href="/auth/create-account"><a className="text-theme-primary">Create Account</a></Link></p>
                        <div className="py-4 text-center text-xs">Or login with</div>
                        <div className="actions flex justify-center">
                            <button className="social" onClick={loginWithGoogle}>
                                <img src="/images/google.svg" alt=""/>
                            </button>
                            <button className="social" onClick={loginWithFB}>
                                <img src="/images/facebook.svg" alt=""/>
                            </button>
                        </div>
                        
                    </section>
                </div>
            </section>
        </>
    )
}

export default Login;