import { useState, useEffect } from 'react';
import { AppointmentForm } from './assets/pages/AppointmentForm';
import { AppointmentList } from './assets/pages/AppointmentsList';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './assets/firebase/config';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [appointments, setAppointments] = useState([]);
    const [currentAppointment, setCurrentAppointment] = useState(null);

   
    const getAppointments = async () => {
        const appointmentCollection = await getDocs(collection(db, 'appointments'));
        const data = appointmentCollection.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setAppointments(data);
    };

    useEffect(() => {
        getAppointments();
    }, []);

    const resetForm = () => {
        setCurrentAppointment(null);
    };

    return (
        <>
        
            <AppointmentForm 
                currentAppointment={currentAppointment} 
                getAppointments={getAppointments} 
                resetForm={resetForm} 
                />
                
            <AppointmentList 
                appointments={appointments} 
                setCurrentAppointment={setCurrentAppointment} 
                getAppointments={getAppointments} 
            />
        </>
    );
};

export default App;