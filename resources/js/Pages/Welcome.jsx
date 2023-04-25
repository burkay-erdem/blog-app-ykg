import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Guest from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react'; 
import BlogList from './Blog/Components/BlogList';
import RenderWhen from '@/Components/RenderWhen';
export default function Welcome({ auth, blogs, isAdmin, isBlogger }) { 
    return (
        <>
            <RenderWhen condition={auth.user}>
                {
                    () => (
                        <AuthenticatedLayout
                            user={auth.user}
                            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Blogs</h2>}
                        >
                            <Head title="Blogs" />
                            <BlogList blogs={blogs} auth={auth} isAdmin={isAdmin} isBlogger={isBlogger} />
                        </AuthenticatedLayout>
                    )
                }
            </RenderWhen>
            <RenderWhen condition={!auth.user}>
                {
                    () => (
                        <Guest header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Welcome</h2>}>
                            <Head title="Welcome" />
                            <div className="px-6 py-8">
                                <div className="flex justify-between container mx-auto">
                                    <div className="w-full lg:w-8/12">
                                        <div className="flex items-center justify-between">
                                            <h1 className="text-xl font-bold text-gray-700 md:text-2xl">Welcome to blog app please login or register for continue </h1>
                                            <post-filter />
                                        </div>
                                        <div className="mt-6" v-for="post in posts" >
                                        </div>
                                        <div className="mt-8">
                                            <pagination />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Guest>
                    )
                }
            </RenderWhen>
        </>
    );
}
