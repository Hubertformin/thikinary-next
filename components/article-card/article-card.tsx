import React from "react";
import {formatDate} from "../../utils/date.util";
import './article-card.module.less';
import Link from "next/link";

export function ArticleCard({article}) {
    return (
        <Link href={`/post/${article.id}`}>
            <div key={`sm-${article.id}`} className="article-card">
                <div key={`sm-img-sc-${article.id}`}  className="image-section bg-gray-300">
                    <img key={`sm-img-${article.id}`}  src={article.thumbnails.small} alt=""/>
                </div>
                <div key={`sm-meta-${article.id}`}  className="meta-section py-4 px-4">
                    <a key={`sm-title-${article.id}`}  className="title text-lg">{article.title}</a>
                    <div 
                        key={`sm-prev-${article.id}`}  
                        className="preview-text" 
                        dangerouslySetInnerHTML={{ __html: article.content.slice(100)}}
                    />
                    <h4 key={`sm-subtitle-${article.id}`}  className="subtitle text-xs">{formatDate(article.date)}<span className="px-2">&bull;</span> {article.minsRead} minute{article.minsRead > 1 ? 's': ''} read</h4>
                </div>
            </div>
        </Link>
    );
}