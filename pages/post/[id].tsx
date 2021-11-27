import React, {useState} from 'react';
import Toolbar from "../../components/toolbar";
import Footer from "../../components/footer/footer";
import '../../styles/ArticleView.module.less';
import {fire} from "../../core";
import SeoTags from "../../components/seo-tags";
import {formatDate} from "../../utils/date.util";
import {Share, Bookmark, ChevronRight} from "react-feather";
import {Drawer, message, Popover, Comment, Avatar, Button} from "antd";
import {LinkOutlined} from "@ant-design/icons/lib";
import {
    TwitterIcon,
    FacebookIcon, WhatsappIcon,
    LinkedinIcon, WhatsappShareButton,
    FacebookShareButton,
    TwitterShareButton, LinkedinShareButton} from 'react-share';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import TextArea from "antd/lib/input/TextArea";
import {ArticleModel} from "../../models/articles";
import {UserModel} from "../../models/user-model";
import {articlesCollection} from "../../core/firebase-client";
import {ArticleComment} from "../../models/comments";
import {showAvatar} from "../../utils/image";

function ArticleView({article, user}: {article: ArticleModel, user: UserModel}) {
    const [commentsVisible, setCommentsVisible] = useState(false);
    const [comments, setComments] = useState([]);

    // console.log(article);

    const socialButtons = (
        <ul className="social-links">
            <li>
                <FacebookShareButton title="Facebook" url={`https://thinkinary.com/post/${article.id}`}>
                    <div className="text"><FacebookIcon size={32} round={true} />&nbsp;Facebook</div>
                </FacebookShareButton>
            </li>
            <li>
                <TwitterShareButton url={`https://thinkinary.com/post/${article.id}`}>
                    <div className="text"><TwitterIcon size={32} round={true} />&nbsp;Twitter</div>
                </TwitterShareButton>
            </li>
            <li>
                <LinkedinShareButton url={`https://thinkinary.com/post/${article.id}`}>
                    <div className="text"><LinkedinIcon size={32} round={true} />&nbsp;LinkedIn</div>
                </LinkedinShareButton>
            </li>
            <li>
                <WhatsappShareButton url={`https://thinkinary.com/post/${article.id}`}>
                    <div className="text"><WhatsappIcon size={32} round={true} />&nbsp;WhatsApp</div>
                </WhatsappShareButton>
            </li>
            <li>
                <CopyToClipboard text={`https://thinkinary.com/post/${article.id}`}
                                 onCopy={() => message.success('Copied to clipboard')}>
                    <button><LinkOutlined />&nbsp;Copy link</button>
                </CopyToClipboard>

            </li>
        </ul>
    );

    function openCommentDrawer() {
        if (comments.length === 0) {
            articlesCollection.doc(article.id).collection('comments').get()
                .then(payload => {
                   const _comments = payload.docs.map(doc => {
                       return {id: doc.id, ...doc.data()}
                   });
                   setComments(_comments);
                });
        }
        setCommentsVisible(false);
    }

    return(
        <>
            <SeoTags title={article.title} description={article.text?.slice(200)} imageUrl={article.thumbnails?.medium || 'https://ik.imagekit.io/thinkinary/placeholder_s5F47pbrD3I.png'} />
            <Toolbar light={true} />
            <div className="cover-image">
                <div className="overlay"></div>
                <img src={article.thumbnails?.large} alt={article.title} />
            </div>
            <div className="body">
                <div className="article-body bg-white px-6 md:px-16 pt-6 md:my-16 md:pt-16">
                    <h1 className="title">{article.title}</h1>
                    <div className="author py-6">
                        <img src={showAvatar(article.author.photoURL)} onError={() => '/images/default-user-avatar.png'} alt=""/>
                        <div className="pl-2">
                            <h1 className="name">{article.author.displayName}</h1>
                            <p className="date"><span>{formatDate(article.date)}</span> <span className="px-2">&bull;</span> <span className="">{`${article.minsRead} minute${article.minsRead > 1 ? 's': ''} read`}</span></p>
                        </div>
                        <div className="actions flex">
                            <Popover placement="bottom" content={socialButtons} title="Share" trigger="click">
                                <span className="px-2 cursor-pointer">
                                    <Share />
                                </span>
                            </Popover>
                            <span className="px-2">
                                <Bookmark/>
                            </span>
                        </div>
                    </div>
                    <div className="content pb-4" dangerouslySetInnerHTML={{__html: article.content}}></div>
                    <div className="tags">
                        {
                            article.tags.map(tag => <div key={tag} className="tag">{tag}</div>)
                        }
                    </div>
                </div>
                <div className="comments-section pt-4 pb-16">
                    <div className="comment-body px-6">
                        <div className="author py-6">
                            <img src={showAvatar(article.author.photoURL)} onError={() => '/image/default-user-avatar.png'} alt=""/>
                            <div className="pl-2">
                                <h1 className="name">{article.author.displayName}</h1>
                                <p className="date">{formatDate(article.date)}</p>
                            </div>
                            <div className="actions flex">
                                <Popover placement="bottom" content={socialButtons} title="Share" trigger="click">
                                <span className="px-2 cursor-pointer">
                                    <Share />
                                </span>
                                </Popover>
                                <span className="px-2">
                                <Bookmark/>
                            </span>
                            </div>
                        </div>
                        <div onClick={() => setCommentsVisible(true)} className="comments-card my-6 cursor-pointer shadow rounded bg-white flex justify-between py-6 px-6">
                            <p className="m-0">Comments ({article.commentsCount})</p>
                            <ChevronRight />
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        {/*    comments drawer*/}
            <Drawer
                title="Comments"
                width={720}
                onClose={() => openCommentDrawer()}
                visible={commentsVisible}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                    <div className="flex" style={{alignItems: 'center'}}>
                        <TextArea placeholder={'Type comment..'}  />
                        <div className="px-2"/>
                        <Button type={"primary"}>Add Comment</Button>
                    </div>
                }
            >
                {
                    comments.map(com => {
                        console.log(com);
                        return(
                            <ThinkinaryComment comment={com}>
                                {
                                    com.children?.map(child => {
                                       return(
                                           <ThinkinaryComment comment={child}></ThinkinaryComment>
                                       );
                                    })
                                }
                            </ThinkinaryComment>
                        );
                    })
                }
            </Drawer>
        </>
    )
}

function ThinkinaryComment({ comment, children = null }: {comment: ArticleComment, children?: any}) {
    return (
        <Comment
            actions={[<span key="comment-nested-reply-to">Reply to</span>]}
            author={<a>{comment.author.displayName}</a>}
            avatar={
                <Avatar
                    src={comment.author.photoURL}
                />
            }
            content={
                <p dangerouslySetInnerHTML={{__html: comment.content}}></p>
            }
        >
            {children}
        </Comment>
    );
}

export default ArticleView;

export async function getServerSideProps(ctx) {

    const article = await fire.firestore().collection('articles')
        .doc(ctx.query.id)
        .get()
        .then(doc => {
            // const date = doc.get('date').toDate();
            const data = doc.data();
            const id = doc.id;
            data.date = data.date.seconds * 1000;
            return {id, ...data};
        }).catch(err => {
            console.error(err);
            return {}
        });

    // console.log(article);
    return {
        props: {
            article
        }
    }
}
