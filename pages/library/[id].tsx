import React from 'react';
import SeoTags from "../../components/seo-tags";
import fire from "../../core/firebase-client";
import {BookStoreItem} from "../../models/book-store-item";
import dynamic from "next/dynamic";
import Toolbar from "../../components/toolbar";

const ReactReader = dynamic(
    () => import('react-reader').then((res) => res.ReactReader),
    { ssr: false }
);


function LibraryRead({book}: {book: BookStoreItem}) {
    return(
        <>
            <SeoTags title={`Reading: ${book?.title}`} />
            <Toolbar scrolled={true} />
            <div style={{ position: "relative", height: "calc(100vh - 65px)", marginTop: '65px' }}>
                <ReactReader
                    url={book.bookUrl}
                    title={book.title}
                    location={"epubcfi(/6/2[cover]!/6)"}
                    locationChanged={epubcifi => console.log(epubcifi)}
                />
            </div>
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

        return {
            props: {
                book
            }
        }

    } catch (e) {
        console.error(e);
        return {
            props: {
                book: null
            }
        }
    }
}

export default LibraryRead;