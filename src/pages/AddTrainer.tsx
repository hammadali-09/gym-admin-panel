import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImagePlusIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import * as z from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { addTrainers } from '@/trainerSlice';

const frameworks = [
    {
        value: 'Employee',
        label: 'Employee',
    },
    {
        value: 'Trainer',
        label: 'Trainer',
    },
];

const formSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    cnic: z.string().min(1, 'CNIC is required'),
    email: z
        .string()
        .min(1, 'Email is required')
        .email('This email is not valid'),
    phone: z.string().min(1, 'Phone is required'),
    experience: z.string(),
    dateTime: z.date(),
    specialization: z.string(),
    training_type: z.string(),
    enrollment_number: z.string().min(1, 'Enrollment number is required'),
    location: z.string().min(1, 'Location is required'),
    designation: z.string(),
    bio: z.string(),
    image_url: z.instanceof(File).optional(),
});

type formValues = z.infer<typeof formSchema>;

const AddTrainer = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
  


    const dispatch = useDispatch();
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<formValues>({
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        console.log('errors', errors);
    }, [errors]);

    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const imageFile = watch('image_url');

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    const onFormSubmit = async (data: formValues) => {

        let base64String = '';

        if (data.image_url) {
            base64String = await convertToBase64(data.image_url);
        }
        const trainerData = { ...data, image_url: base64String };
        try {
            const response = await fetch('http://localhost:4200/api/trainers', {
                method: 'post',
                body: JSON.stringify(trainerData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();
            if (result.statusCode === 201) {
                dispatch(addTrainers(result.data));
                navigate('/home/trainers');
            }
        } catch (error) {
            console.error('Error adding trainer to server:', error);
        }

    };

    const selectedImage = useMemo(() => {
        if (imageFile) {
            return URL.createObjectURL(imageFile);
        }
        return null;
    }, [imageFile]);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="min-h-[800px] w-full p-5">
            <form
                onSubmit={handleSubmit(onFormSubmit)}
                className="grid grid-cols-12 gap-x-3 gap-y-6"
            >
                <div className="col-span-12 flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="image_url"
                    >
                        Picture
                    </Label>
                    <Controller
                        name="image_url"
                        control={control}
                        render={({ field: { name, onChange } }) => (
                            <>
                                <Input
                                    id={name}
                                    name={name}
                                    type="file"
                                    ref={fileInputRef}
                                    hidden
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(event) => {
                                        const [file] = event.target.files ?? [
                                            null,
                                        ];
                                        console.log('file', file);
                                        onChange(file);
                                    }}
                                ></Input>
                            </>
                        )}
                    />
                    <button
                        onClick={handleButtonClick}
                        className="mt-2 aspect-[2/1] w-72 rounded-xl max-[480px]:w-full"
                        type="button"
                    >
                        {selectedImage ? (
                            <img
                                src={selectedImage}
                                alt="Selected Preview"
                                className="aspect-[2/1] w-72 rounded-xl max-[480px]:w-full"
                            />
                        ) : (
                            <div className="flex aspect-[2/1] w-72 items-center justify-center rounded-xl bg-white text-6xl max-[480px]:w-full">
                                <ImagePlusIcon className="h-12 w-12 text-red-700" />
                            </div>
                        )}
                    </button>
                </div>
                <div className="col-span-3 flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="name"
                    >
                        Name
                    </Label>
                    <Controller
                        name="name"
                        control={control}
                        render={({
                            field: { name, onBlur, onChange, ref },
                            fieldState: { error },
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
                                <p className="mb-2 font-light text-[Brown]">
                                    {error?.message}
                                </p>
                            </>
                        )}
                    />
                </div>
                <div className="col-span-3 flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="cnic"
                    >
                        CNIC
                    </Label>
                    <Controller
                        name="cnic"
                        control={control}
                        render={({
                            field: { name, onBlur, onChange, ref },
                            fieldState: { error },
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
                                <p className="mb-2 font-light text-[Brown]">
                                    {error?.message}
                                </p>
                            </>
                        )}
                    />
                </div>
                <div className="col-span-3 flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="email"
                    >
                        E-mail
                    </Label>
                    <Controller
                        name="email"
                        control={control}
                        render={({
                            field: { name, onBlur, onChange, ref },
                            fieldState: { error },
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
                                <p className="mb-2 font-light text-[Brown]">
                                    {error?.message}
                                </p>
                            </>
                        )}
                    />
                </div>
                <div className="col-span-3 flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="experience"
                    >
                        Experience
                    </Label>
                    <Controller
                        name="experience"
                        control={control}
                        render={({
                            field: { name, onBlur, onChange, ref },
                            fieldState: { error },
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
                                <p className="mb-2 font-light text-[Brown]">
                                    {error?.message}
                                </p>
                            </>
                        )}
                    />
                </div>
                <div className="col-span-3 flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="enrollment_number"
                    >
                        Enrollment Number
                    </Label>
                    <Controller
                        name="enrollment_number"
                        control={control}
                        render={({
                            field: { name, onBlur, onChange, ref },
                            fieldState: { error },
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
                                <p className="mb-2 font-light text-[Brown]">
                                    {error?.message}
                                </p>
                            </>
                        )}
                    />
                </div>
                <div className="col-span-3 flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="specialization"
                    >
                        <div className="flex items-center">
                            <div className="mr-1">Specialization</div>
                        </div>
                    </Label>
                    <Controller
                        name="specialization"
                        control={control}
                        render={({
                            field: { name, onBlur, onChange, ref },
                            fieldState: { error },
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
                                <p className="mb-2 font-light text-[Brown]">
                                    {error?.message}
                                </p>
                            </>
                        )}
                    />
                </div>
                <div className="col-span-3 flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="phone"
                    >
                        <div className="flex items-center">
                            <div className="mr-1">Phone</div>
                        </div>
                    </Label>
                    <Controller
                        name="phone"
                        control={control}
                        render={({
                            field: { name, onBlur, onChange, ref },
                            fieldState: { error },
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
                                <p className="mb-2 font-light text-[Brown]">
                                    {error?.message}
                                </p>
                            </>
                        )}
                    />
                </div>
                <div className="col-span-3 flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="designation"
                    >
                        Designation
                    </Label>
                    <div className="mt-2 rounded-md bg-white">
                        <Controller
                            name="designation"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={open}
                                            className="h-10 w-full justify-between bg-white hover:bg-white"
                                            onClick={() =>
                                                setOpen((prev) => !prev)
                                            }
                                        >
                                            {value
                                                ? frameworks.find(
                                                      (framework) =>
                                                          framework.value ===
                                                          value
                                                  )?.label
                                                : 'No Trainer...'}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-red-700 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto bg-red-50 p-0">
                                        <div>
                                            <ul>
                                                {frameworks.map((framework) => (
                                                    <li
                                                        key={framework.value}
                                                        onClick={() => {
                                                            field.onChange(
                                                                framework.value
                                                            );
                                                            setValue(
                                                                framework.label
                                                            );
                                                            setOpen(false);
                                                        }}
                                                        className="cursor-pointer p-2"
                                                    >
                                                        <Check
                                                            className={cn(
                                                                'mr-2 h-4 w-4',
                                                                value ===
                                                                    framework.value
                                                                    ? 'opacity-100'
                                                                    : 'opacity-0'
                                                            )}
                                                        />
                                                        {framework.label}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )}
                        />
                    </div>
                </div>
                <div className="col-span-3 flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="dateTime"
                    >
                        Date
                    </Label>
                    <Controller
                        name="dateTime"
                        control={control}
                        render={({ field }) => (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={'outline'}
                                        className={cn(
                                            'mt-2 h-10 w-full justify-start text-left font-normal',
                                            !field.value &&
                                                'bg-white hover:bg-white'
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4 text-red-700" />
                                        {field.value ? (
                                            format(field.value, 'PPP')
                                        ) : (
                                            <span className="text-red-300">
                                                Pick a date
                                            </span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto bg-red-50 p-0">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={(selectedDate) =>
                                            field.onChange(selectedDate || null)
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        )}
                    />
                </div>
                <div className="col-span-3 flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="training_type"
                    >
                        Training Type
                    </Label>
                    <Controller
                        name="training_type"
                        control={control}
                        render={({
                            field: { name, onBlur, onChange, ref },
                            fieldState: { error },
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
                                <p className="mb-2 font-light text-[Brown]">
                                    {error?.message}
                                </p>
                            </>
                        )}
                    />
                </div>
                <div className="col-span-12 flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="location"
                    >
                        Location
                    </Label>
                    <Controller
                        name="location"
                        control={control}
                        render={({
                            field: { name, onBlur, onChange, ref },
                            fieldState: { error },
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
                                <p className="mb-2 font-light text-[Brown]">
                                    {error?.message}
                                </p>
                            </>
                        )}
                    />
                </div>
                <div className="col-span-12 flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="bio"
                    >
                        Bio
                    </Label>
                    <Controller
                        name="bio"
                        control={control}
                        render={({
                            field: { name, onBlur, onChange, ref },
                            fieldState: { error },
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
                                <p className="mb-2 font-light text-[Brown]">
                                    {error?.message}
                                </p>
                            </>
                        )}
                    />
                </div>
                <div className="col-span-3 flex">
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
export default AddTrainer;
