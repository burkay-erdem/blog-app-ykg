import { useState, } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextAreaInput from '@/Components/TextAreaInput';


const CommentForm = ({ children, user_id, blog_id }) => {

    const { data, setData, errors, processing, recentlySuccessful, post } = useForm({
        comment: '',
        user_id: user_id,
        blog_id: blog_id
    });
    const submit = (e) => {
        e.preventDefault();

        post(route('comment.store'));
    };
    return (
        <form onSubmit={submit} className="mt-6 space-y-6">

            <div>
                <InputLabel htmlFor="comment" value="Comment" />

                <TextAreaInput
                    id="comment"
                    className="mt-1 block w-full"
                    rows="4"
                    value={data.comment}
                    onChange={(e) => setData('comment', e.target.value)}
                    required 
                />

                <InputError className="mt-2" message={errors.name} />
            </div>

            <div className="flex items-center justify-end gap-4">
                <PrimaryButton disabled={processing}>Comment</PrimaryButton>

                <Transition
                    show={recentlySuccessful}
                    enterFrom="opacity-0"
                    leaveTo="opacity-0"
                    className="transition ease-in-out"
                >
                    <p className="text-sm text-gray-600">Saved.</p>
                </Transition>
            </div>
        </form >


    );
};


export default CommentForm;
