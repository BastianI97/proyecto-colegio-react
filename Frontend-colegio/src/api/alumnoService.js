import axiosClient from './axiosClient'

export const obtenerResumenAlumno = async (alumnoId) => {
  const response = await axiosClient.get(`/api/bff/alumnos/${alumnoId}/resumen`)
  return response.data
}

export const obtenerNotasAlumno = async (alumnoId) => {
  const response = await axiosClient.get(`/api/bff/alumnos/${alumnoId}/notas`)
  return response.data
}

export const obtenerPromedioAlumno = async (alumnoId) => {
  const response = await axiosClient.get(`/api/bff/alumnos/${alumnoId}/promedio`)
  return response.data
}

export const obtenerResumenAsistencia = async (alumnoId) => {
  const response = await axiosClient.get(`/api/bff/alumnos/${alumnoId}/resumen-asistencia`)
  return response.data
}
