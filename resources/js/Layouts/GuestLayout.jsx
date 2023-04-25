import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';

export default function Guest({ children, header }) {
    const Layout = route().current('user.*') ? FormLayout : DashboardLayout

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink href={route('home')} active={route().current('/')}>
                                    Blogs
                                </NavLink>
                                <NavLink href={route('user.login')} active={route().current('user.login')}>
                                    Login
                                </NavLink>
                                <NavLink href={route('user.register')} active={route().current('user.register')}>
                                    Register
                                </NavLink>
                            </div>
                        </div>

                    </div>
                </div>


            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <Layout >{children}</Layout>
        </div>
    );
}

const FormLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>

            <footer className='py-12'>

            </footer>
        </div>
    )
}
const DashboardLayout = ({ children }) => {
    return (
        <main>{children}</main>
    )
}
