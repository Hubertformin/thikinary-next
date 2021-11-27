import corsBuilder from 'micro-cors';
import ImageKit from "imagekit";

const cors = corsBuilder();

const handler = (req, res) => {
    const imagekit = new ImageKit({
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
        urlEndpoint: "https://ik.imagekit.io/thinkinary/"
    });
    
    imagekit.deleteFile(req.query.fileId)
        .then(() => {
            res.json({status: 'ok', message: 'File deleted'});
        })
        .catch((err) => {
            res.status(400).json({error: err});
        });
};

export default cors(handler);