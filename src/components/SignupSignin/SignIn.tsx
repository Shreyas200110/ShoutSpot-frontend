export const SignIn = () => {
    return (
        <>
            <main className="flex-grow">
                <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true"></div>
                <section className="relative">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                            <div className="max-w-sm mx-auto text-center pb-12 md:pb-20">
                                <h2 className="mt-6 text-3xl font-extrabold text-white">Welcome back 👋</h2>
                            </div>
                            <div className="max-w-md mx-auto bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                                <div>
                                    <div className="flex flex-wrap bg-gray-50">
                                        <div className="w-full">
                                            <button className="btn px-0 text-white bg-gray-50 hover:bg-gray-100 w-full relative flex items-center py-3">
                                                <img className="mx-4 h-5 w-5 object-contain" src="/google.png" alt="Google" />
                                                <span className="h-6 flex items-center border-r border-gray-300 mr-4" aria-hidden="true"></span>
                                                <span className="flex-auto pl-16 pr-8 -ml-16 text-gray-600">Sign in with Google</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center my-6">
                                    <div className="border-t border-gray-300 border-dotted flex-grow mr-3" aria-hidden="true"></div>
                                    <div className="text-gray-400">Or, sign in with your email</div>
                                    <div className="border-t border-gray-300 border-dotted flex-grow ml-3" aria-hidden="true"></div>
                                </div>
                                <div>
                                    <div className="flex flex-wrap -mx-3 mb-4">
                                        <div className="w-full px-3">
                                            <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Email</label>
                                            <input id="email" type="email" className="form-input w-full text-gray-800" placeholder="Your email" required={true} defaultValue="" />
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-4">
                                        <div className="w-full px-3">
                                            <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password">Password</label>
                                            <input id="password" type="password" className="form-input w-full text-gray-800" placeholder="Password" required={true} defaultValue="" />
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-4">
                                        <div className="w-full px-3">
                                            <div className="flex">
                                                <a className="text-blue-600 hover:text-gray-200 transition duration-150 ease-in-out text-sm" href="/reset-password">Forgot Password?</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap mt-6 bg-blue-600 hover:bg-blue-700 ">
                                        <div className="w-full">
                                            <button className="btn text-white w-full py-3">Sign in</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-gray-400 text-center mt-6 text-sm">
                                    You can also <button className="underline hover:text-blue-600">continue with SAML SSO</button>
                                </div>
                                <div className="text-gray-400 text-center mt-4 text-sm">
                                    Don't have an account? <a className="text-blue-600 hover:text-gray-200 transition duration-150 ease-in-out" href="/signup">Sign up</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

        </>
    )
}