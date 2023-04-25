import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import RenderWhen from '@/Components/RenderWhen';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import Moment from 'moment';
import { useRef, useState } from 'react';

export default function BlogList({ auth, blogs, isAdmin, isBlogger }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const [blogId, setBlogId] = useState(0);
    const passwordInput = useRef();
    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const deleteBlog = (e) => {
        e.preventDefault();

        console.log('blogId: ', blogId);
        destroy('/blog/' + blogId, {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const handleDelete = (blog_id) => {
        setConfirmingUserDeletion(true);
        setBlogId(blog_id)

    }
    const closeModal = () => {
        setConfirmingUserDeletion(false);

    };
    return (
        <div className="py-3" >
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <RenderWhen condition={isBlogger}>
                    {
                        () => (
                            <a className="bg-indigo-500 block font-bold hover:bg-gray-500 px-2 py-1 rounded text-center text-gray-100" href={route('blog.create')}> Create new  blog </a>
                        )
                    }
                </RenderWhen>




                {
                    blogs.data.map((blog) => (
                        <div className="py-3" key={blog.blog_id}>
                            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8" >
                                <div className="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md " >
                                    <div className="flex justify-between items-center">
                                        <span className="font-light text-gray-600"> {Moment(blog.created_at).format('DD MMM YYYY - dddd')} </span>
                                        <div>

                                            <RenderWhen condition={isBlogger || isAdmin}>
                                                {
                                                    () => (
                                                        <DangerButton className="hover:bg-gray-500 mx-3" onClick={() => handleDelete(blog.blog_id)}> Delete </DangerButton>
                                                    )
                                                }
                                            </RenderWhen>
                                            <RenderWhen condition={isBlogger} >
                                                {
                                                    () => (
                                                        <a className="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500" href={route('blog.edit', { id: blog.blog_id })}> Edit </a>
                                                    )
                                                }
                                            </RenderWhen>
                                            <RenderWhen condition={!isBlogger && !isAdmin} >
                                                {

                                                    () => (
                                                        <a className="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500" href="#"> {blog.tag} </a>
                                                    )
                                                }
                                            </RenderWhen>

                                        </div>

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
                        blogs && blogs.data.length ?
                            blogs.links.map(link => (
                                <a href={link.url} key={link.label} className={"relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 " + (link.active ? "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-white z-10  bg-indigo-600" : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50  focus:outline-offset-0")} >
                                    {link.label}
                                </a>
                            ))
                            :
                            <p> You don't have any blog for listing</p>

                    }
                </div>


                <Modal show={confirmingUserDeletion} onClose={closeModal}>
                    <form onSubmit={deleteBlog} className="p-6">
                        <h2 className="text-lg font-medium text-gray-900">
                            Are you sure you want to delete your blog?
                        </h2>

                        <p className="mt-1 text-sm text-gray-600">
                            Once your blog is deleted, all of its resources and data will be permanently deleted. Please
                            enter your password to confirm you would like to permanently delete your blog.
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
                                Delete Blog
                            </DangerButton>
                        </div>
                    </form>
                </Modal>
            </div>
        </div >
    );
}
