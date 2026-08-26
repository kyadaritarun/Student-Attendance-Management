import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import attendanceService from '../services/attendanceService';
import Navbar from '../components/Navbar';
import StudentProfile from '../components/StudentProfile';
import BatchList from '../components/BatchList';
import AttendanceSummary from '../components/AttendanceSummary';
import AttendanceList from '../components/AttendanceList';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';

export const DashboardPage = () => {
  const { user } = useAuth();
  const { batchId: urlBatchId } = useParams();
  const navigate = useNavigate();

  const [batches, setBatches] = useState([]);
  const [selectedBatchId, setSelectedBatchId] = useState(null);

  const [batchInfo, setBatchInfo] = useState(null);
  const [summary, setSummary] = useState(null);
  const [attendance, setAttendance] = useState([]);

  const [loadingBatches, setLoadingBatches] = useState(true);
  const [loadingAttendance, setLoadingAttendance] = useState(false);
  const [error, setError] = useState(null);

  const fetchBatches = useCallback(async () => {
    setLoadingBatches(true);
    setError(null);
    try {
      const data = await attendanceService.getStudentBatches();
      if (data.success) {
        setBatches(data.batches);
        if (data.batches.length > 0) {
          const parsedUrlId = urlBatchId ? parseInt(urlBatchId, 10) : null;
          const match = data.batches.find((b) => b.id === parsedUrlId);
          setSelectedBatchId(match ? match.id : data.batches[0].id);
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to load batches');
    } finally {
      setLoadingBatches(false);
    }
  }, [urlBatchId]);

  useEffect(() => {
    fetchBatches();
  }, [fetchBatches]);

  const fetchAttendance = useCallback(async (batchId) => {
    if (!batchId) return;
    setLoadingAttendance(true);
    setError(null);
    try {
      const [summaryRes, detailsRes] = await Promise.all([
        attendanceService.getAttendanceSummary(batchId),
        attendanceService.getAttendanceDetails(batchId),
      ]);
      if (summaryRes.success && detailsRes.success) {
        setBatchInfo(summaryRes.batch);
        setSummary(summaryRes.summary);
        setAttendance(detailsRes.attendance);
      }
    } catch (err) {
      setError(err.message || 'Failed to load attendance');
    } finally {
      setLoadingAttendance(false);
    }
  }, []);

  useEffect(() => {
    if (selectedBatchId) {
      fetchAttendance(selectedBatchId);
    }
  }, [selectedBatchId, fetchAttendance]);

  const handleSelectBatch = (batchId) => {
    setSelectedBatchId(batchId);
    navigate(`/batches/${batchId}`, { replace: true });
  };

  return (
    <div style={styles.page}>
      <Navbar />
      <main style={styles.main}>
        <StudentProfile student={user} />

        {loadingBatches ? (
          <LoadingState message="Loading your batches..." />
        ) : error && !batches.length ? (
          <ErrorState title="Connection Error" message={error} onRetry={fetchBatches} />
        ) : batches.length === 0 ? (
          <EmptyState title="No Batches" message="You are not enrolled in any batch." />
        ) : (
          <>
            <BatchList
              batches={batches}
              selectedBatchId={selectedBatchId}
              onSelectBatch={handleSelectBatch}
            />

            {loadingAttendance ? (
              <LoadingState message="Loading attendance..." />
            ) : error ? (
              <ErrorState
                title="Could not load attendance"
                message={error}
                onRetry={() => fetchAttendance(selectedBatchId)}
              />
            ) : (
              <>
                {batchInfo && summary && (
                  <AttendanceSummary batch={batchInfo} summary={summary} />
                )}
                <AttendanceList attendance={attendance} />
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f5f6fa',
  },
  main: {
    maxWidth: '960px',
    margin: '0 auto',
    padding: '20px 16px 40px',
  },
};

export default DashboardPage;
