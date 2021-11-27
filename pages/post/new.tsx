import React, {useState} from 'react';
import Toolbar from "../../components/toolbar";
import '../../styles/NewPost.module.less';
import SeoTags from '../../components/seo-tags';
import {Button} from "antd";
import {UnSplashPhoto} from "../../models/unsplash";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import dynamic from 'next/dynamic';
import Loader from 'react-loader-spinner';
import ImageUploader from '../../components/image-uploader';


const ThinkinaryEditor = dynamic(() => import("../../components/editor/editor"), {
    ssr: false
});


function NewPost() {
    const [showPictureModal, setShowPictureModal] = useState(false);
    const [isDictationSupported, setIsDictationSupported] = useState(false);
    const [wordCount, setWordCount] = useState();
    const[coverImage, setCoverImage] = useState({});
    const[thumbnails, setThumbnails] = useState({small: '', medium: '', large: ''});

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();

    

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            document.querySelector('#toolbar').classList.add('bg-white');
        }
        if (browserSupportsSpeechRecognition) {
            setIsDictationSupported(true);
          }
    }, []);

    function openCoverPictureModal() {
        setShowPictureModal(true);
    }

    function onImageChange(data) {
        console.log(data);
        setCoverImage(data);
        setThumbnails(data.thumbnails)
    }

    const startDictation = () => {
        SpeechRecognition.startListening({ continuous: true });
    }

    const stopDictation = () => {
        SpeechRecognition.stopListening();
    }

    const wordCounter = (text) => {
        const wordArray = text.match(/\S+/g); // matches words according to whitespace
        return wordArray ? wordArray.length : 0;
    }

    async function onEditorChange(editor) {
        console.log(editor)
        setWordCount(wordCounter(editor.text));
        
    }

    function onSaveEditor(data) {
        console.log(data)
    }

    return (
        <>
            <SeoTags title="Write a new post" />
            <Toolbar scrolled={true} hidePostBtn={true} />
            <section id="page-body">
                {/* <div className="upload-container py-6">
                    <img src="/images/upload.jpg" alt=""/>
                    <button className="btn" onClick={openCoverPictureModal}>Add cover image</button>
                </div>
                {/* <div className="title-body">
                    <textarea className="title-text rounded" placeholder="Title"/>
                </div>*/}
                <div id="edit-section">
                    <textarea className="title-text rounded" placeholder="Title"/>
                    <div id="editor-container">
                        <ThinkinaryEditor
                            content={transcript}
                            onChange={onEditorChange}
                            // onSave={onSaveEditor}
                        />
                </div>
                </div>

                <div id="action-container" className="px-6 pt-2">
                    <div className="action-btns pb-10">
                        <Button type="primary" block>Publish</Button>
                    </div>

                    <div id="cover-image" className="action-section pb-6">
                    <div className="flex align-start">
                            <h2 className="text-lg font-bold mr-1">Cover image</h2>
                        </div>
                        <img 
                            src={thumbnails.medium ? thumbnails.medium : "/images/upload.jpg"} 
                            className="p-2 rounded-lg cover-image"
                            alt=""
                        />
                        <Button type="link" onClick={openCoverPictureModal}>
                            {thumbnails.medium ? 'Change cover image' : 'Add cover image'}
                        </Button>
                    </div>

                    { isDictationSupported &&<section id="dictation-action" className="action-section">
                        <div className="flex align-start">
                            <h2 className="text-lg font-bold mr-1">Dictation</h2>
                            <small className="font-bold text-theme-primary">BETA</small>
                        </div>
                        <p>With Dication, you can speak out your article and your speech will be converted to text.</p>
                        <div className="pb-8" >
                           { listening ?
                            <>
                             <Loader
                                type="Rings"
                                color="#3CB89D"
                                height={65}
                                width={65}
                             />
                             <Button type="link" onClick={stopDictation} style={{paddingLeft: 0, marginTop: '10px'}} danger>Stop Dictation</Button>
                            </> :
                            <Button type="link" onClick={startDictation} style={{paddingLeft: 0}}>{transcript ? 'Continue Dictating..' : 'Start Dictation'}</Button>
                          }
                            {transcript &&  <Button type="link" onClick={resetTranscript}>Reset dictation text</Button>}
                        </div>
                    </section>}

                    <section id="word-count" className="py-6">
                        {wordCount && <p>{`${wordCount} ${wordCount > 1 ? 'words' : 'word'}`}</p>}
                    </section>

                </div>

            </section>

            {/* <div style={{zIndex: 11001}}>
            <Footer />
            </div> */}
            <ImageUploader 
                visible={showPictureModal} 
                onClose={() => setShowPictureModal(false)} 
                onChange={onImageChange}
            />

        </>
    );
}

export default NewPost;
