import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import { db } from '../firebase/config';
import { useEffect, useState } from 'react';

export const AppointmentForm = ({ currentAppointment, getAppointments, resetForm }) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [alert, setAlert] = useState({ show: false, message: '', type: '' })


  useEffect(() => {
    if (currentAppointment) {
      setValue('name', currentAppointment.name);
      setValue('age', currentAppointment.age);
      setValue('weight', currentAppointment.weight);
      setValue('date', currentAppointment.date);
      setValue('time', currentAppointment.time);
    } else {
      resetForm();
      reset();
    }
  }, [currentAppointment, setValue, resetForm, reset]);

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ show: false, message: '', type: '' }); // Ocultar la alerta después de 3 segundos
    }, 3000);
  };

  // Agregar una cita
  const addAppointment = async (data) => {
    try {
      await addDoc(collection(db, 'appointments'), data);
      showAlert('Cita agregada exitosamente!', 'success');
      getAppointments(); // actualizar citas en la tabla
      reset();  // borrar datos de el formulario
    } catch (error) {
      console.error("Error agregando cita:", error);
    }
  };

  // Editar una cita
  const updateAppointment = async (data) => {
    try {
      const docRef = doc(db, 'appointments', currentAppointment.id); // Usamos el editId para buscar el documento
      await updateDoc(docRef, data);
      showAlert('Cita editada exitosamente!', 'warning');
      getAppointments(); // actualizar citas en la tabla
      reset(); // borrar datos de el formulario
      resetForm(); // Resetear el estado de edicion
    } catch (error) {
      console.error("Error actualizando cita:", error);
    }
  };

  return (
    <div className="container align-items-center mt-4">
      {alert.show && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          {alert.message}
          <button type="button" className="btn-close" onClick={() => setAlert({ ...alert, show: false })} aria-label="Close"></button>
        </div>
      )}
      <form onSubmit={currentAppointment ? handleSubmit(updateAppointment) : handleSubmit(addAppointment)} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Nombre del Paciente</label>
          <input type="text" className="form-control w-50" {...register('name')} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Edad</label>
          <input type="number" className="form-control w-50" {...register('age')} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Peso (Lbs)</label>
          <input type="number" className="form-control w-50 " {...register('weight')} step="0.1" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha de la Cita</label>
          <input type="date" className="form-control w-50" {...register('date')} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Hora de la Cita</label>
          <input type="time" className="form-control w-50" {...register('time')} required />
        </div>
        <button type="submit" className="btn btn-primary w-10">
          {currentAppointment ? 'Editar Cita' : 'Agregar Cita'}
        </button>
      </form>
    </div>
  );
};