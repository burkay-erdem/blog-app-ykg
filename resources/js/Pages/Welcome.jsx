import DangerButton from '@/Components/DangerButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Guest from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import Moment from 'moment';
import BlogList from './Blog/Components/BlogList';
export default function Welcome({ auth, blogs, isAdmin,isBlogger }) {
    console.log('isAdmin: ', isAdmin);
    const Layout = auth.user ? AuthenticatedLayout : Guest

  
   
    return (

        <Layout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Blogs</h2>}
        >
            <Head title="Blogs" />
            <BlogList blogs={blogs} auth={auth} isAdmin={isAdmin} isBlogger={isBlogger} />
        </Layout>
    );
}
