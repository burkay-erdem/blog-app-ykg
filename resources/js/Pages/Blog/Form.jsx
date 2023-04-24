import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ContentState, EditorState, convertToRaw } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import FileInput from '@/Components/FileInput';
import Checkbox from '@/Components/Checkbox';
import Datepicker from "react-tailwindcss-datepicker";
import Moment from 'moment';
export default function Form({ auth, blog }) {
    const { data, setData, post, processing, errors, reset, patch, put } = useForm({
        title: blog?.title ?? '',
        tag: blog?.tag ?? '',
        content: blog?.content ?? '',
        thumbnail: blog?.thumbnail ?? '',
        date_start: blog?.date_start ?? '',
        date_end: blog?.date_end ?? '',
    });

    const _contentState = ContentState.createFromText(data.content);
    const raw = convertToRaw(_contentState);  // RawDraftContentState JSON
    const [contentState, setContentState] = useState(raw);
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    useEffect(() => {
        const html = convertToHTML(editorState.getCurrentContent());
        setData('content', html)
    }, [editorState])

    const uploadThumbnail = (e) => {
        if (e.target.files.length > 0) {
            const src = URL.createObjectURL(e.target.files[0]);
            setData('thumbnail', src)
        }
    }
    const submit = (e) => {
        e.preventDefault();
        if (blog) {
            put(route('blog.update', { id: blog.blog_id }), {
                onSuccess: () => reset(),
                onError: (errors) => {
                    console.log('errors: ', errors);
                },
            });
            // put(route('blog.update', { id: blog.blog_id }));
        } else {
            post(route('blog.store'))
        }
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Blogs</h2>}
        >
            <Head title="Blog Form" />
            <div className="flex flex-col bg-white px-8 py-6 max-w-6xl mt-3 mx-auto rounded-lg shadow-md">
                <form onSubmit={submit}>
                    <div className='my-4 '>
                        <FileInput
                            id="thumbnail"
                            htmlFor="thumbnail"
                            name="thumbnail"
                            value={data.thumbnail}
                            accept="image/*"
                            autoComplete="username"
                            onChange={uploadThumbnail}
                        />
                        <InputError message={errors.thumbnail} className="mt-2" />
                    </div>
                    <div className='my-4'>
                        <InputLabel htmlFor="title" value="title" />
                        <TextInput
                            id="title"
                            type="text"
                            name="title"
                            value={data.title}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('title', e.target.value)}
                        />
                        <InputError message={errors.title} className="mt-2" />
                    </div>
                    <div className='my-4'>
                        <InputLabel htmlFor="content" value="content" />
                        <Editor
                            editorState={editorState}
                            defaultContentState={contentState}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={setEditorState}
                        />
                    </div>
                    <div className='my-4'>
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.date_start ? false : true}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <span className="ml-2">Publish blog now</span>
                        </label>
                    </div>
                    <div className='my-3'>
                        <InputLabel htmlFor="startDate" value="Start Date" />
                        <Datepicker
                            primaryColor={"yellow"}
                            value={{ startDate: Moment(data.date_start), endDate: Moment(data.date_start) }}
                            asSingle={true}
                            minDate={Moment().add(-1, 'days')}
                            classNames={"light"}
                            onChange={e => setData('date_start', e.startDate)}
                        />
                    </div>
                    <div className='my-3'>
                        <InputLabel htmlFor="endDate" value="End Date" />
                        <Datepicker
                            primaryColor={"yellow"}
                            value={{ startDate: Moment(data.date_end), endDate: Moment(data.date_end) }}
                            asSingle={true}
                            minDate={data.date_start}
                            classNames={"light"}
                            onChange={e => setData('date_end', e.endDate)}
                        />
                    </div>
                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton className="ml-4" disabled={processing}>
                            Save Blog
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
