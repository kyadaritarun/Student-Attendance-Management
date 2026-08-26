import api from './api';

export const attendanceService = {
  /**
   * Fetch enrolled batches for logged in student
   */
  async getStudentBatches() {
    try {
      const response = await api.get('/student/batches');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch enrolled batches');
    }
  },

  /**
   * Fetch summary attendance metrics for a selected batch
   */
  async getAttendanceSummary(batchId) {
    try {
      const response = await api.get(`/student/batches/${batchId}/attendance/summary`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch attendance summary');
    }
  },

  /**
   * Fetch session-by-session attendance records for a selected batch
   */
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
