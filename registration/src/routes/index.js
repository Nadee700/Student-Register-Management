import StudentDashboard from '../pages/Dashboard'
import Form from '../pages/Form'



export const routeList = [
    {
        path: "/",
        component: StudentDashboard,
        exact: true,
    },
    {
        path: "/register",
        component: Form,
        exact: true,
    },
   
];