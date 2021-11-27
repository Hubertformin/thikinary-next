import React from 'react';
import {BookStoreItem} from "../../models/book-store-item";
import SeoTags from "../../components/seo-tags";
import Toolbar from "../../components/toolbar";
import "../../styles/StoreDetail.module.less";
import {formatBookPrice, getUserLocation} from "../../utils/location.util";
import fire from "../../core/firebase-client";
import {IpRegionModel} from "../../models/location-model";
import {formatDate} from "../../utils/date.util";
import Footer from "../../components/footer/footer";
import {FacebookIcon} from "react-share";
import Link from "next/link";

function StoreDetail({region, book}: {region: IpRegionModel, book: BookStoreItem}) {
    return(
        <>
         <SeoTags title={`Buy ${book?.title}`} description={book?.description} imageUrl={book?.thumbnails?.medium} />
         <Toolbar />
         <main id="store-detail" className="px-6 md:px-20 pb-16">
             <div className="book-row">
                 <div className="col-sm-6">
                     <div className="image-section md:h-full">
                         <img src={book.thumbnails.medium} alt={book.title} />
                     </div>
                 </div>
                 <div className="detail col-sm-6 py-6 md:py-10 md:h-full">
                     <h1 className="title text-2xl font-bold">{book.title}</h1>
                     <h4 className="author md:mb-4 mb-10">{book.author.displayName}</h4>
                     <h1 className="price text-theme-primary mb-4 md:mb-10">{formatBookPrice(region.country_code, book)}</h1>
                     <Link href={`/checkout/${book.id}`}>
                         <button className="btn w-full md:w-3/5">Buy</button>
                     </Link>
                     <p className="description mt-8">{book.description}</p>
                 </div>
             </div>
             <div className="book-detail my-6 py-6 px-6">
                 <div className="detail-item">
                     <p className="title"><strong>Publisher</strong></p>
                     <p>{book.publisher}</p>
                 </div>
                 <div className="detail-item">
                     <p className="title"><strong>Published on</strong></p>
                     <p>{formatDate(book.publicationDate)}</p>
                 </div>
                 <div className="detail-item">
                     <p className="title"><strong>ISBN</strong></p>
                     <p>{book.isbn}</p>
                 </div>
                 <div className="detail-item">
                     <p className="title"><strong>Pages</strong></p>
                     <p>{book.pages}</p>
                 </div>
             </div>
             <div className="author-section mt-10">
                 <h1 className="text-xl mb-6 text-center md:text-left">About the Author</h1>
                 <div className="author-detail">
                     <div className="image-container mb-4 md:mb-0">
                         <img src={book.author.photoURL} alt={book.author.displayName} />
                     </div>
                     <div className="details">
                         <p>{book.author.about}</p>
                         <div className="social py-6">
                             {
                                 book.author.facebookURL ? <a href={book.author.facebookURL} target="_blank">
                                     <FacebookIcon size={32} round={true} />
                                 </a> : null
                             }
                         </div>
                     </div>
                 </div>
             </div>
         </main>
            <Footer />
        </>
    );
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

export default StoreDetail;