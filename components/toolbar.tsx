import React, {useEffect, useState} from "react";
import '../styles/toolbar.module.less';
import { MenuOutlined} from '@ant-design/icons';
import Link from "next/link";
import {Drawer, Dropdown} from "antd";
import {fireAuth} from "../core/firebase-client";
import {useRouter} from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../store/actions/auth";


function onImageLoadError(e) {
 e.target.onerror = null;
 e.target.src = '/images/default-user-avatar.png';
}

function Toolbar({light = false, scrolled = false, keepExpanded = false, hidePostBtn = false}) {
    const router = useRouter();
    const dispatch = useDispatch();
    // @ts-ignore
    const user = useSelector((state)=> state.authUser);

    useEffect(() => {
        fireAuth.onAuthStateChanged((user) => {
            //  console.log(user);
             // setUser(user);
             dispatch(setAuthUser(user));
         });
    }, []);
    // listen to page scroll
    if (!scrolled && !keepExpanded) {
        if (typeof window !== "undefined") {
            window.onscroll = (ev) => {
                // console.log(window.scrollY);
                if (window.scrollY >= 75) {
                    document.querySelector('#toolbar').classList.add('scrolled');
                    if (light) document.querySelector('#toolbar').classList.remove('dark');
                } else {
                    document.querySelector('#toolbar').classList.remove('scrolled');
                    if (light) document.querySelector('#toolbar').classList.add('dark');
                }
            };
        }
    } else if(scrolled && !keepExpanded) {
        if (typeof window !== "undefined") {
            document.querySelector('#toolbar').classList.add('scrolled');
        }
    }
    // return
    let [drawerVisible, setDrawerVisible] = useState(false);

    function logOut() {
        fireAuth.signOut()
            .then(() => {
                router.push("/");
            })
            .catch(err => {
                console.error(err);
            });
    }

    const authMenu = (
        <div className="auth-dropdown px-4 py-4 rounded-lg shadow-lg bg-white">
            <div className="header text-center border-b pb-4 mb-4">
                <img src={user?.photoURL} onError={onImageLoadError} />
                <h1 className="text-lg font-bold">{user?.displayName}</h1>
            </div>
            <ul className="links">
                <li>
                    <Link href="/library">
                        <a>Dashboard</a>
                    </Link>
                </li>
                <li>
                    <Link href={`/account/${user?.uid}`}>
                        <a>My Posts</a>
                    </Link>
                </li>
                <li>
                    <Link href="/library">
                        <a>Library</a>
                    </Link>
                </li>
                <li>
                    <Link href="/my-account">
                        <a>Account</a>
                    </Link>
                </li>
                <li>
                    <button onClick={() => logOut()}>Log out</button>
                </li>
            </ul>
        </div>
    );

    return (
        <>
            <section id="toolbar" className={light ? 'dark' : ''}>
                <nav>
                    <ul>
                        <li>
                            <a className="brand">
                                <span className="text-theme-primary text-xl md:hidden" onClick={() => setDrawerVisible(true)}><MenuOutlined /></span>
                                <img className="hidden md:block" src="/images/logo.png" alt=""/>&nbsp;
                                <span className="font-krona">Thinkinary</span>
                            </a>
                        </li>
                    </ul>
                    {/*links for md screens and larger*/}
                    <ul className="links">
                        <li>
                            <Link href={"/"}>
                                <a>Stories</a>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/store"}>
                                <a>Store</a>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/post/new"}>
                                <a>Write</a>
                            </Link>
                        </li>
                    </ul>
                    {
                        user ?
                            <ul className="auth">
                                {!hidePostBtn && 
                                <li className="hidden md:block">
                                    <Link href={"/post/new"}>
                                        <button className="btn">Write a post</button>
                                    </Link>
                                </li> }
                                <li>
                                    <Dropdown overlay={authMenu} trigger={["click"]} placement="bottomRight">
                                        <img src={user?.photoURL} alt={user?.displayName} />
                                    </Dropdown>
                                </li>
                            </ul> :
                            <ul className="links">
                                <li className="pr-3">
                                    <Link href={"/auth/login"}>
                                        <button className="btn-outline">Login</button>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/auth/create-account"}>
                                        <button className="btn">Get started</button>
                                    </Link>
                                </li>
                            </ul>
                    }
                </nav>
            </section>
            <Drawer
                placement="left"
                closable={true}
                visible={drawerVisible}
                onClose={() => setDrawerVisible(false)}
                key="m_drawer"
            >
                <div className="header text-center">
                    <h1 className="text-theme-primary font-krona">Thinkinary</h1>
                </div>
                <ul className="drawer-links">
                    <li>
                        <Link href={"/"}>
                            <a>Home</a>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/store"}>
                            <a>Store</a>
                        </Link>
                    </li>
                    {
                        user ? <li>
                                <Link href={"/post/new"}>
                                    <a>Write</a>
                                </Link>
                            </li> :
                            <>
                                <li className="pr-3">
                                    <Link href={"/auth/login"}>
                                        <button className="btn-outline">Login</button>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/auth/create-account"}>
                                        <button className="btn">Get started</button>
                                    </Link>
                                </li>
                            </>
                    }
                </ul>
            </Drawer>
        </>
    );
}

export default Toolbar;
