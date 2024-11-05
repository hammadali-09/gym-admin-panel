import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImagePlusIcon, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger,} from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useEffect, useState, useRef, useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addClients } from '../switchSlice';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const frameworks = [
    {
        value: 'Ashar Ali',
        label: 'Ashar Ali',
    },
    {
        value: 'Muhammad Danish',
        label: 'Muhammad Danish',
    },
    {
        value: 'Salman Ali',
        label: 'Salman Ali',
    },
    {
        value: 'Umer Sheikh',
        label: 'Umer Sheikh',
    },
    {
        value: 'Roohan Khawaja',
        label: 'Roohan Khawaja',
    },
    {
        value: 'No Trainer',
        label: 'No Trainer',
    },
];

const Packages = [
    {
        value: 'Package A',
        label: 'Package A',
    },
    {
        value: 'Package B',
        label: 'Package B',
    },
    {
        value: 'Package C',
        label: 'Package C',
    },
    {
        value: 'Package D',
        label: 'Package D',
    },
    {
        value: 'Package E',
        label: 'Package E',
    },
];

const formSchema = z.object({
    member_id: z.string(),
    name: z.string(),
    cnic: z.string(),
    email: z.string(),
    phone: z.string(),
    height: z.string(),
    weight: z.string(),
    goal: z.string(),
    exercise: z.string(),
    medical_issue: z.string(),
    package_type: z.string(),
    registration_date: z.date(),
    trainer: z.string(),
    enrollment_number: z.string(),
    notes: z.string(),
    image: z.instanceof(File).optional(),
});

type formValues = z.infer<typeof formSchema>;

const AddClient = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');

    const [show, setShow] = useState(false);
    const [values, setValues] = useState('');

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
    const token = useSelector((state: RootState) => state.auth.token);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const imageFile = watch('image');

     const convertToBase64 = (file: File): Promise<string> => {
         return new Promise((resolve, reject) => {
             const reader = new FileReader();
             reader.readAsDataURL(file);
             reader.onload = () => resolve(reader.result as string); 
             reader.onerror = (error) => reject(error);
         });
     };

    const onFormSubmit = async (data: formValues) => {
        console.log('🚀 ~ onFormSubmit ~ data:', data);

        let base64String = '';

        if (data.image) {
            base64String = await convertToBase64(data.image);
        }
        const clientData = { ...data, image: base64String };

        try {
            const response = await fetch('http://localhost:4200/api/clients', {
                method: 'POST',
                body: JSON.stringify(clientData),
                headers: {
                    Authorization: token ? `Bearer ${token}` : '',
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();
            if (result.statusCode === 201) {
                dispatch(addClients(result.data));
                navigate('/home/client');
            }
        } catch (error) {
            console.error('Error adding client to server:', error);
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
                        htmlFor="image"
                    >
                        Picture
                    </Label>
                    <Controller
                        name="image"
                        control={control}
                        render={({
                            field: { name, onChange },
                            fieldState: { error },
                        }) => (
                            <>
                                <Input
                                    type="file"
                                    id={name}
                                    name={name}
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
                                <p className="mb-2 font-light text-[Brown]">
                                    {error?.message}
                                </p>
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
                        htmlFor="member_id"
                    >
                        Member ID
                    </Label>
                    <Controller
                        name="member_id"
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
                                    placeholder="CNIC"
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
                        htmlFor="phone"
                    >
                        Phone
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
                        htmlFor="registration_date"
                    >
                        Registration Date
                    </Label>
                    <Controller
                        name="registration_date"
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
                        htmlFor="enrollment_number"
                    >
                        Enrollment Number
                    </Label>
                    <Controller
                        name="enrollment_number"
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
                <div className="col-span-3 flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="height"
                    >
                        <div className="flex items-center">
                            <div className="mr-1">Height</div>
                            <div className="text-xs font-semibold text-red-300">
                                (in cm)
                            </div>
                        </div>
                    </Label>
                    <Controller
                        name="height"
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
                <div className="col-span-3 flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="weight"
                    >
                        <div className="flex items-center">
                            <div className="mr-1">Weight</div>
                            <div className="text-xs font-semibold text-red-300">
                                (in Kg)
                            </div>
                        </div>
                    </Label>
                    <Controller
                        name="weight"
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
                <div className="col-span-3 flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="goal"
                    >
                        Goals
                    </Label>
                    <Controller
                        name="goal"
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
                <div className="col-span-3 flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="exercise"
                    >
                        Exercise
                    </Label>
                    <Controller
                        name="exercise"
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
                <div className="col-span-3 flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="medical_issue"
                    >
                        Medical Issue
                    </Label>
                    <Controller
                        name="medical_issue"
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
                <div className="col-span-3 flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="trainer"
                    >
                        Trainer
                    </Label>
                    <div className="mt-2 rounded-md bg-white">
                        <Controller
                            name="trainer"
                            control={control}
                            defaultValue="" // Set default to an empty string or a default value
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
                                    <PopoverContent className="flex h-60 w-[300px] justify-center overflow-auto bg-red-50 p-0">
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
                                                            ); // Set selected value
                                                            setOpen(false); // Close popover
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
                        htmlFor="package_type"
                    >
                        Packages
                    </Label>
                    <div className="mt-2 rounded-md bg-white">
                        <Controller
                            name="package_type"
                            control={control}
                            defaultValue="" // Set default to an empty string or a default value
                            render={({ field }) => (
                                <Popover open={show} onOpenChange={setShow}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={show}
                                            className="h-10 w-full justify-between bg-white hover:bg-white"
                                            onClick={() =>
                                                setShow((prev) => !prev)
                                            }
                                        >
                                            {values
                                                ? Packages.find(
                                                      (Package) =>
                                                          Package.value ===
                                                          values
                                                  )?.label
                                                : 'Select Package...'}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-red-700 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="flex h-60 w-[300px] justify-center overflow-auto bg-red-50 p-0">
                                        <div>
                                            <ul>
                                                {Packages.map((Package) => (
                                                    <li
                                                        key={Package.value}
                                                        onClick={() => {
                                                            field.onChange(
                                                                Package.value
                                                            );
                                                            setValues(
                                                                Package.label
                                                            ); // Set selected value
                                                            setShow(false); // Close popover
                                                        }}
                                                        className="cursor-pointer p-2"
                                                    >
                                                        <Check
                                                            className={cn(
                                                                'mr-2 h-4 w-4',
                                                                values ===
                                                                    Package.value
                                                                    ? 'opacity-100'
                                                                    : 'opacity-0'
                                                            )}
                                                        />
                                                        {Package.label}
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
                <div className="col-span-12 flex flex-col">
                    <Label
                        className="text-sm font-bold text-red-700"
                        htmlFor="notes"
                    >
                        Notes
                    </Label>
                    <Controller
                        name="notes"
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
                                    placeholder='Write Notes Here...'
                                ></Textarea>
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

export default AddClient;
