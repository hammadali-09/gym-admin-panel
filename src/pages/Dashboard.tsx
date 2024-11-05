import { Card } from '@/components/ui/card'
import pic from '../assets/pic1.jpg'
import { Button } from '../components/ui/button'
import picture from '../assets/image.jpg'
import { useNavigate } from 'react-router-dom'
import { CheckCheckIcon, Clock3Icon, FlameIcon, PlusIcon } from 'lucide-react'
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { updateData } from '../chartSlice'

const Dashboard = () => {
    const navigate = useNavigate()
    const handleNavigation = (path: string) => {
        navigate(path)
    }
    const data = useSelector((state: RootState) => state.chart.data)
    const dispatch = useDispatch()

    const handleUpdateData = () => {
        const newData = [
            { days: 'Monday', desktop: Math.round(Math.random() * 350) },
            { days: 'Tuesday', desktop: Math.round(Math.random() * 350) },
            { days: 'Wednesday', desktop: Math.round(Math.random() * 350) },
            { days: 'Thursday', desktop: Math.round(Math.random() * 350) },
            { days: 'Friday', desktop: Math.round(Math.random() * 350) },
            { days: 'Saturday', desktop: Math.round(Math.random() * 350) },
            { days: 'Sunday', desktop: Math.round(Math.random() * 350) },
        ]
        dispatch(updateData(newData))
    }
    const chartConfig = {
        desktop: {
            label: 'Desktop',
            color: '#b91c1c',
        },
    } satisfies ChartConfig

    return (
        <div className="relative flex">
            <div className="ml-8 flex w-9/12 flex-wrap gap-3">
                <Card className="mt-4 flex h-44 w-[calc(33.333333%-0.75rem)] basis-[calc(33.333333%-0.75rem)] bg-gradient-to-t from-blue-500 shadow-lg">
                    <FlameIcon className="absolute m-6 text-4xl text-gray-500" />
                    <span className="absolute mx-14 my-5 flex justify-start text-xl font-bold text-gray-500">
                        1
                    </span>
                    <p className="absolute mx-14 my-12 text-sm font-semibold leading-normal text-gray-500">
                        Active Clients
                    </p>

                    <img
                        src={pic}
                        alt="image"
                        className="relative h-full w-full rounded-md object-cover opacity-10"
                    />
                </Card>
                <Card className="mt-4 flex h-44 w-[calc(33.333333%-0.75rem)] basis-[calc(33.333333%-0.75rem)] bg-gradient-to-t from-red-500 shadow-lg">
                    <CheckCheckIcon className="absolute m-6 text-4xl text-gray-500" />
                    <span className="absolute mx-14 my-5 flex justify-start text-xl font-bold text-gray-500">
                        3
                    </span>
                    <p className="absolute mx-14 my-12 text-sm font-semibold leading-normal text-gray-500">
                        Paid Clients
                    </p>
                    <img
                        src={pic}
                        alt="image"
                        className="h-full w-full rounded-md object-cover opacity-10"
                    />
                </Card>
                <Card className="mt-4 flex h-44 w-[calc(33.333333%-0.75rem)] basis-[calc(33.333333%-0.75rem)] bg-gradient-to-t from-purple-500 shadow-lg">
                    <Clock3Icon className="absolute m-6 text-4xl text-gray-500" />
                    <span className="absolute mx-14 my-5 flex justify-start text-xl font-bold text-gray-500">
                        78
                    </span>
                    <p className="absolute mx-14 my-12 text-sm font-semibold leading-normal text-gray-500">
                        Overdue
                    </p>
                    <img
                        src={pic}
                        alt="image"
                        className="h-full w-full rounded-md object-cover opacity-10"
                    />
                </Card>

                <div className="relative m-10">
                    <div className="absolute right-4 top-2 z-10 flex justify-end">
                        <Button
                            onClick={handleUpdateData}
                            className="absolute rounded bg-red-700 px-4 py-2 text-white hover:bg-red-700"
                        >
                            Update
                        </Button>
                    </div>
                    <ChartContainer
                        className="relative mb-6 mr-16 w-full basis-full rounded-xl bg-gray-50 shadow-xl"
                        config={chartConfig}
                    >
                        <BarChart
                            className="p-14"
                            accessibilityLayer
                            data={data}
                        >
                            <CartesianGrid
                                vertical={true}
                                stroke="#808080"
                                strokeWidth={0.3}
                            />
                            <CartesianGrid
                                horizontal={false}
                                stroke="#808080"
                                strokeWidth={0.3}
                            />
                            <XAxis
                                dataKey="days"
                                tickLine={true}
                                tickMargin={10}
                                axisLine={true}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar
                                dataKey="desktop"
                                fill="var(--color-desktop)"
                                radius={8}
                                barSize={85}
                            />
                        </BarChart>
                    </ChartContainer>
                </div>
            </div>
            <div className="mr-2 flex w-3/12 flex-col">
                <Card className="relative mt-4 h-screen max-w-[350px] bg-gradient-to-t from-yellow-500 shadow-xl">
                    <span className="absolute mb-2 ml-4 mt-[510px] block text-xl font-bold leading-normal text-white">
                        Manage your Daily Diet
                    </span>
                    <p className="absolute ml-4 mr-4 mt-[550px] font-semibold leading-normal text-white">
                        Lorem ipsum dolor sit belong consectetur adidas elit.
                        Officiis delectus nostrum temporibus.
                    </p>
                    <img
                        src={picture}
                        alt="image"
                        className="h-full w-full rounded-md object-cover opacity-[0.1]"
                    />
                    <Button
                        onClick={() => handleNavigation('/home/diet-plans')}
                        type="button"
                        className="absolute bottom-0 left-0 m-4 rounded-md bg-red-700 p-4 text-base font-medium text-white hover:bg-red-700"
                    >
                        <PlusIcon className="mr-2 text-4xl" />
                        <span className="text-sm font-semibold leading-normal">
                            Add Diet
                        </span>
                    </Button>
                </Card>
                <Card className="mt-4 flex h-52 max-w-[350px] bg-gradient-to-t from-cyan-500 to-blue-500 shadow-lg">
                    <span className="absolute m-4 text-lg font-medium leading-normal text-white">
                        Manage your Daily Diet
                    </span>
                    <p className="absolute mx-4 my-14 font-medium leading-normal text-white">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Officiis delectus nostrum temporibus.
                    </p>
                    <img
                        src={pic}
                        alt="image"
                        className="h-full w-full rounded-md object-cover opacity-10"
                    />
                    <Button
                        onClick={() => handleNavigation('/home/packages')}
                        type="button"
                        className="absolute ml-4 mt-36 rounded-md bg-red-700 p-4 text-base font-medium text-white hover:bg-red-700"
                    >
                        <PlusIcon className="mr-2 text-4xl" />
                        <span className="text-sm font-semibold leading-normal">
                            Add Packages
                        </span>
                    </Button>
                </Card>
            </div>
        </div>
    )
}
export default Dashboard
