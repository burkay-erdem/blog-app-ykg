import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import Moment from 'moment';

const initialState = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
}
export default function Detail({ auth, blog }) {
    console.log('blog: ', blog);
    Moment.locale('en');
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Blog Detail</h2>}
        >
            <Head title="Blog Detail" />

            <div className="flex flex-col bg-white px-8 py-6 max-w-6xl mt-3 mx-auto rounded-lg shadow-md">
                <div className="flex justify-center items-center">
                    <a className="px-2 py-1 bg-gray-600 text-sm text-green-100 rounded hover:bg-gray-500" href="#">{blog.tag}</a>
                </div>
                <div className="mt-4">
                    <p className="text-lg text-gray-700 font-medium hover:underline">{blog.title}</p>
                </div>
                <div className="mt-4">
                    <p className="text-lg text-gray-700 font-medium hover:underline">{blog.content}</p>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center">
                        <img src={blog.user.thumbnail} className="w-8 h-8 object-cover rounded-full" alt="avatar" />
                        <a className="text-gray-700 text-sm mx-3 hover:underline" href="#">{blog.user.name}</a>
                    </div>
                    <span className="font-light text-sm text-gray-600"> {Moment(blog.created_at).format('DD MMM YYYY - dddd')}</span>
                </div>
            </div>


        </AuthenticatedLayout>
    );
}
