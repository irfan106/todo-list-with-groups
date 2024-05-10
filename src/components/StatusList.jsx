import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStatus } from '../actions/statusActions';
import './statusList.css';

const StatusList = () => {
  const groups = useSelector((state) => state.groups);
  const status = useSelector((state) => state.status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStatus());
  }, [dispatch]);

  const getStatusForGroup = (group) => {
    if (!status.data || status.loading || status.error) return [];

    return status.data.filter(item => item.id >= group.from && item.id <= group.to);
  };

  const getStatusColor = (completed) => {
    return completed ? 'green' : 'red';
  };

  return (
    <div>
      <h2>Status List</h2>
      {groups.map((group, index) => (
        <div key={index} className="group-container">
          <h3>Group {index + 1}: {group.from} - {group.to}</h3>
          <table className="status-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {getStatusForGroup(group).map(item => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td style={{ color: getStatusColor(item.completed) }}>
                    {item.completed ? 'Done' : 'Not Done'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default StatusList;
