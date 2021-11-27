import React, {useEffect, useState} from 'react';
import SeoTags from "../../components/seo-tags";
import "../../styles/CreateAccount.module.less";
import {Button, Col, Form, Input, Row} from "antd";
import Link from "next/link";
import {useRouter} from "next/router";
import {useUser} from "../../context/user-context";
import {fireAuth, usersCollection} from "../../core/firebase-client";
import {fire} from "../../core";

function CreateAccount() {
    const router = useRouter();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState(null);

    function createAccount() {
        const {email, password, displayName} = form.getFieldsValue();
        setIsLoading(true);


        // login user
        fireAuth.createUserWithEmailAndPassword(email, password)
            .then((userCred) => {
                userCred.user.updateProfile({displayName: displayName});
                //send data to cloud functions
                onBoardUser(usersCollection.doc(userCred.user.uid).set({displayName, email, articlesCount: 0}));
            })
            .catch(err => {
                setLoginError(err.message);
            }).finally(() => {
            setIsLoading(false);
        });
    }

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

    function loginWithGoogle() {
        fireAuth.signInWithPopup(new fire.auth.GoogleAuthProvider())
            .then((userCred) => {
                //send data to cloud functions
                onBoardUser(usersCollection.doc(userCred.user.uid).set({displayName: userCred.user.displayName, email: userCred.user.displayName}));
            })
            .catch(err => {
                setLoginError(err.message);
            }).finally(() => {
                setIsLoading(false);
            });
    }

    function loginWithFB() {
        fireAuth.signInWithPopup(new fire.auth.FacebookAuthProvider())
            .then((userCred) => {
                //send data to cloud functions
                onBoardUser(usersCollection.doc(userCred.user.uid).set({displayName: userCred.user.displayName, email: userCred.user.displayName}));
            })
            .catch(err => {
                setLoginError(err.message);
            }).finally(() => {
            setIsLoading(false);
        });
    }

    return(
        <>
            <SeoTags title="Create your account to get started" />
            <section id="signup-body" className="body">
                <div className="overlay xl:px-40">
                    <section className="overlay-text px-6 py-2">
                        <h1 className="title">The Creative space..</h1>
                        <p className="text">
                            Thinkinary is home for creatives like you willing to share knowledge and expiriences.
                            Join us to toady to share your perspective.
                        </p>
                    </section>
                    <section className="form py-6 px-6 md:px-10">
                        <h1 className="font-krona text-theme-primary text-center text-xl mb-4">Thinkinary</h1>
                        {
                            loginError ? <div className="py-2 px-4 text-sm text-center rounded text-red-700 bg-red-100 mb-3">{loginError}</div> : null
                        }
                        <Form
                            form={form}
                            name="basic"
                            colon={false}
                            layout="vertical"
                            onFinish={createAccount}
                        >
                            <Row gutter={15}>
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        label="Name"
                                        name="displayName"
                                        hasFeedback
                                        rules={[{ required: true, message: 'Please input your name!' }]}
                                    >
                                        <Input placeholder="Email" />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        hasFeedback
                                        rules={[{ required: true, message: 'Please input your email' }]}
                                    >
                                        <Input placeholder="Email" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item
                                label="Password"
                                name="password"
                                hasFeedback
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password placeholder="Password" />
                            </Form.Item>

                            <Form.Item
                                label="Confirm password"
                                name="confirmPassword"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(rule, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject('Passwords do not match!');
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password placeholder="Password" />
                            </Form.Item>

                            <Form.Item>
                                <Button loading={isLoading} style={{width: '100%'}} type="primary" htmlType="submit">Login</Button>
                            </Form.Item>
                        </Form>
                        <p className="text-sm">Have an account? <Link href="/auth/login"><a className="text-theme-primary">Login</a></Link></p>
                        <div className="py-4 text-center text-xs">Or continue with</div>
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
    );
}

export default CreateAccount;