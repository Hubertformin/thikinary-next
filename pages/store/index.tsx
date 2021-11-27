import React, {useEffect, useState} from 'react';
import SeoTags from "../../components/seo-tags";
import Toolbar from "../../components/toolbar";
import "../../styles/StoreHome.module.less";
import {booksCollection} from "../../core/firebase-client";
import {BookStoreItem} from "../../models/book-store-item";
import Footer from "../../components/footer/footer";
import {useUser} from "../../context/user-context";
import {formatBookPrice, getUserLocation} from "../../utils/location.util";
import Link from "next/link";

function StoreHome({region, user}) {
    const [books, setBooks] = useState<BookStoreItem[]>([]);
    // const { loadingUser, user } = useUser();
    console.log(user);

    useEffect(() => {
        if (books.length === 0) {
            booksCollection.get()
                .then((snapshot) => {
                    const books = snapshot.docs.map(doc => {
                        return {id: doc.id, ...doc.data()};
                    });
                    setBooks(books);
                })
                .catch(err => {
                    console.error(err);
                })
        }
        // GET LOCATION

    }, []);

    return(
        <>
            <SeoTags title="Welcome to thinkinary store" />
            <Toolbar user={user} />
            <main id="store-home" className="px-6 md:px-20 pb-6 md:pb-16">
                <div className="store-banner rounded-lg mb-4">
                    <h1 className="text-2xl title font-bold">Hello{ !!user ?  ` ${user.displayName}` : ''},</h1>
                    <p className="text">Welcome to thinkinary store. All books you successfully purchase are automatically
                        added to your &nbsp;
                        <Link href={"/library"}><a className="text-theme-primary">Library</a></Link>
                    </p>
                </div>
                <div className="books-section">
                    <h1 className="text-xl font-bold mb-6">Featured</h1>
                    <div className="book-grid">
                        {
                            books.map(book => {
                                return (
                                    <Link key={`bk-link-${book.id}`} href={`/store/${book.id}`}>
                                        <div key={`bk-item-${book.id}`} className="book-item">
                                            <div key={`img-sc-${book.id}`} className="image-section">
                                                <img key={`img-${book.id}`} src={book.thumbnails.small} alt=""/>
                                            </div>
                                            <div key={`meta-${book.id}`} className="meta">
                                                <h1 key={`title-${book.id}`} className="title">{book.title}</h1>
                                                <h4 key={`author-${book.id}`} className="author">{book.author.displayName}</h4>
                                                <p key={`price-${book.id}`} className="price">{formatBookPrice(region.country_code, book)}</p>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    )
}

export async function getStaticProps() {
    try {
        const region = await getUserLocation();

        return {
            props: {region}
        }
    } catch (e) {
        console.error(e);
        return {
            props: {region: null}
        }
    }
}

export default StoreHome;
