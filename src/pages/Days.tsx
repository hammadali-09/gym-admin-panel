import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown, PlusIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const frameworks = [
    {
        value: '7AM - 8AM',
        label: '7AM - 8AM',
    },
    {
        value: '9AM - 10AM',
        label: '9AM - 10AM',
    },
    {
        value: '11AM - 12PM',
        label: '11AM - 12PM',
    },
    {
        value: '1PM - 2PM',
        label: '1PM - 2PM',
    },
    {
        value: '3PM - 4PM',
        label: '3PM - 4PM',
    },
    {
        value: '5PM - 6PM',
        label: '5PM - 6PM',
    },
    {
        value: '7PM - 8PM',
        label: '7PM - 8PM',
    },
    {
        value: '9PM - 10PM',
        label: '9PM - 10PM',
    },
    {
        value: '11PM - 12AM',
        label: '11PM - 12AM',
    },
];

const formSchema = z.object({
    name: z.string(),
    breakfast_meal: z.string(),
    breakfast_time: z.string(),
    calories: z.string(),
    allergy: z.string(),
    snack_meal: z.string(),
    snack_meal_1: z.string(),
    snack_time: z.string(),
    snack_time_1: z.string(),
    lunch_meal: z.string(),
    lunch_time: z.string(),
    dinner_meal: z.string(),
    dinner_time: z.string(),
    note: z.string(),
});

type formValues = z.infer<typeof formSchema>;

const Days = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');

    const [open1, setOpen1] = useState(false);
    const [value1, setValue1] = useState('');

    const [open2, setOpen2] = useState(false);
    const [value2, setValue2] = useState('');

    const [open3, setOpen3] = useState(false);
    const [value3, setValue3] = useState('');

    const [open4, setOpen4] = useState(false);
    const [value4, setValue4] = useState('');

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

    const onFormSubmit = async (data: formValues) => {};

    return (
        <form
            onSubmit={handleSubmit(onFormSubmit)}
            className="w-full max-[1200px]:w-[95%] max-[768px]:w-full"
        >
            <div className="w-1/4 px-5 pt-4">
                <Label
                    className="my-[5px] text-base font-semibold leading-normal text-gray-500"
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
                                placeholder="Diet Name"
                                id={name}
                                name={name}
                                ref={ref}
                                onBlur={onBlur}
                                onChange={onChange}
                                className="text-basis flex h-10 w-full border-none font-semibold leading-normal outline-none"
                            ></Input>
                            <p className="mb-2 font-light text-[Brown]">
                                {error?.message}
                            </p>
                        </>
                    )}
                />
            </div>
            <div className="min-h-screen w-full p-5">
                <div className="flex w-full justify-between">
                    <h1 className="my-[5px] text-3xl font-bold leading-normal text-black">
                        Day 1
                    </h1>
                </div>
                <div className="overflow-y-hidden">
                    <div className="max-[992px]:w-[992px] max-[768px]:w-[800px]">
                        <div className="my-2.5">
                            <div className="flex w-full items-center gap-2.5">
                                <div className="basis-2/5">
                                    <Label
                                        className="text-base font-semibold leading-normal text-gray-500"
                                        htmlFor="breakfast_meal"
                                    >
                                        Breakfast
                                    </Label>
                                </div>
                                <div className="basis-1/5">
                                    <Label
                                        className="text-base font-semibold leading-normal text-gray-500"
                                        htmlFor="breakfast_time"
                                    >
                                        Time
                                    </Label>
                                </div>
                                <div className="basis-1/5">
                                    <Label
                                        className="text-base font-semibold leading-normal text-gray-500"
                                        htmlFor="calories"
                                    >
                                        Calories
                                    </Label>
                                </div>
                                <div className="basis-1/5">
                                    <Label
                                        className="text-base font-semibold leading-normal text-gray-500"
                                        htmlFor="allergy"
                                    >
                                        Allergy
                                    </Label>
                                </div>
                            </div>
                            <div className="flex items-center justify-between gap-2.5">
                                <div className="basis-2/5">
                                    <Controller
                                        name="breakfast_meal"
                                        control={control}
                                        render={({
                                            field: {
                                                name,
                                                onBlur,
                                                onChange,
                                                ref,
                                            },
                                        }) => (
                                            <>
                                                <Input
                                                    placeholder="Meal"
                                                    id={name}
                                                    name={name}
                                                    ref={ref}
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    className="text-basis flex h-10 w-full border-none font-semibold leading-normal outline-none"
                                                ></Input>
                                                
                                            </>
                                        )}
                                    />
                                </div>
                                <div className="basis-1/5">
                                    <div className="overflow-auto rounded-md border-none bg-white outline-none">
                                        <>
                                            <Controller
                                                name="breakfast_time"
                                                control={control}
                                                defaultValue="" 
                                                render={({ field }) => (
                                                    <Popover
                                                        open={open}
                                                        onOpenChange={setOpen}
                                                    >
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                role="combobox"
                                                                aria-expanded={
                                                                    open
                                                                }
                                                                className="m-0 h-10 w-full justify-between bg-white hover:bg-white"
                                                                onClick={() =>
                                                                    setOpen(
                                                                        (
                                                                            prev
                                                                        ) =>
                                                                            !prev
                                                                    )
                                                                }
                                                            >
                                                                {value
                                                                    ? frameworks.find(
                                                                          (
                                                                              framework
                                                                          ) =>
                                                                              framework.value ===
                                                                              value
                                                                      )?.label
                                                                    : 'Select Time...'}
                                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-red-700 opacity-50" />
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="flex h-60 w-[250px] justify-center overflow-auto bg-red-50 p-0">
                                                            <div>
                                                                <ul>
                                                                    {frameworks.map(
                                                                        (
                                                                            framework
                                                                        ) => (
                                                                            <li
                                                                                key={
                                                                                    framework.value
                                                                                }
                                                                                onClick={() => {
                                                                                    field.onChange(
                                                                                        framework.value
                                                                                    );
                                                                                    setValue(
                                                                                        framework.label
                                                                                    ); 
                                                                                    setOpen(
                                                                                        false
                                                                                    ); 
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
                                                                                {
                                                                                    framework.label
                                                                                }
                                                                            </li>
                                                                        )
                                                                    )}
                                                                </ul>
                                                            </div>
                                                        </PopoverContent>
                                                    </Popover>
                                                )}
                                            />
                                        </>
                                    </div>
                                </div>
                                <div className="basis-1/5 py-[2px]">
                                    <Controller
                                        name="calories"
                                        control={control}
                                        render={({
                                            field: {
                                                name,
                                                onBlur,
                                                onChange,
                                                ref,
                                            },
                                        }) => (
                                            <>
                                                <Input
                                                    placeholder="0"
                                                    id={name}
                                                    name={name}
                                                    ref={ref}
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    className="text-basis flex h-10 w-full border-none font-semibold leading-normal outline-none"
                                                ></Input>
                                                
                                            </>
                                        )}
                                    />
                                </div>
                                <div className="basis-1/5 py-[2px]">
                                    <Controller
                                        name="allergy"
                                        control={control}
                                        render={({
                                            field: {
                                                name,
                                                onBlur,
                                                onChange,
                                                ref,
                                            },
                                            
                                        }) => (
                                            <>
                                                <Input
                                                    placeholder="Milk"
                                                    id={name}
                                                    name={name}
                                                    ref={ref}
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    className="text-basis flex h-10 w-full border-none font-semibold leading-normal outline-none"
                                                ></Input>
                                            </>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mb-2.5 mt-[30px]">
                            <div className="flex w-full items-center gap-2.5">
                                <div className="basis-2/5">
                                    <Label
                                        className="text-base font-semibold leading-normal text-gray-500"
                                        htmlFor="snack_meal"
                                    >
                                        Snacks(optional)
                                    </Label>
                                </div>
                                <div className="basis-1/5">
                                    <Label
                                        className="text-base font-semibold leading-normal text-gray-500"
                                        htmlFor="snack_time"
                                    >
                                        Time
                                    </Label>
                                </div>
                                <div className="basis-1/5">
                                    <Label
                                        className="text-base font-semibold leading-normal text-gray-500"
                                        htmlFor="calories"
                                    >
                                        Calories
                                    </Label>
                                </div>
                                <div className="basis-1/5">
                                    <Label
                                        className="text-base font-semibold leading-normal text-gray-500"
                                        htmlFor="allergy"
                                    >
                                        Allergy
                                    </Label>
                                </div>
                            </div>
                            <div className="flex items-center justify-between gap-2.5">
                                <div className="basis-2/5">
                                    <Controller
                                        name="snack_meal"
                                        control={control}
                                        render={({
                                            field: {
                                                name,
                                                onBlur,
                                                onChange,
                                                ref,
                                            },
                                           
                                        }) => (
                                            <>
                                                <Input
                                                    placeholder="Meal"
                                                    id={name}
                                                    name={name}
                                                    ref={ref}
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    className="text-basis flex h-10 w-full border-none font-semibold leading-normal outline-none"
                                                ></Input>
                                                
                                            </>
                                        )}
                                    />
                                </div>
                                <div className="basis-1/5">
                                    <div className="rounded-md border-none bg-white outline-none">
                                        <>
                                            <Controller
                                                name="snack_time"
                                                control={control}
                                                defaultValue="" // Set default to an empty string or a default value
                                                render={({ field }) => (
                                                    <Popover
                                                        open={open1}
                                                        onOpenChange={setOpen1}
                                                    >
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                role="combobox"
                                                                aria-expanded={
                                                                    open1
                                                                }
                                                                className="m-0 h-10 w-full justify-between bg-white hover:bg-white"
                                                                onClick={() =>
                                                                    setOpen1(
                                                                        (
                                                                            prev
                                                                        ) =>
                                                                            !prev
                                                                    )
                                                                }
                                                            >
                                                                {value1
                                                                    ? frameworks.find(
                                                                          (
                                                                              framework
                                                                          ) =>
                                                                              framework.value ===
                                                                              value1
                                                                      )?.label
                                                                    : 'Select Time...'}
                                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-red-700 opacity-50" />
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="flex h-60 w-[250px] justify-center overflow-auto bg-red-50 p-0">
                                                            <div>
                                                                <ul>
                                                                    {frameworks.map(
                                                                        (
                                                                            framework
                                                                        ) => (
                                                                            <li
                                                                                key={
                                                                                    framework.value
                                                                                }
                                                                                onClick={() => {
                                                                                    field.onChange(
                                                                                        framework.value
                                                                                    );
                                                                                    setValue1(
                                                                                        framework.label
                                                                                    ); // Set selected value
                                                                                    setOpen1(
                                                                                        false
                                                                                    ); // Close popover
                                                                                }}
                                                                                className="cursor-pointer p-2"
                                                                            >
                                                                                <Check
                                                                                    className={cn(
                                                                                        'mr-2 h-4 w-4',
                                                                                        value1 ===
                                                                                            framework.value
                                                                                            ? 'opacity-100'
                                                                                            : 'opacity-0'
                                                                                    )}
                                                                                />
                                                                                {
                                                                                    framework.label
                                                                                }
                                                                            </li>
                                                                        )
                                                                    )}
                                                                </ul>
                                                            </div>
                                                        </PopoverContent>
                                                    </Popover>
                                                )}
                                            />
                                        </>
                                    </div>
                                </div>
                                <div className="basis-1/5 py-[2px]">
                                    <Controller
                                        name="calories"
                                        control={control}
                                        render={({
                                            field: {
                                                name,
                                                onBlur,
                                                onChange,
                                                ref,
                                            },
                                           
                                        }) => (
                                            <>
                                                <Input
                                                    placeholder="0"
                                                    id={name}
                                                    name={name}
                                                    ref={ref}
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    className="text-basis flex h-10 w-full border-none font-semibold leading-normal outline-none"
                                                ></Input>
                                                
                                            </>
                                        )}
                                    />
                                </div>
                                <div className="basis-1/5 py-[2px]">
                                    <Controller
                                        name="allergy"
                                        control={control}
                                        render={({
                                            field: {
                                                name,
                                                onBlur,
                                                onChange,
                                                ref,
                                            },
                                           
                                        }) => (
                                            <>
                                                <Input
                                                    placeholder="Milk"
                                                    id={name}
                                                    name={name}
                                                    ref={ref}
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    className="text-basis flex h-10 w-full border-none font-semibold leading-normal outline-none"
                                                ></Input>
                                                
                                            </>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mb-2.5 mt-[30px]">
                            <div className="flex w-full items-center gap-2.5">
                                <div className="basis-2/5">
                                    <Label
                                        className="text-base font-semibold leading-normal text-gray-500"
                                        htmlFor="lunch_meal"
                                    >
                                        Lunch
                                    </Label>
                                </div>
                                <div className="basis-1/5">
                                    <Label
                                        className="text-base font-semibold leading-normal text-gray-500"
                                        htmlFor="lunch_time"
                                    >
                                        Time
                                    </Label>
                                </div>
                                <div className="basis-1/5">
                                    <Label
                                        className="text-base font-semibold leading-normal text-gray-500"
                                        htmlFor="calories"
                                    >
                                        Calories
                                    </Label>
                                </div>
                                <div className="basis-1/5">
                                    <Label
                                        className="text-base font-semibold leading-normal text-gray-500"
                                        htmlFor="allergy"
                                    >
                                        Allergy
                                    </Label>
                                </div>
                            </div>
                            <div className="flex items-center justify-between gap-2.5">
                                <div className="basis-2/5">
                                    <Controller
                                        name="lunch_meal"
                                        control={control}
                                        render={({
                                            field: {
                                                name,
                                                onBlur,
                                                onChange,
                                                ref,
                                            },
                                            
                                        }) => (
                                            <>
                                                <Input
                                                    placeholder="Meal"
                                                    id={name}
                                                    name={name}
                                                    ref={ref}
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    className="text-basis flex h-10 w-full border-none font-semibold leading-normal outline-none"
                                                ></Input>
                                               
                                            </>
                                        )}
                                    />
                                </div>
                                <div className="basis-1/5">
                                    <div className="rounded-md border-none bg-white outline-none">
                                        <>
                                            <Controller
                                                name="lunch_time"
                                                control={control}
                                                defaultValue="" // Set default to an empty string or a default value
                                                render={({ field }) => (
                                                    <Popover
                                                        open={open2}
                                                        onOpenChange={setOpen2}
                                                    >
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                role="combobox"
                                                                aria-expanded={
                                                                    open2
                                                                }
                                                                className="m-0 h-10 w-full justify-between bg-white hover:bg-white"
                                                                onClick={() =>
                                                                    setOpen2(
                                                                        (
                                                                            prev
                                                                        ) =>
                                                                            !prev
                                                                    )
                                                                }
                                                            >
                                                                {value2
                                                                    ? frameworks.find(
                                                                          (
                                                                              framework
                                                                          ) =>
                                                                              framework.value ===
                                                                              value2
                                                                      )?.label
                                                                    : 'Select Time...'}
                                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-red-700 opacity-50" />
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="flex h-60 w-[250px] justify-center overflow-auto bg-red-50 p-0">
                                                            <div>
                                                                <ul>
                                                                    {frameworks.map(
                                                                        (
                                                                            framework
                                                                        ) => (
                                                                            <li
                                                                                key={
                                                                                    framework.value
                                                                                }
                                                                                onClick={() => {
                                                                                    field.onChange(
                                                                                        framework.value
                                                                                    );
                                                                                    setValue2(
                                                                                        framework.label
                                                                                    ); // Set selected value
                                                                                    setOpen2(
                                                                                        false
                                                                                    ); // Close popover
                                                                                }}
                                                                                className="cursor-pointer p-2"
                                                                            >
                                                                                <Check
                                                                                    className={cn(
                                                                                        'mr-2 h-4 w-4',
                                                                                        value2 ===
                                                                                            framework.value
                                                                                            ? 'opacity-100'
                                                                                            : 'opacity-0'
                                                                                    )}
                                                                                />
                                                                                {
                                                                                    framework.label
                                                                                }
                                                                            </li>
                                                                        )
                                                                    )}
                                                                </ul>
                                                            </div>
                                                        </PopoverContent>
                                                    </Popover>
                                                )}
                                            />
                                        </>
                                    </div>
                                </div>
                                <div className="basis-1/5 py-[2px]">
                                    <Controller
                                        name="calories"
                                        control={control}
                                        render={({
                                            field: {
                                                name,
                                                onBlur,
                                                onChange,
                                                ref,
                                            },
                                           
                                        }) => (
                                            <>
                                                <Input
                                                    placeholder="0"
                                                    id={name}
                                                    name={name}
                                                    ref={ref}
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    className="text-basis flex h-10 w-full border-none font-semibold leading-normal outline-none"
                                                ></Input>
                                                
                                            </>
                                        )}
                                    />
                                </div>
                                <div className="basis-1/5 py-[2px]">
                                    <Controller
                                        name="allergy"
                                        control={control}
                                        render={({
                                            field: {
                                                name,
                                                onBlur,
                                                onChange,
                                                ref,
                                            },
                                            
                                        }) => (
                                            <>
                                                <Input
                                                    placeholder="Milk"
                                                    id={name}
                                                    name={name}
                                                    ref={ref}
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    className="text-basis flex h-10 w-full border-none font-semibold leading-normal outline-none"
                                                ></Input>
                                               
                                            </>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mb-2.5 mt-[30px]">
                            <div className="flex w-full items-center gap-2.5">
                                <div className="basis-2/5">
                                    <Label
                                        className="text-base font-semibold leading-normal text-gray-500"
                                        htmlFor="snack_meal_1"
                                    >
                                        Snacks(optional)
                                    </Label>
                                </div>
                                <div className="basis-1/5">
                                    <Label
                                        className="text-base font-semibold leading-normal text-gray-500"
                                        htmlFor="snack_time"
                                    >
                                        Time
                                    </Label>
                                </div>
                                <div className="basis-1/5">
                                    <Label
                                        className="text-base font-semibold leading-normal text-gray-500"
                                        htmlFor="calories"
                                    >
                                        Calories
                                    </Label>
                                </div>
                                <div className="basis-1/5">
                                    <Label
                                        className="text-base font-semibold leading-normal text-gray-500"
                                        htmlFor="allergy"
                                    >
                                        Allergy
                                    </Label>
                                </div>
                            </div>
                            <div className="flex items-center justify-between gap-2.5">
                                <div className="basis-2/5">
                                    <Controller
                                        name="snack_meal_1"
                                        control={control}
                                        render={({
                                            field: {
                                                name,
                                                onBlur,
                                                onChange,
                                                ref,
                                            },
                                           
                                        }) => (
                                            <>
                                                <Input
                                                    placeholder="Meal"
                                                    id={name}
                                                    name={name}
                                                    ref={ref}
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    className="text-basis flex h-10 w-full border-none font-semibold leading-normal outline-none"
                                                ></Input>
                                               
                                            </>
                                        )}
                                    />
                                </div>
                                <div className="basis-1/5">
                                    <div className="rounded-md border-none bg-white outline-none">
                                        <>
                                            <Controller
                                                name="snack_time_1"
                                                control={control}
                                                defaultValue="" // Set default to an empty string or a default value
                                                render={({ field }) => (
                                                    <Popover
                                                        open={open3}
                                                        onOpenChange={setOpen3}
                                                    >
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                role="combobox"
                                                                aria-expanded={
                                                                    open3
                                                                }
                                                                className="m-0 h-10 w-full justify-between bg-white hover:bg-white"
                                                                onClick={() =>
                                                                    setOpen3(
                                                                        (
                                                                            prev
                                                                        ) =>
                                                                            !prev
                                                                    )
                                                                }
                                                            >
                                                                {value3
                                                                    ? frameworks.find(
                                                                          (
                                                                              framework
                                                                          ) =>
                                                                              framework.value ===
                                                                              value3
                                                                      )?.label
                                                                    : 'Select Time...'}
                                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-red-700 opacity-50" />
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="flex h-60 w-[250px] justify-center overflow-auto bg-red-50 p-0">
                                                            <div>
                                                                <ul>
                                                                    {frameworks.map(
                                                                        (
                                                                            framework
                                                                        ) => (
                                                                            <li
                                                                                key={
                                                                                    framework.value
                                                                                }
                                                                                onClick={() => {
                                                                                    field.onChange(
                                                                                        framework.value
                                                                                    );
                                                                                    setValue3(
                                                                                        framework.label
                                                                                    ); // Set selected value
                                                                                    setOpen3(
                                                                                        false
                                                                                    ); // Close popover
                                                                                }}
                                                                                className="cursor-pointer p-2"
                                                                            >
                                                                                <Check
                                                                                    className={cn(
                                                                                        'mr-2 h-4 w-4',
                                                                                        value3 ===
                                                                                            framework.value
                                                                                            ? 'opacity-100'
                                                                                            : 'opacity-0'
                                                                                    )}
                                                                                />
                                                                                {
                                                                                    framework.label
                                                                                }
                                                                            </li>
                                                                        )
                                                                    )}
                                                                </ul>
                                                            </div>
                                                        </PopoverContent>
                                                    </Popover>
                                                )}
                                            />
                                        </>
                                    </div>
                                </div>
                                <div className="basis-1/5 py-[2px]">
                                    <Controller
                                        name="calories"
                                        control={control}
                                        render={({
                                            field: {
                                                name,
                                                onBlur,
                                                onChange,
                                                ref,
                                            },
                                           
                                        }) => (
                                            <>
                                                <Input
                                                    placeholder="0"
                                                    id={name}
                                                    name={name}
                                                    ref={ref}
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    className="text-basis flex h-10 w-full border-none font-semibold leading-normal outline-none"
                                                ></Input>
                                                
                                            </>
                                        )}
                                    />
                                </div>
                                <div className="basis-1/5 py-[2px]">
                                    <Controller
                                        name="allergy"
                                        control={control}
                                        render={({
                                            field: {
                                                name,
                                                onBlur,
                                                onChange,
                                                ref,
                                            },
                                            
                                        }) => (
                                            <>
                                                <Input
                                                    placeholder="Milk"
                                                    id={name}
                                                    name={name}
                                                    ref={ref}
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    className="text-basis flex h-10 w-full border-none font-semibold leading-normal outline-none"
                                                ></Input>
                                               
                                            </>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mb-2.5 mt-[30px]">
                            <div className="flex w-full items-center gap-2.5">
                                <div className="basis-2/5">
                                    <Label
                                        className="text-base font-semibold leading-normal text-gray-500"
                                        htmlFor="dinner_meal"
                                    >
                                        Dinner
                                    </Label>
                                </div>
                                <div className="basis-1/5">
                                    <Label
                                        className="text-base font-semibold leading-normal text-gray-500"
                                        htmlFor="dinner_time"
                                    >
                                        Time
                                    </Label>
                                </div>
                                <div className="basis-1/5">
                                    <Label
                                        className="text-base font-semibold leading-normal text-gray-500"
                                        htmlFor="calories"
                                    >
                                        Calories
                                    </Label>
                                </div>
                                <div className="basis-1/5">
                                    <Label
                                        className="text-base font-semibold leading-normal text-gray-500"
                                        htmlFor="allergy"
                                    >
                                        Allergy
                                    </Label>
                                </div>
                            </div>
                            <div className="flex items-center justify-between gap-2.5">
                                <div className="basis-2/5">
                                    <Controller
                                        name="dinner_meal"
                                        control={control}
                                        render={({
                                            field: {
                                                name,
                                                onBlur,
                                                onChange,
                                                ref,
                                            },
                                          
                                        }) => (
                                            <>
                                                <Input
                                                    placeholder="Meal"
                                                    id={name}
                                                    name={name}
                                                    ref={ref}
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    className="text-basis flex h-10 w-full border-none font-semibold leading-normal outline-none"
                                                ></Input>
                                                
                                            </>
                                        )}
                                    />
                                </div>
                                <div className="basis-1/5">
                                    <div className="rounded-md border-none bg-white outline-none">
                                        <>
                                            <Controller
                                                name="dinner_time"
                                                control={control}
                                                defaultValue="" // Set default to an empty string or a default value
                                                render={({ field }) => (
                                                    <Popover
                                                        open={open4}
                                                        onOpenChange={setOpen4}
                                                    >
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                role="combobox"
                                                                aria-expanded={
                                                                    open4
                                                                }
                                                                className="m-0 h-10 w-full justify-between bg-white hover:bg-white"
                                                                onClick={() =>
                                                                    setOpen4(
                                                                        (
                                                                            prev
                                                                        ) =>
                                                                            !prev
                                                                    )
                                                                }
                                                            >
                                                                {value4
                                                                    ? frameworks.find(
                                                                          (
                                                                              framework
                                                                          ) =>
                                                                              framework.value ===
                                                                              value4
                                                                      )?.label
                                                                    : 'Select Time...'}
                                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-red-700 opacity-50" />
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="flex h-60 w-[250px] justify-center overflow-auto bg-red-50 p-0">
                                                            <div>
                                                                <ul>
                                                                    {frameworks.map(
                                                                        (
                                                                            framework
                                                                        ) => (
                                                                            <li
                                                                                key={
                                                                                    framework.value
                                                                                }
                                                                                onClick={() => {
                                                                                    field.onChange(
                                                                                        framework.value
                                                                                    );
                                                                                    setValue4(
                                                                                        framework.label
                                                                                    ); // Set selected value
                                                                                    setOpen4(
                                                                                        false
                                                                                    ); // Close popover
                                                                                }}
                                                                                className="cursor-pointer p-2"
                                                                            >
                                                                                <Check
                                                                                    className={cn(
                                                                                        'mr-2 h-4 w-4',
                                                                                        value4 ===
                                                                                            framework.value
                                                                                            ? 'opacity-100'
                                                                                            : 'opacity-0'
                                                                                    )}
                                                                                />
                                                                                {
                                                                                    framework.label
                                                                                }
                                                                            </li>
                                                                        )
                                                                    )}
                                                                </ul>
                                                            </div>
                                                        </PopoverContent>
                                                    </Popover>
                                                )}
                                            />
                                        </>
                                    </div>
                                </div>
                                <div className="basis-1/5 py-[2px]">
                                    <Controller
                                        name="calories"
                                        control={control}
                                        render={({
                                            field: {
                                                name,
                                                onBlur,
                                                onChange,
                                                ref,
                                            },
                                            
                                        }) => (
                                            <>
                                                <Input
                                                    placeholder="0"
                                                    id={name}
                                                    name={name}
                                                    ref={ref}
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    className="text-basis flex h-10 w-full border-none font-semibold leading-normal outline-none"
                                                ></Input>
                                               
                                            </>
                                        )}
                                    />
                                </div>
                                <div className="basis-1/5 py-[2px]">
                                    <Controller
                                        name="allergy"
                                        control={control}
                                        render={({
                                            field: {
                                                name,
                                                onBlur,
                                                onChange,
                                                ref,
                                            },
                                           
                                        }) => (
                                            <>
                                                <Input
                                                    placeholder="Milk"
                                                    id={name}
                                                    name={name}
                                                    ref={ref}
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    className="text-basis flex h-10 w-full border-none font-semibold leading-normal outline-none"
                                                ></Input>
                                               
                                            </>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-5">
                <Button className="inline-block h-[50px] w-[230px] bg-red-700 hover:bg-red-300 max-[768px]:w-full">
                    <p className="flex items-center justify-center text-sm">
                        <PlusIcon className="h-25 w-25 mr-3 object-contain text-4xl" />
                        Add Days
                    </p>
                </Button>
            </div>
            <div className="flex w-full items-center gap-5 bg-red-200 px-[50px] py-5 max-[1024px]:flex-wrap">
                <div className="basis-4/5 max-[1024px]:w-full">
                    <Label
                        className="block text-sm font-semibold leading-normal text-black"
                        htmlFor="note"
                    >
                        Note for special instructions
                    </Label>
                    <Controller
                        name="note"
                        control={control}
                        render={({
                            field: { name, onBlur, onChange, ref },
                        }) => (
                            <>
                                <Textarea
                                    placeholder="Focus of this plan: (e.g., weight loss, muscle gain, manage a specific condition) Key goals: (e.g., lose X lbs, improve energy levels, build muscle mass) Dietary approach: (e.g., low-carb, keto, Mediterranean) Special considerations: (e.g., allergies, food preferences, dietary restrictions)"
                                    id={name}
                                    name={name}
                                    ref={ref}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    className="mt-1 h-24 w-full rounded-[0.625rem] border-none p-2.5 text-xs font-semibold text-gray-500 focus:outline-none"
                                ></Textarea>
                            </>
                        )}
                    />
                </div>
                <div className="basis-[10%]">
                    <Button
                        className="inline-block h-[50px] w-[230px] bg-red-700 hover:bg-red-300 max-[768px]:w-full"
                        type="submit"
                    >
                        <p className="flex items-center justify-center text-sm">
                            Save
                        </p>
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default Days;
