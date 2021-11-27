import React, { useEffect, useState } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import './editor.module.less';
import {toolbarOptions} from "./toolbar-options";
import debounce from 'lodash/debounce';
import { ImageKitService } from '../../utils/image';

interface EditorProps {
    content?: string;
    onChange?: (e: {text: string, html: string, state: any}) => void | undefined;
    onSave?: (e: {text: string, html: string, state: any}) => void | undefined;
}

export default function ThinkinaryEditor(props: EditorProps) {
    const [editorState, setEditorState] = useState();

    const toolbarConfig = {
        ...toolbarOptions,
        image: {
            icon: `/editor-icons/image.svg`,
            // component: 'ImageComponent',
            popupClassName: undefined,
            urlEnabled: false,
            uploadEnabled: true,
            alignmentEnabled: true,
            uploadCallback: function(file) {
                return new Promise(async (resolve, reject) => {
                    console.log(file)
                    const response = await ImageKitService.upload(file, file.name)
                    resolve({data: {link: response.url }});
                })
            },
            previewImage: true,
            inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
            alt: { present: false, mandatory: false },
            defaultSize: {
                height: 'auto',
                width: 'auto',
            },
        }
    }

    const saveContent = debounce((content) => {
        console.log('saving to db')
        if(props.onSave) {
            props.onSave(convertToRaw(content));
        }
    }, 10000)

    useEffect(() => {
        // const html = '<p>Hey this <strong>editor</strong> rocks 😀</p>';
        const _editorContent = props.content || '';
        const contentBlock = htmlToDraft(_editorContent);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const _editorState = EditorState.createWithContent(contentState);
                setEditorState(_editorState);
            }
    }, [props.content]);

    const getEditorHTML = () => {
        if (!editorState) return '';
        // @ts-ignore
        return draftToHtml(convertToRaw(editorState?.getCurrentContent()))
    }

    return(
        <>
        <Editor
            toolbar={toolbarConfig}
            editorState={editorState}
            spellCheck={true}
            placeholder={'Type article here'}
            editorStyle={{paddingBottom: '450px'}}
            mention={{
                separator: ' ',
                trigger: '@',
                suggestions: [
                    { text: 'Hubert Formin', value: 'Hubert Formin', url: 'apple' },
                    { text: 'Mutia Babila', value: 'Mutia Babila', url: 'banana' },
                    { text: 'Asafor Ndifor', value: 'Asafor Ndifor', url: 'cherry' },
                    { text: 'Sema Kumbella', value: 'Sema Kumbella', url: 'durian' },
                    { text: 'Rayon', value: '#2020', url: 'Rayon' },
                ],
            }}
            hashtag={{
                separator: ' ',
                trigger: '#',
              }}
            onEditorStateChange={(state) => {
                setEditorState(state);

                const text = state.getCurrentContent().getPlainText()
                const html = getEditorHTML();

                if (props.onChange) {
                    props.onChange({text, html, state})
                }

                // const contentState = state.getCurrentContent();
                // saveContent(contentState);
            }}
        />

        </>
    )
}