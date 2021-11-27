import React, {useEffect} from "react";
import '../styles/toolbar.module.less';
import {FacebookOutlined, InstagramOutlined, TwitterOutlined, MenuOutlined, CaretDownOutlined} from '@ant-design/icons';
import {formatImageUrl} from "../utils";


function Toolbar({minimize, noShadow = true}) {
    let authUser, hidePostButton, userClaims;
    useEffect(() => {
    }, []);
    // listen to page scroll
    if (typeof window !== "undefined") {
        window.onscroll = (ev) => {
            if (window.scrollY >= 128) {
                document.querySelector('#toolbar').classList.add('scrolled');
                document.getElementsByTagName('main')[0].classList.add('scrolled');
            } else {
                if (!minimize) {
                    document.querySelector('#toolbar').classList.remove('scrolled');
                    document.getElementsByTagName('main')[0].classList.remove('scrolled');
                }
            }
        };
    }
    // return
    return (
        <section id="toolbar" className={`${minimize ? "scrolled" : ""} ${noShadow ? "" : "toolbar-shadow"}`}>
            <section id="toolbar-container">
                <section id="tip">
                    <section className="tip-body">
                        <div className="tip-list social-icons">
                            <ul className="tip-list">
                                <li>
                                    <a href="https://facebook.com/thinkinary" target="_blank">
                                        <FacebookOutlined />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://twitter.com/thinkinary" target="_blank">
                                        <TwitterOutlined />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://instagram.com/thinkinary" target="_blank">
                                        <InstagramOutlined />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="links">
                            <ul className="tip-list">
                                {/*<li>Do you want to become a published author? <a href="https://publishing.thinkinary.com" target="_blank" class="text-theme-primary">Learn more</a></li>*/}
                            </ul>
                            {/*<ul class="tip-list">
                              <li><a href="/">Home</a></li>
                              <li><a href="/about">About</a></li>
                              <li><a href="mailto:support@thinkinary.com">Contact</a></li>
                            </ul>
                            <ng-template *ngIf="authUser;else authOptions">
                              <ul class="tip-list">
                                <li class="no-padding"><span>|</span></li>
                                <li><a href="/publish/new">Write a post</a></li>
                              </ul>
                            </ng-template>
                            <ng-template #authOptions>
                              <ul class="tip-list">
                                <li ><a href="/auth/login">Login</a></li>
                                <li *ngIf="!authUser"><a href="/auth/create-account">Create account</a></li>
                              </ul>
                            </ng-template>*/}
                        </div>
                    </section>
                </section>
                <section id="nav" className="relative">
                    <a className="nav-brand font-krona text-wrap text-theme-primary" href="home">
                        <span className="animated zoomInDown">Thinkinary</span>
                    </a>
                    <div className="nav-container">
                        <ul className="nav-links menu-list">
                            <li style={{fontSize: '21px'}}><MenuOutlined /></li>
                        </ul>
                        <ul id="main-links" className="nav-links">
                            <li><a href="/" className="active">Home</a></li>
                            <li><a href="/about">About</a></li>
                            <li>
                                <a href="/store">Store</a>
                            </li>
                            {!authUser ? <li><a href="/auth/login">Login</a></li> : null}
                            {!authUser ? <li><a href="/auth/create-account">Create account</a></li> : null}
                        </ul>
                        <ul className="nav-links right">
                            {!hidePostButton ? <li className="hide-sm">
                                <a href="/publish/new" className="write-action btn primary">Write a post</a>
                            </li> : null}
                            <li className="profile dropdown" style={{paddingRight: 0}}>
                                <span className="img-con"><img src={formatImageUrl(authUser?.photoURL)} /></span>
                                <span className=" display-name">{authUser?.displayName}</span>&nbsp;
                                <CaretDownOutlined />
                                {/*dropdown if authenticated*/}
                                {authUser ? <div className="dropdown-content">
                                    <a href="/publish/new">Write a post</a>
                                    <a href="/my-account">My Account</a>
                                    <a href={'/user/' + (authUser.uid)}>My Posts</a>
                                    <a href={'/library'}>My Library</a>
                                    {userClaims?.admin ? <a href="https://admin.thinkinary.com" target="_blank">Dashboard</a> : null}
                                    <a href="javascript:void(0)">Log out</a>
                                </div> : null}
                                {!authUser ?
                                    <div className="dropdown-content">
                                        <a href="/auth/login">Login</a>
                                        <a href="/auth/create-account">Create account</a>
                                    </div>
                                    : null}
                            </li>
                        </ul>
                    </div>
                </section>
            </section>
        </section>
    );
}
