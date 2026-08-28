import api from './api';

export const attendanceService = {

  async getStudentBatches() {
    try {
      const response = await api.get('/student/batches');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch enrolled batches');
    }
  },

  async getAttendanceSummary(batchId) {
    try {
      const response = await api.get(`/student/batches/${batchId}/attendance/summary`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch attendance summary');
    }
  },


  async getAttendanceDetails(batchId) {
    try {
      const response = await api.get(`/student/batches/${batchId}/attendance`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch attendance details');
    }
  }
};

export default attendanceService;
