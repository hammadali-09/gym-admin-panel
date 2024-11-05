import * as z from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { addPackages } from '@/packageSlice';

const formSchema = z.object({
    package_name: z.string().min(1, 'package name is required'),
    registration_fees: z
        .string()
        .min(1, 'registration fees must be in Positive Number'),
    monthly_fees: z.string().min(1, 'monthly fees must be in Positive Number'),
    fitness_details: z.string().min(1, 'Description is required'),
    features: z.string().min(1, 'Features are required'),
});

type formValues = z.infer<typeof formSchema>;


const AddPackage = () => {
    const dispatch = useDispatch();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<formValues>({
        resolver: zodResolver(formSchema),
    });
    useEffect(() => {
        console.log('errors', errors);
    }, [errors]);

     const navigate = useNavigate();

    const onFormSubmit = async (data: formValues) => {
        try {
            const response = await fetch('http://localhost:4200/api/packages', {
                method: 'post',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();
            if (result.statusCode === 201) {
                dispatch(addPackages(result.data));
                navigate('/home/packages');
            }
        } catch (error) {
            console.error('Error adding client to server:', error);
        }
    };

    return (
        <div className="min-h-[600px] w-full p-5">
            <div className="flex items-center justify-center">
                <div className="mb-8 mt-3 text-center text-xl font-extrabold text-gray-500">
                    Add New Package
                </div>
            </div>
            <form
                onSubmit={handleSubmit(onFormSubmit)}
                className="grid grid-cols-4 gap-x-3 gap-y-6"
            >
                <div className="col-span-2 flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="package_name"
                    >
                        Package Name
                    </Label>
                    <Controller
                        name="package_name"
                        control={control}
                        render={({
                            field: { name, onBlur, onChange, ref },
                        }) => (
                            <>
                                <Input
                                    id={name}
                                    name={name}
                                    ref={ref}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    className="mt-2 flex h-10 w-full rounded-md"
                                ></Input>
                            </>
                        )}
                    />
                </div>
                <div className="col-span-2 flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="registration_fees"
                    >
                        <div className="flex items-center">
                            <div className="mr-1">Registration Fees</div>
                            <div className="text-xs font-semibold text-red-300">
                                (tax included)
                            </div>
                        </div>
                    </Label>
                    <Controller
                        name="registration_fees"
                        control={control}
                        render={({
                            field: { name, onBlur, onChange, ref },
                        }) => (
                            <>
                                <Input
                                    type="number"
                                    id={name}
                                    name={name}
                                    ref={ref}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    className="mt-2 flex h-10 w-full rounded-md"
                                ></Input>
                            </>
                        )}
                    />
                </div>
                <div className="col-span-2 flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="monthly_fees"
                    >
                        <div className="flex items-center">
                            <div className="mr-1">Monthly Fees</div>
                            <div className="text-xs font-semibold text-red-300">
                                (tax included)
                            </div>
                        </div>
                    </Label>
                    <Controller
                        name="monthly_fees"
                        control={control}
                        render={({
                            field: { name, onBlur, onChange, ref },
                        }) => (
                            <>
                                <Input
                                    type="number"
                                    id={name}
                                    name={name}
                                    ref={ref}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    className="mt-2 flex h-10 w-full rounded-md"
                                ></Input>
                            </>
                        )}
                    />
                </div>
                <div className="col-span-4 flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="fitness_program_details"
                    >
                        Fitness Program Details
                    </Label>
                    <Controller
                        name="fitness_details"
                        control={control}
                        render={({
                            field: { name, onBlur, onChange, ref },
                        }) => (
                            <>
                                <Textarea
                                    id={name}
                                    name={name}
                                    ref={ref}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    className="focus-visible::ring-2 mt-2 flex min-h-[80px] w-full rounded-md focus-visible:outline-blue-300 focus-visible:ring-blue-300"
                                ></Textarea>
                            </>
                        )}
                    />
                </div>
                <div className="col-span-4 flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="features"
                    >
                        Features Included
                    </Label>
                    <Controller
                        name="features"
                        control={control}
                        render={({
                            field: { name, onBlur, onChange, ref },
                        }) => (
                            <>
                                <Textarea
                                    id={name}
                                    name={name}
                                    ref={ref}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    className="focus-visible::ring-2 mt-2 flex min-h-[80px] w-full rounded-md focus-visible:outline-blue-300 focus-visible:ring-blue-300"
                                ></Textarea>
                            </>
                        )}
                    />
                </div>
                <div className="col-span-1 flex">
                    <Button
                        className="h-12 w-full bg-red-700 hover:bg-red-700"
                        type="submit"
                    >
                        Save & Continue
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddPackage;
