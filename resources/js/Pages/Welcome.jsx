import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Guest from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, blogs }) {
    console.log('auth: ', auth);
    const Layout = auth.user ? AuthenticatedLayout : Guest
    return (

        <Layout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Blogs</h2>}
        >
            <Head title="Blogs" />
            <div className="py-3" >
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {
                        blogs && blogs.data.map(blog => (
                            <div className="py-3" key={blog.blog_id}>
                                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                        <div className="p-6 text-gray-900">{blog.title}</div>
                                    </div>
                                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                        <div className="p-6 text-gray-900">{blog.content}</div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }



                    <div className='isolate inline-flex -space-x-px rounded-md shadow-sm'>
                        {
                            blogs && blogs.links.map(link => (
                                <Link href={link.url} key={link.label} className={"relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 " + (link.active ? "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-white z-10  bg-indigo-600" : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50  focus:outline-offset-0")}>
                                    {link.label}
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>





        </Layout>
    );
}
