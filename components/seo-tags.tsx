import React from 'react';
import {NextSeo} from "next-seo";


function SeoTags({title, description = "", imageUrl = "https://ik.imagekit.io/thinkinary/logo_8f-0ly4nN.png"}) {
  return(
      <NextSeo
          title={`${title} - Thinkinary`}
          description={description}
          canonical="https://www.canonical.ie/"
          openGraph={{
            url: 'https://www.thinkinary.com',
            title,
            description,
            images: [
              {
                url: imageUrl ? imageUrl : '',
                width: 800,
                height: 600,
                alt: 'thinkinary',
              }
            ],
            site_name: 'Thinkinary',
          }}
      />
  )
}

export default SeoTags;