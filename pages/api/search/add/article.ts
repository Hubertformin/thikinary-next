import corsBuilder from 'micro-cors';
import algoliasearch from 'algoliasearch';

const cors = corsBuilder();

const client = algoliasearch(process.env.ALGOLIA_APPID, process.env.ALGOLIA_APIKEY);
const articlesIndex = client.initIndex('articles_index');

const handler = async (req, res) => {
    const content = JSON.parse(req.body);
    // const type = req.query.type ? req.query.type : 'test';
    // basic validation
    if (!req.query.type) {
        res.status(400).json({error: true, message: 'Please specify operation type'});
    }
    
    switch (req.query.type) {
        case 'add':
        case 'update':
            if (!content) {
                res.status(400).json({error: true, message: 'No content submitted'});
            }
            if (content.length) {
                await articlesIndex.saveObjects(content)
                    .then(function() {
                        res.json({error: false, message: 'Records added to articlesIndex'});
                    }).catch(function (err) {
                    res.status(400).json({error: true, message: err});
                });
            } else {
                await articlesIndex.saveObject(content)
                    .then(function() {
                        res.json({error: false, message: 'Record added to articlesIndex'});
                    }).catch(function (err) {
                    res.status(400).json({error: true, message: err});
                });
            }
            break;
        case 'delete':
            const id = req.query.id;
            await articlesIndex.deleteObject(id)
                .then(function () {
                    res.json({error: false, message: 'record deleted from articlesIndex'});
                }).catch(function (err) {
                res.status(400).json({error: true, message: err});
            });
            break;
        default:
            res.status(400).json({error: true, message: 'Invalid type'});
    }
};

export default cors(handler);