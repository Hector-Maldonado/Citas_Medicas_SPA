import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useState } from 'react';

export const AppointmentList = ({ appointments, setCurrentAppointment, getAppointments }) => {

    const [alert, setAlert] = useState({ show: false, message: '', type: '' });

    const showAlert = (message, type) => {
        setAlert({ show: true, message, type });
        setTimeout(() => {
            setAlert({ show: false, message: '', type: '' }); // Ocultar la alerta después de 3 segundos
        }, 3000);
    };


    //Eliminar datos 
    const deleteAppointment = async (id) => {
        const docRef = doc(db, 'appointments', id);
        await deleteDoc(docRef);
        showAlert('Cita eliminada exitosamente!', 'danger');
        getAppointments();
    };

    return (

        <div className="card text-center">
            {alert.show && (
                <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                    {alert.message}
                    <button type="button" className="btn-close" onClick={() => setAlert({ ...alert, show: false })} aria-label="Close"></button>
                </div>
            )}

            <div className="card-header">
                <h2 >Citas Médicas</h2>
            </div>
            <div className="card-body">
                {appointments.length > 0 ? (
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Nombre del Paciente</th>
                                <th>Edad</th>
                                <th>Peso</th>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appointment) => (
                                <tr key={appointment.id}>
                                    <td>{appointment.name}</td>
                                    <td>{appointment.age}</td>
                                    <td>{appointment.weight} Lbs</td>
                                    <td>{appointment.date}</td>
                                    <td>{appointment.time}</td>
                                    <td>
                                        <button className="btn btn-warning m-2" onClick={() => setCurrentAppointment(appointment)}>Editar</button>
                                        <button className="btn btn-danger m-2" onClick={() => deleteAppointment(appointment.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No hay citas disponibles</p>
                )}
            </div>
        </div>
    );
};