import api from './api';

export const authService = {
  /**
   * Login student with student_id and password
   */
  async login(studentId, password) {
    try {
      const response = await api.post('/student/login', {
        student_id: studentId,
        password: password,
      });
      if (response.data.success) {
        const { token, student } = response.data;
        localStorage.setItem('student_attendance_token', token);
        localStorage.setItem('student_attendance_user', JSON.stringify(student));
        return { success: true, token, student };
      }
      return { success: false, message: response.data.message || 'Login failed' };
    } catch (error) {
      const msg = error.response?.data?.message || 'Server error. Please check your credentials or backend server.';
      return { success: false, message: msg };
    }
  },

  /**
   * Logout current student
   */
  logout() {
    localStorage.removeItem('student_attendance_token');
    localStorage.removeItem('student_attendance_user');
  },

  /**
   * Get current saved user
   */
  getCurrentUser() {
    const userStr = localStorage.getItem('student_attendance_user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  /**
   * Check if token exists
   */
  isAuthenticated() {
    return !!localStorage.getItem('student_attendance_token');
  }
};

export default authService;
