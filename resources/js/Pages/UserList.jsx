import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import RenderWhen from '@/Components/RenderWhen';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

import Moment from 'moment';
import { useRef, useState } from 'react';

export default function UserList({ auth, isAdmin, users }) {

    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const [userId, setUserId] = useState(0);
    const passwordInput = useRef();
    const {
        data,
        setData,
        processing,
        reset,
        errors,
        put
    } = useForm({
        password: '',
    });

    const banUser = (e) => {
        e.preventDefault();

        put(route('user.update', { id: userId }), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const handleBan = (user_id) => {
        setConfirmingUserDeletion(true);
        setUserId(user_id)

    }
    const closeModal = () => {
        setConfirmingUserDeletion(false);

    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            isAdmin={isAdmin}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">User List</h2>}
        >
            <Head title="user list" />
            {
                users.map(user => (
                    <div className="flex flex-col bg-white max-w-6xl mt-3 px-6 py-4 mx-auto rounded-lg shadow-md" key={user.user_id}>
                        <ul className="-mx-4">
                            <li className="flex justify-between px-5 items-center">
                                <div className="flex justify-between items-center">
                                    <img className="w-10 h-10 object-cover rounded-full mx-4" src={user.thumbnail} alt="avatar" />
                                    <p>
                                        <a className="text-gray-700 font-bold mx-1 hover:underline" href="#">{user.name}</a>
                                        <span className="text-gray-700 text-sm font-light">{Moment(user.created_at).format('DD MMM YYYY - dddd')}</span>
                                    </p>
                                </div>
                                <RenderWhen condition={user.status}>
                                    {
                                        () => (
                                            <DangerButton className="hover:bg-gray-500 mx-3" disabled={user.user_id === auth.user.user_id} onClick={() => handleBan(user.user_id)}> Ban User </DangerButton>
                                        )
                                    }
                                </RenderWhen>
                                <RenderWhen condition={!user.status}>
                                    {
                                        () => (
                                            <PrimaryButton className="hover:bg-gray-500 mx-3" disabled={user.user_id === auth.user.user_id} onClick={() => handleBan(user.user_id)}> Unban User </PrimaryButton>
                                        )
                                    }
                                </RenderWhen>

                            </li>

                        </ul>
                    </div>

                ))
            }

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={banUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to ban this user?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Once ban this user please
                        enter your password to confirm you would like to ban user.
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="Password" className="sr-only" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Password"
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                        <DangerButton className="ml-3" disabled={processing}>
                            ban user
                        </DangerButton>
                    </div>
                </form>
            </Modal>

        </AuthenticatedLayout>
    );
}
