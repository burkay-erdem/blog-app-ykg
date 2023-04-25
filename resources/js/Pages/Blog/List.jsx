import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import BlogList from './Components/BlogList';

export default function List({ auth, blogs, isAdmin, isBlogger }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Blogs</h2>}
        >
            <Head title="My Blogs" />

            <BlogList blogs={blogs} auth={auth} isAdmin={isAdmin} isBlogger={isBlogger} />
        </AuthenticatedLayout >
    );
}
