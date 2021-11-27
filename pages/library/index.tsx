import React, {useEffect, useState} from 'react';
import Toolbar from "../../components/toolbar";
import SeoTags from "../../components/seo-tags";
import Link from "next/link";
import Footer from "../../components/footer/footer";
import {usersCollection} from "../../core/firebase-client";
import "../../styles/LibraryHome.module.less";

function LibraryHome({user}) {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        if (user) {
            if (books.length === 0) {
                usersCollection.doc(user.uid).collection('library').get()
                    .then(snapshot => {
                        const _books = snapshot.docs.map(bk => {
                            return {id: bk.id, ...bk.data()}
                        });
                        setBooks(_books);
                    });
            }
        }
    }, [user]);
    return(
        <>
            <SeoTags title={"My Library"} description={"View your library on thinkinary"} />
            <Toolbar user={user} />
            <main id="library-home" className="px-6 md:px-20 pb-6 md:pb-16">
                <div className="store-banner rounded-lg mb-4">
                    <h1 className="text-2xl title font-bold">My Library</h1>
                    <p className="text">All the books you purchase from the store will display here. Find more books at the &nbsp;
                        <Link href={"/store"}><a className="text-theme-primary">Store</a></Link>
                    </p>
                </div>
                <div className="books-section">
                    <h1 className="text-xl font-bold mb-6">All Books</h1>
                    <div className="book-grid">
                        {
                            books.map(book => {
                                return (
                                    <Link key={`bk-link-${book.id}`} href={`/library/${book.id}`}>
                                        <div key={`bk-item-${book.id}`} className="book-item">
                                            <div key={`img-sc-${book.id}`} className="image-section">
                                                <img key={`img-${book.id}`} src={book.thumbnails.small} alt=""/>
                                            </div>
                                            <div key={`meta-${book.id}`} className="meta">
                                                <h1 key={`title-${book.id}`} className="title">{book.title}</h1>
                                                <h4 key={`author-${book.id}`} className="author">{book.author.displayName}</h4>
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

export default LibraryHome;