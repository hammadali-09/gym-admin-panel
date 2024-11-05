import { Navigate, RouteObject } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Attendances from './pages/Attendances'
import Banners from './pages/Banners'
import Client from './pages/Client'
import DietPlans from './pages/DietPlans'
import Packages from './pages/Packages'
import Trainers from './pages/Trainers'
import Vouchers from './pages/Vouchers'
import AuthLayout from './layout/AuthLayout'
import UnauthLayout from './layout/UnauthLayout'
import { lazy, Suspense } from 'react'
import Spinner from './components/ui/spinner'
import Add from './pages/AddClient'
import Days from './pages/Days'
import Register from './RegisterUser' 
import AddTrainer from './pages/AddTrainer'
import AddVoucher from './pages/AddVoucher'
import Edit from './pages/Edit';
import Payment from './pages/Payment'
import AddPackage from './pages/AddPackage'
import AddBanner from './pages/AddBanner'




const Login = lazy(() => import('./Login'))

const appRoutes: Array<RouteObject> = [
    { index: true, element: <Navigate to="auth" replace /> },
    {
        path: 'auth',
        element: <UnauthLayout />,
        children: [
            { index: true, element: <Navigate to="login" replace /> },
            {
                path: 'login',
                element: (
                    <Suspense fallback={<Spinner />}>
                        <Login />
                    </Suspense>
                ),
            },
            {
                path: 'login/register',
                element: (
                    <Suspense fallback={<Spinner />}>
                        <Register />
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: 'home',
        element: <AuthLayout />,
        children: [
            { index: true, element: <Navigate to="dashboard" replace /> },
            {
                path: 'dashboard',
                element: (
                    <Suspense fallback={<Spinner />}>
                        <Dashboard />
                    </Suspense>
                ),
            },
            {
                path: 'client',
                element: (
                    <Suspense fallback={<Spinner />}>
                        <Client />
                    </Suspense>
                ),
            },
            {
                path: 'client/add',
                element: (
                    <Suspense fallback={<Spinner />}>
                        <Add />
                    </Suspense>
                ),
            },
            {
                path: 'client/edit',
                element: (
                    <Suspense fallback={<Spinner />}>
                        <Edit />
                    </Suspense>
                ),
            },
            {
                path: 'client/payment',
                element: (
                    <Suspense fallback={<Spinner />}>
                        <Payment />
                    </Suspense>
                ),
            },
            {
                path: 'diet-plans',
                element: (
                    <Suspense fallback={<Spinner />}>
                        <DietPlans />
                    </Suspense>
                ),
            },
            {
                path: 'diet-plan/day',
                element: (
                    <Suspense fallback={<Spinner />}>
                        <Days />
                    </Suspense>
                ),
            },
            {
                path: 'packages',
                element: (
                    <Suspense fallback={<Spinner />}>
                        <Packages />
                    </Suspense>
                ),
            },
            {
                path: 'packages/addPackages',
                element: (
                    <Suspense fallback={<Spinner />}>
                        <AddPackage />
                    </Suspense>
                ),
            },
            {
                path: 'banners',
                element: (
                    <Suspense fallback={<Spinner />}>
                        <Banners />
                    </Suspense>
                ),
            },
            {
                path: 'banners/addBanner',
                element: (
                    <Suspense fallback={<Spinner />}>
                        <AddBanner />
                    </Suspense>
                ),
            },
            {
                path: 'trainers',
                element: (
                    <Suspense fallback={<Spinner />}>
                        <Trainers />
                    </Suspense>
                ),
            },
            {
                path: 'trainers/addTrainer',
                element: (
                    <Suspense fallback={<Spinner />}>
                        <AddTrainer />
                    </Suspense>
                ),
            },
            {
                path: 'attendances',
                element: (
                    <Suspense fallback={<Spinner />}>
                        <Attendances />
                    </Suspense>
                ),
            },
            {
                path: 'vouchers',
                element: (
                    <Suspense fallback={<Spinner />}>
                        <Vouchers />
                    </Suspense>
                ),
            },
            {
                path: 'vouchers/addVoucher',
                element: (
                    <Suspense fallback={<Spinner />}>
                        <AddVoucher />
                    </Suspense>
                ),
            },
        ],
    },
];

export default appRoutes
