import Head from 'next/head'
import '../styles/Home.module.less'
import Toolbar from "../components/toolbar";
import React, {useEffect, useState} from "react";
import {fire} from '../core';
import {ArticleCard} from "../components/article-card/article-card";
import {ArticleModel} from "../models/articles";
import {TagModel} from "../models/tags";
import {TagChip} from "../components/tag";
import Footer from "../components/footer/footer";
import {formatDate} from "../utils/date.util";
import Link from "next/link";
import {articlesCollection} from "../core/firebase-client";
import { shuffleArray } from '../utils/numbers';
import { Carousel } from 'antd';
import { getReadTime } from '../utils/read-time';

export default function Home({fetchError, articles, tags = []}) {

    const [trendingArticles, setTrendingArticles] = useState<ArticleModel[]>([]);
    const [firstTopArticles, setFirstTopArticles] = useState<ArticleModel[]>([]);
    const [secondTopArticles, setSecondTopArticles] = useState<ArticleModel[]>([]);
    // const [tags, setTags] = useState<TagModel[]>([]);

    useEffect(() => {

        // if (trendingArticles.length === 0) {
        //     articlesCollection
        //         .limit(5)
        //         .orderBy('reads', "desc")
        //         .onSnapshot((snapshot) => {
        //             const docs: ArticleModel[] = snapshot.docs.map((doc) => {
        //                 const date = doc.get('date').toDate();
        //                 const data = doc.data() as ArticleModel;
        //                 const id = doc.id;
        //                 data.date = date;
        //                 return {id, ...data};
        //             });
        //             setTrendingArticles(docs);
        //             console.log(docs);
        //         });
        // }
        // get if only articles has not been read
        if (firstTopArticles.length ===0 && secondTopArticles.length === 0) {
            // fire.firestore().collection('articles')
            //     .limit(12)
            //     .orderBy('date', "desc")
            //     .onSnapshot((snapshot) => {
            //         const docs: ArticleModel[] = articles.map((doc) => {
            //             const date = doc.get('date').toDate();
            //             const data = doc.data() as ArticleModel;
            //             const id = doc.id;
            //             data.date = date;
            //             return {id, ...data};
            //         });
            //     });
           
            // shuffle recent articles and add to trending section
            const _trendingArticles = shuffleArray<ArticleModel[]>(articles);

            setTrendingArticles(_trendingArticles.slice(0, 5))
            //
            setFirstTopArticles(articles.slice(0, 4));
            setSecondTopArticles(articles.slice(4));
            // console.log(docs);
        }
        // if no do
        // if (secondTopArticles.length === 0) {
        //     fire.firestore().collection('tags')
        //         .limit(5)
        //         .onSnapshot((snapshot) => {
        //             const docs = snapshot.docs.map(doc => doc.data());
        //             setTags(docs);
        //         });
        // }
    }, []);

  return (
    <>
      <Head>
        <title>Welcome to thinkinary home</title>
      </Head>
      <Toolbar />
      <main className="pt-8">
          <section id="carousel" className="md:px-10 xl:px-10">
            <Carousel autoplay={true} effect="fade">
                {
                  trendingArticles.map((article, index) => {
                      return(
                        <div key={`trending-card-` + index} className="carousel-card">
                            <img src={article.thumbnails.medium} alt="" className="cover" />
                            <div key={`trc-text` + index} className="text-overlay">
                            <Link key={`ca-${article.id}`} href={"/post/" + article.id}>
                                <a key={`trc-title` + index} className="title">{article.title}</a>
                            </Link>
                            <p key={`trc-date` + index} className="date">{formatDate(article.date)}</p>
                            </div>
                        </div>
                      );
                  })
                }
            </Carousel>
          </section>
          {/* <section className="trending-section md:px-16 pl-6">
              {
                  trendingArticles.map((article, index) => {
                      return(
                          <Link key={`tr-${article.id}`} href={"/post/" + article.id}>
                              <div key={`trending-card-` + index} className="card" style={{backgroundImage: `url(${article.thumbnails.medium})`}}>
                                  <div key={`trc-text` + index} className="text-overlay">
                                      <a key={`trc-title` + index} className="title">{article.title}</a>
                                      <p key={`trc-date` + index} className="date">{formatDate(article.date)}</p>
                                  </div>
                              </div>
                          </Link>
                      );
                  })
              }
          </section> */}
          <section className="body px-6 md:px-10 xl:px-10 mt-8 md:mt-16 pb-20">
              <div className="top-articles">
                  <div className="header mb-6">
                      <h1 className="text-lg py-2">Top Articles</h1>
                  </div>
                  <div className="articles-grid px-10 py-10 bg-white">
                      {
                          firstTopArticles.map((article) => {
                              return ArticleCard({article});
                          })
                      }
                  </div>
                  <div className="tags py-6 md:py-16 px-8 text-center">
                      {
                          tags.map((data, index) => {
                              return TagChip({key: index, name: data.name});
                          })
                      }
                  </div>
                  <div className="articles-grid px-10 py-10 bg-white">
                      {
                          secondTopArticles.map((article) => {
                              return ArticleCard({article});
                          })
                      }
                  </div>
              </div>
          </section>
      </main>
        {/*show footer*/}
        <Footer/>
    </>
  )
}

export async function getServerSideProps() {
    try {
        const _first = await fire.firestore().collection('articles')
        .limit(20)
        .orderBy('date', "desc")
        .get();

        const _tags = await fire.firestore().collection('tags')
        .limit(5)
        .get();


        return {
            props: {
                fetchError: false,
                articles: _first.docs.map(doc => {
                    return {
                        id: doc.id, 
                        ...doc.data(), 
                        date: doc.data().date.seconds * 1000
                    }
                }),
                tags: _tags.docs.map(doc => ({id: doc.id, ...doc.data()}))
            }
        }
    } catch (e) {
        return {
            fetchError: true,
            articles: [],
            tags: []
        }
    }
    
}



// function calculateReadTime() {
//     articlesCollection.get()
//     .then((articles) => {
//         articles.docs.forEach(async (article) => {
//             let _article = article.data();
//             _article.minsRead = getReadTime(_article.text);
//             // console.log(article.id, _article)
//             // update doc
//             await articlesCollection.doc(article.id).update(_article);
//             console.log('updated')
//         });
//     })
// }