import "@/page/Auth/Auth.css"
import SignupForm from "./SignupForm"
import { Button } from "@/components/ui/button"
import { useLocation, useNavigate } from "react-router-dom"
import SigninForm from "./SigninForm"
import ForgotPassForm from "./ForgotPassForm"

const Auth = () => {
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <div className='h-screen relative authContainer'>
            <div className='absolute top-0 right-0 left-0 bottom-0 bg-[#030712] bg-opacity-50'>
                <div className='bgBlure absolute top-1/2 left-1/2 transform -translate-x-1/2 
                -translate-y-1/2 flex flex-col justify-center items-center h-[35rem] w-[30rem]
                rounded-md z-50 bg-black-500 shadow-2xl shadow-white'>
                    <h1 className='text-6xl font-bold pb-9'>Bull Trading</h1>
                  {location.pathname== '/signup' ? <section className='w-[25rem]'>
                        <SignupForm />
                        <div className='flex items-center justify-center'>
                            <span>Have already account ?</span>
                            <Button onClick={() => navigate('/signin')} variant="ghost">
                                Signin
                            </Button>
                        </div>
                    </section> : location.pathname== '/forgot-password' ? <section className='w-[25rem]'>
                        <ForgotPassForm />
                        <div className='flex items-center justify-center mt-3'>
                            <span>Back to login!</span>
                            <Button onClick={() => navigate('/signin')} variant="ghost">
                                Signin
                            </Button>
                        </div>
                    </section> : <section className='w-[25rem]'>
                        <SigninForm />
                        <div className='flex items-center justify-center'>
                            <span>Don't have account ?</span>
                            <Button onClick={() => navigate('/signup')} variant="ghost">
                                Signup
                            </Button>
                        </div>
                        <div className=' mt-10'>
                            <Button className='w-full py-5 border border-white/30 bg-[#020214]' onClick={() => navigate('/forgot-password')} variant="ghost">
                                Forgot Password?
                            </Button>
                        </div>
                    </section> }
                </div>
            </div>
        </div>
    )
}

export default Auth