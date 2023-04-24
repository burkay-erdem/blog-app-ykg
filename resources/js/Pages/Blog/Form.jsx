import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

const initialState = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
}
export default function List({ auth, blog }) {

    const { data, setData, post, processing, errors, reset } = useForm(initialState);
    useState(() => {
        console.log('blog : ', blog)
        return () => {
            setData(initialState)
        }
    }, [blog])



    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Blogs</h2>}
        >
            <Head title="Blog Form" />

            <div className="bg-white py-3 sm:py-3">
                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>


                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton className="ml-4" disabled={processing}>
                            Create Blog
                        </PrimaryButton>
                    </div>
                </form>
            </div>

        </AuthenticatedLayout>
    );
}
