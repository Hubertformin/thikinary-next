import React, {useState} from 'react';
import {BookStoreItem} from "../../models/book-store-item";
import SeoTags from "../../components/seo-tags";
import Toolbar from "../../components/toolbar";
import fire from "../../core/firebase-client";
import {formatBookPrice, getUserLocation} from "../../utils/location.util";
import {IpRegionModel} from "../../models/location-model";
import {Form, Input, Tabs} from "antd";
import {useUser} from "../../context/user-context";
import {loadStripe} from "@stripe/stripe-js/pure";
import {Elements} from "@stripe/react-stripe-js";
import "../../styles/Checkout.module.less";
import {StripeCheckoutForm} from "../../components/stripe-checkout";
import {MobileMoneyCheckoutForm} from "../../components/mobile-money-checkout";
import Footer from "../../components/footer/footer";

const stripePromise = loadStripe('pk_live_LfzdXc4Ua3PAkNWRYybWFqVM00SWnyEsg6');

function Checkout({region, book}: {region: IpRegionModel, book: BookStoreItem}) {
    const {user } = useUser();

    return(
        <Elements stripe={stripePromise}>
            <SeoTags title={`Buy ${book.title}`} description={book.title} imageUrl={book.thumbnails.medium} />
            <Toolbar user={user} />
            <main className="px-6 md:px-24 pt-8">
                <div className="checkout-view">
                    <div className="cart md:pt-8">
                        <div className="item">
                            <img src={book.thumbnails.small} alt=""/>
                            <div className="desc px-4">
                                <h1 className="title">{book.title}</h1>
                                <h1 className="author">{book.author.displayName}</h1>
                                <p className="price">{formatBookPrice(region.country_code, book)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="pay-info">
                        <Tabs defaultActiveKey="1">
                            <Tabs.TabPane tab="Debit card" key="1">
                                <div className="py-4">
                                    <StripeCheckoutForm book={book} />
                                </div>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Mobile money" key="2">
                                <div className="py-4">
                                    <MobileMoneyCheckoutForm />
                                </div>
                            </Tabs.TabPane>
                        </Tabs>
                    </div>
                </div>
            </main>
            <Footer/>
        </Elements>
    )

}

export async function getServerSideProps(ctx) {
    try {
        const book = await fire.firestore().collection('books').doc(ctx.params.id).get().then(snapshot => {
            const data = snapshot.data();
            data.addedDate = data.addedDate.seconds * 1000;
            data.publicationDate = data.publicationDate.seconds * 1000;
            return {id: snapshot.id, ...data}
        });

        const region = await getUserLocation();

        return {
            props: {
                region,
                book
            }
        }

    } catch (e) {
        console.error(e);
        return {
            props: {
                region: null,
                book: null
            }
        }
    }
}

export default Checkout;
