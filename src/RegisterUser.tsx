import bg from './assets/bg-image.jpg';
import pic from './assets/logo.png';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const formSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .email('This email is not valid'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(8, 'Password must contain at least 8 character(s)')
        .max(12, 'Password must contain at most 12 character(s)'),
});

type formValues = z.infer<typeof formSchema>;

const RegisterUser = () => {
    const { control, handleSubmit } = useForm<formValues>({
        resolver: zodResolver(formSchema),
    });

    const navigate = useNavigate();
    const handleNavigation = (path: string) => {
        navigate(path);
    };

    const authenticateUser = async (email: string, password: string) => {
        const url = new URL('/api/register', 'http://localhost:4200');
        const response = await fetch(url.toString(), {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.json();
    };

    const onFormSubmit = async (data: formValues) => {
        const response = await authenticateUser(data.email, data.password);
        if (response.statusCode === 200) {
            toast.success('Register user successfully', {
                position: 'top-center',
            });
            return;
        }
    };
    return (
        <div className="relative mb-2 min-h-screen w-full min-w-[320px] bg-cover bg-center sm:min-w-[42rem]">
            <img className="absolute -z-50 h-full w-full" src={bg} alt="" />

            <div className="py-4">
                <div className="flex h-full w-full flex-col items-center justify-center px-4 py-2.5">
                    <div className="px-15 mr-auto flex max-w-xs flex-col rounded-3xl bg-white px-8 py-24 md:min-w-[42rem]">
                        <div className="flex flex-col items-center justify-center">
                            <img src={pic} className="w-52" alt="logo" />
                            <div className="w-full px-6">
                                <h1 className="my-[5px} text-center text-[40px] font-bold leading-normal text-[Brown]">
                                    Register
                                </h1>
                            </div>
                            <div className="w-full px-6">
                                <h2 className="my-[5px] text-center text-base font-semibold leading-normal text-[grey]">
                                    Please register yourself to proceed.
                                </h2>
                            </div>
                            <div className="w-full px-6">
                                <form
                                    onSubmit={handleSubmit(onFormSubmit)}
                                    className="my-14 w-full"
                                >
                                    <Controller
                                        name="email"
                                        control={control}
                                        render={({
                                            field: {
                                                name,
                                                onBlur,
                                                onChange,
                                                ref,
                                            },
                                            fieldState: { error },
                                        }) => (
                                            <>
                                                <Input
                                                    name={name}
                                                    id={name}
                                                    ref={ref}
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    type="email"
                                                    placeholder="Enter your email"
                                                    className="mb-4 bg-red-100"
                                                ></Input>

                                                <p className="mb-3 font-semibold text-[Brown]">
                                                    {error?.message}
                                                </p>
                                            </>
                                        )}
                                    />

                                    <Controller
                                        name="password"
                                        control={control}
                                        render={({
                                            field: {
                                                name,
                                                onBlur,
                                                onChange,
                                                ref,
                                            },
                                            fieldState: { error },
                                        }) => (
                                            <>
                                                <Input
                                                    name={name}
                                                    id={name}
                                                    ref={ref}
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    type="password"
                                                    placeholder="Enter your password"
                                                    className="mb-4 bg-red-100"
                                                ></Input>
                                                <p className="mb-3 font-semibold text-[Brown]">
                                                    {error?.message}
                                                </p>
                                            </>
                                        )}
                                    />
                                    <div className="my-10">
                                        <Button
                                            onClick={() =>
                                                handleNavigation('/auth/login')
                                            }
                                            type="submit"
                                            className="mx-auto h-12 w-full justify-center bg-red-800 text-center text-xl font-bold hover:bg-red-800"
                                        >
                                            Register
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterUser;
