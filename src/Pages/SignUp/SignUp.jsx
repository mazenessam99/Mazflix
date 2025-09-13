import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import AOS from 'aos';
import { useForm } from "react-hook-form"
export default function SignUp() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    function handleMySubmit(data) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const existUser = users.find(user => user.emailInfo === data.emailInfo);
    if (existUser) {
        toast.error("This email is already exist!",{ 
        style: { fontFamily: 'Arial' },
        position: "top-center",
        autoClose: 1200});
        return;
    }
    users.push(data);
    localStorage.setItem("users", JSON.stringify(users));

    toast.success("Account created successfully!",{ 
        style: { fontFamily: 'Arial' },
        position: "top-center",
        autoClose: 1200});

    setTimeout(() => {
        navigate('/login');
    }, 1200);
    }
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);
    return (
        <div
            className="min-h-screen  flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: "url('https://wallpapercave.com/wp/wp1945909.jpg')" }}
        >
            <form onSubmit={handleSubmit(handleMySubmit)} data-aos="zoom-in" data-aos-once="false" className='bg-black/80 backdrop-blur-md flex flex-col p-5 gap-5 rounded-[20px] w-[350px] md:w-[600px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>
                <h2 className='text-center text-2xl font-bold text-red-500'>Sign Up</h2>
                <div>
                    <label htmlFor="firstname" className='text-white font-bold mb-3'>Enter Firstname:</label>
                    <input type="text" name="firstname" id="firstname" className='bg-black/50 w-[90%] h-[40px] mt-4 pl-4 border-2 border-amber-50  outline-0 rounded-[8px] text-white' {...register("firstname", {
                        required: {
                            value: true,
                            message: 'This Field is required'
                        },
                        minLength: {
                            value: 3,
                            message: "the length start from 3"
                        }
                    })}
                    />
                    {errors.firstname && <p className='text-red-500 font-bold mt-2'>{errors.firstname.message}</p>}
                </div>

                <div>
                    <label htmlFor="lastname" className='text-white font-bold mb-3'>Enter Lastname:</label>
                    <input type="text" name="lastname" id="lastname" className='bg-black/50 w-[90%] h-[40px] mt-4 pl-4 border-2 border-amber-50  outline-0 rounded-[8px] text-white' {...register("lastname", {

                        required: {
                            value: true,
                            message: 'This Field is required'
                        },
                        minLength: {
                            value: 3,
                            message: "the length start from 3"
                        }
                    })}
                    />
                    {errors.lastname && <p className='text-red-500 font-bold mt-2'>{errors.lastname.message}</p>}
                </div>

                <div>
                    <label htmlFor="email" className='text-white font-bold mb-3'>Enter Your Email:</label>
                    <input type="email" name="email" id="email" className='bg-black/50 w-[90%] h-[40px] mt-4 pl-4 border-2 border-amber-50  outline-0 rounded-[8px] text-white' {...register("emailInfo", {
                        required: {
                            value: true,
                            message: 'This Field is required'
                        },
                        minLength: {
                            value: 3,
                            message: "the length start from 3"
                        }
                    })}
                    />
                    {errors.emailInfo && <p className='text-red-500 font-bold mt-2'>{errors.emailInfo.message}</p>}
                </div>

                <div>
                    <label htmlFor="password" className='text-white font-bold mb-3'>Enter Password</label>
                    <input type="password" name="password" id="password" className='bg-black/50 w-[90%] h-[40px] mt-4 pl-4 border-2 border-amber-50  outline-0 rounded-[8px] text-white' {...register("password", {
                        required: {
                            value: true,
                            message: 'This Field is required'
                        },
                        minLength: {
                            value: 6,
                            message: "Your Password must be at least 6 charachters "
                        }
                    })} />
                    {errors.password && <p className='text-red-500 font-bold mt-2'>{errors.password.message}</p>}
                    <button type="submit" className='w-[90%] bg-red-600  text-white rounded p-2 border-0 cursor-pointer mt-4 font-bold'>SignUp</button>
                    <p className='text-white font-bold text-xl text-center mt-3'>Already have an account ? <Link to={'/login'} className='text-red-500 '>Login</Link> </p>
                </div>


            </form>
        </div>

    )
}
