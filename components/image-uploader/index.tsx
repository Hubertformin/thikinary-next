import { LoadingOutlined } from '@ant-design/icons';
import { Button, Input, message, Modal, Tabs } from 'antd';
import React from 'react';
import { Check } from 'react-feather';
import { UnSplashPhoto } from '../../models/unsplash';
import { getObjectURL, ImageKitService } from '../../utils/image';
import { generateNamedTransformation } from '../../utils/image-kit.util';
import Unsplash from '../../utils/unsplash';
import './ImageUploader.less';

interface EmitProps {
    type?: string;
    fileId?: string,
    url?: string,
    size?: number;
    thumbnails?: {
        small: string;
        large: string;
        medium: string;
        placeholder: string;
    }
}

interface ComponentProps {
    visible?: boolean;
    onClose?: () => void
    onChange?: (e: EmitProps) => void
}

export default function ImageUploader ({visible, onClose, onChange} : ComponentProps) {
    const inputRef = React.useRef();
    const [onlinePhotos, setOnlinePhotos] = React.useState<UnSplashPhoto[]>([]);
    const [isSearching, setIsSearching] = React.useState(false);
    const [selectedImageObject, setSelectedImageObject] = React.useState('');
    const [selectedOnlineImage, setSelectedOnlineImage] = React.useState<UnSplashPhoto>();
    const [isUploading, setIsUploading] = React.useState(false);

    React.useEffect(() => {
        setIsSearching(true);
        Unsplash.getRandom(21)
            .then(photos => {
                setOnlinePhotos(photos);
            }).finally(() => setIsSearching(false));
    }, []);

    function searchPhotos(query) {
        setIsSearching(true)
        Unsplash.searchPhotos(query, 21)
            .then(photos => {
                setOnlinePhotos(photos.results);
            })
            .finally(() => {
                setIsSearching(false);
            })
    }

    function importImage() {
        // @ts-ignore
        inputRef.current.click();
    }

    function onOnlineImgSelect(img: UnSplashPhoto) {
        console.log(img);
        setSelectedOnlineImage(img);
    }

    function onImportImage(e) {
        const file = e.target.files[0];
        console.log(file);
        setSelectedImageObject(file);
    }

    async function uploadAndEmitImage() {
        try {
            // show error message if user tries to update without
            if (!selectedImageObject && !selectedOnlineImage) {
                message.warn('Please select an image');
                return;
            }
            let response, _image_data: EmitProps;

            if (selectedImageObject) {
                 // 1. Upload image to imagekit or firebase
                const fileName = (selectedImageObject as any).name.split(' ').join('_').split('.')[0];
                // set uploading
                setIsUploading(true);
                response = await ImageKitService.upload(selectedImageObject, fileName);

                // emit urls
                _image_data = {
                    type: (selectedImageObject as any).type,
                    size: (selectedImageObject as any).size,
                    url: response.url,
                    fileId: response.fileId,
                    thumbnails: {
                        large: generateNamedTransformation(response.url, 'large'),
                        medium: generateNamedTransformation(response.url, 'medium'),
                        small: generateNamedTransformation(response.url, 'small'),
                        placeholder: generateNamedTransformation(response.url, 'placeholder'),
                    }
                }
            }

            if (selectedOnlineImage) {
                setIsUploading(true);
                response = await ImageKitService.upload(selectedOnlineImage.urls.full, selectedOnlineImage.id);

                // emit urls
                _image_data = {
                    type: null,
                    size: null,
                    url: response.url,
                    fileId: response.fileId,
                    thumbnails: {
                        large: generateNamedTransformation(response.url, 'large'),
                        medium: generateNamedTransformation(response.url, 'medium'),
                        small: generateNamedTransformation(response.url, 'small'),
                        placeholder: generateNamedTransformation(response.url, 'placeholder'),
                    }
                }
            }


            if (onChange) {
                onChange(_image_data);
                console.log(_image_data);
                // close modal
                if (onClose) {
                    onClose();
                }
            }
            // remove uploading
            // set uploading
            setIsUploading(false);
            return Promise.resolve();
        } catch (e) {
            console.error(e);
            message.warn('There is a problem upload the image, Please try again later');
            return Promise.reject(e.toString());
        }
    }

    return(
        <Modal
                visible={visible}
                title={"Import image"}
                closable={true}
                onCancel={() => onClose ?  onClose() : null}
                width={950}
                footer={[
                    <Button onClick={() => onClose ?  onClose() : null}>Close</Button>,
                    <Button onClick={uploadAndEmitImage} loading={isUploading} type="primary">Add</Button>
                ]}
                style={{height: '75vh', top: 0}}
                centered
            >
                <Tabs defaultActiveKey="dv-pane">
                    <Tabs.TabPane tab="From Device" key="dv-pane">
                        <section className="tab-pane">
                            <section className="tab-pane import-device" onClick={() => importImage()}>
                                { 
                                    selectedImageObject ?
                                    <img className="preview" src={getObjectURL(selectedImageObject)} />
                                    :
                                    <>
                                        <p className="mb-3">Upload images from your camera / gallery</p>
                                        <Button type="primary">Import</Button></>
                                }
                                <input type="file" onChange={(e) => onImportImage(e)} style={{display: 'none'}} accept="images/*" ref={inputRef} />
                            </section>
                        </section>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Online images" key="on-pane">
                        <section className="tab-pane">
                            {
                                onlinePhotos.length > 0 ?
                                    <>
                                        <div className="head">
                                            <Input.Search size="large" placeholder="Search.." enterButton loading={isSearching} onSearch={searchPhotos}  />
                                        </div>
                                        <div className="images-grid">
                                            {
                                                onlinePhotos.map((img, index) => {
                                                    return(
                                                        <div key={`img-card-${index}`} className="image-card position-relative cursor-pointer">
                                                            <div className="image-container">
                                                                {selectedOnlineImage?.id === img.id && 
                                                                    <div className="active-container">
                                                                        <Check color="#18d7c9" size={64} />
                                                                    </div>
                                                                }
                                                                <img key={`img-${index}`} src={img.urls.small} onClick={() => onOnlineImgSelect(img)} alt=""/>
                                                                <div className="overlay">
                                                                    <div className="text py-2 px-4">
                                                                        <p className="text-xs">By <a className="text-theme-primary" href={img.links.html} target="_blank">@{img.user.name}</a></p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            }
                                            
                                        </div>
                                    </> :
                                    <section className="loader">
                                        <LoadingOutlined spin style={{fontSize: 45}} />
                                        <p className="">Loading..</p>
                                    </section>
                            }
                        </section>
                    </Tabs.TabPane>
                </Tabs>
            </Modal>
    )
}