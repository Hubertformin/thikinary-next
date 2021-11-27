export function generateArticleDynamicURL(urlID, title, description, imageUrl): Promise<any> {
  return fetch(`https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyCwQl0cfr_i5LXv5z2xmW6Jv-biB6iRjIA`, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({
      // "longDynamicLink": makeDynamicLongLink(article.urlID, socialTitle, socialDescription, socialImageUrl)
      dynamicLinkInfo: {
        domainUriPrefix: 'https://thinkinary.page.link',
        link: 'https://thinkinary.com/article/' + urlID,
        androidInfo: {
          androidPackageName: 'com.thinkinary.android'
        },
        iosInfo: {
          iosBundleId: 'com.thinkinary.ios'
        },
        socialMetaTagInfo: {
          socialTitle: title,
          socialDescription: description,
          socialImageLink: imageUrl
        }
      },
      suffix: {
        option: 'SHORT'
      }
    }),
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).then((res) => {
    return res.json();
  });
}
