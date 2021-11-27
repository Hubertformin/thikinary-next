import ImageKit from "imagekit";
import corsBuilder from 'micro-cors';

const cors = corsBuilder();

const handler = (req, res) => {
    const imagekit = new ImageKit({
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
        urlEndpoint: "https://ik.imagekit.io/thinkinary/"
    });
    const authenticationParameters = imagekit.getAuthenticationParameters();

    res.json(authenticationParameters);
};

export default cors(handler);