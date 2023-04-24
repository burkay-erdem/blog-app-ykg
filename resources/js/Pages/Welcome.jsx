import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Guest from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import Moment from 'moment';
export default function Welcome({ auth, blogs }) {
    console.log('blogs: ', blogs);
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
                        blogs.data.map((blog) => (
                            <div className="py-3" key={blog.blog_id}>
                                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8" >
                                    <div className="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md " >
                                        <div className="flex justify-between items-center">
                                            <span className="font-light text-gray-600"> {Moment(blog.created_at).format('DD MMM YYYY - dddd')} </span>
                                            <a className="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500" href="#"> {blog.tag} </a>
                                        </div>
                                        <div className="mt-2">
                                            <a className="text-2xl text-gray-700 font-bold hover:underline" href="#"> {blog.title} </a>
                                        </div>
                                        <div className="flex justify-between items-center mt-4">
                                            <a className="text-blue-500 hover:underline" href={route('blog.detail', { blog_id: blog.blog_id })}>Read more</a>
                                            <div>
                                                <a className="flex items-center" href="#">
                                                    <img className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block" src={blog.user.thumbnail} alt="avatar" />
                                                    <h1 className="text-gray-700 font-bold hover:underline"> {blog.user.name} </h1>
                                                </a>
                                            </div>
                                        </div>
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
