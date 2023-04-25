import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import Moment from 'moment';
import Guest from '@/Layouts/GuestLayout';
import CommentForm from './Components/CommentForm';
import CommentList from './Components/CommentList';
import RenderWhen from '@/Components/RenderWhen';

export default function Detail({ auth, blog }) {
    console.log('blog: ', blog);
    const Layout = auth.user ? AuthenticatedLayout : Guest
    const { processing, post, delete: destroy } = useForm({
        user_id: auth.user.user_id,
        blog_id: blog.blog_id
    });
    const handelLike = (e) => {
        if (blog.my_like.length)
            destroy(route('like.destroy', {'like':blog.my_like[0].like_id}))
        else
            post(route('like.store'));
    };
    return (
        <Layout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Blog Detail</h2>}
        >
            <Head title="Blog Detail" />
            <div className="flex flex-col bg-white px-8 py-6 max-w-6xl mt-3 mx-auto rounded-lg shadow-md">
                <div className="flex justify-center items-center">
                    <a className="px-2 py-1 mx-2 bg-gray-600 text-sm text-green-100 rounded hover:bg-gray-500" href="#">{blog.tag}</a>


                    <button className="px-2 py-1 mx-2 bg-red-600 text-sm text-white rounded hover:bg-red-800" disabled={processing} onClick={handelLike}>
                        <RenderWhen condition={blog.my_like.length}>
                            {() => "unLike"}
                        </RenderWhen>
                        <RenderWhen condition={!blog.my_like.length}>
                            {() => "Like"}
                        </RenderWhen>
                    </button>

                    <p> ({blog.likes_count} <small> liked</small> )</p>
                </div>
                <div className="flex justify-center my-3 items-center">
                    {
                        blog.thumbnail && (
                            <img
                                src={blog.thumbnail}
                                className="h-auto max-w-sm rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30"
                                alt="" />
                        )
                    }
                </div>
                <div className="mt-4">
                    <p className="text-lg text-gray-700 font-medium hover:underline">{blog.title}</p>
                </div>
                <div className="mt-4" >
                    <p className="text-lg text-gray-700 font-medium hover:underline" dangerouslySetInnerHTML={{ __html: blog.content }} ></p>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center">
                        <img src={blog.user.thumbnail} className="w-8 h-8 object-cover rounded-full" alt="avatar" />
                        <a className="text-gray-700 text-sm mx-3 hover:underline" href="#">{blog.user.name}</a>
                    </div>
                    <span className="font-light text-sm text-gray-600"> {Moment(blog.created_at).format('DD MMM YYYY - dddd')}</span>
                </div>
            </div>
            <div className="flex flex-col bg-white px-8 py-6 max-w-6xl mt-3 mx-auto rounded-lg shadow-md">
                {
                    auth.user ?
                        <CommentForm user_id={auth.user.user_id} blog_id={blog.blog_id} />
                        : <h1 className='text-red-600 font-bold text-lg'> If you want write a comment please <a className='text-blue-500 font-bold text-lg' href={route('user.login')}> login </a> or  <a className='text-blue-500 font-bold text-lg' href={route('user.register')}> register </a> </h1>
                }
            </div>
            {
                blog.comments.map(comment => (
                    <CommentList key={comment.comment_id} comment={comment} />
                ))
            }
        </Layout>
    );
}
