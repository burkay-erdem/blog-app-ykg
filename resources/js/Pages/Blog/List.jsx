import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function List({ auth, blogs }) {
    console.log('blogs: ', blogs);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Blogs</h2>}
        >
            <Head title="Blogs" />

            <div className="bg-white py-3 sm:py-3">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {blogs && blogs.data.map((blog) => (
                        <article key={blog.blog_id} className="flex max-w-xl flex-col items-start justify-between">
                            <div className="flex items-center gap-x-4 text-xs">
                                <time dateTime={blog.created_at} className="text-gray-500">
                                    {blog.created_at}
                                </time>
                                <a href={blog.blog_id} className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                                    {blog.title}
                                </a>
                            </div>
                            <div className="group relative">
                                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                    <a href={blog.blog_id}>
                                        <span className="absolute inset-0" />
                                        {blog.title}
                                    </a>
                                </h3>
                                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{blog.description}</p>
                            </div>
                            <div className="relative mt-8 flex items-center gap-x-4">
                                {/* <img src={blog.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                                    <div className="text-sm leading-6">
                                        <p className="font-semibold text-gray-900">
                                            <a href={blog.author.href}>
                                                <span className="absolute inset-0" />
                                                {blog.author.name}
                                            </a>
                                        </p>
                                        <p className="text-gray-600">{blog.author.role}</p>
                                    </div> */}
                            </div>
                        </article>
                    ))}
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
