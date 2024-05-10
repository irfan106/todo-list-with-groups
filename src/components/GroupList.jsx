import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addGroup, deleteGroup, updateUpperLimit } from '../actions/groupsActions';
import StatusList from './StatusList';
import './groupList.css';

const GroupList = () => {
  const groups = useSelector((state) => state.groups);
  const dispatch = useDispatch();
  const [timeoutId, setTimeoutId] = useState(null);
  const [showStatus, setShowStatus] = useState(false);
  const [allValidationsPassed, setAllValidationsPassed] = useState(false);

  const handleAddGroup = () => {
    const lastGroup = groups[groups.length - 1];
    const newUpperLimit = 10;

    if (lastGroup && lastGroup.to >= 10) {
      alert('You have reached the maximum limit.');
      return;
    }

    dispatch(addGroup(newUpperLimit));
  };

  const handleDeleteGroup = (index) => {
    dispatch(deleteGroup(index));
  };

  const handleUpperLimitChange = (index, newUpperLimit) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    dispatch(updateUpperLimit(index, parseInt(newUpperLimit, 10)));

    const newTimeoutId = setTimeout(() => {
      validateUpperLimit(index, newUpperLimit);
    }, 1000);

    setTimeoutId(newTimeoutId);
    setShowStatus(false);
  };

  const validateUpperLimit = (index, newUpperLimit) => {
    const lowerLimit = groups[index].from;
    if (newUpperLimit === '' || isNaN(newUpperLimit) || newUpperLimit < lowerLimit || newUpperLimit > 10) {
      alert('Upper limit must be a number greater than lower limit and less than or equal to 10');
      setAllValidationsPassed(false);
      return;
    }

    setAllValidationsPassed(true);
    dispatch(updateUpperLimit(index, parseInt(newUpperLimit, 10)));
  };

  const handleShowStatus = () => {
    setShowStatus(true);
  };

  return (
    <div className="group-list-container">
      <h2 className="group-list-header">Group List</h2>
        {groups.map((group, index) => (
          <div key={index} className="group-item">
            Group {index + 1}: {group.from} -{' '}
            <input
              type="number"
              value={group.to === null ? '' : group.to}
              onChange={(e) => handleUpperLimitChange(index, e.target.value)}
              disabled={index !== groups.length - 1}
            />
            <button onClick={() => handleDeleteGroup(index)} disabled={index !== groups.length - 1}>
              Delete
            </button>
          </div>
        ))}
      <button className="status-button" onClick={handleAddGroup}>Add Group</button>
      <button className="status-button" onClick={handleShowStatus} disabled={!allValidationsPassed || groups.length === 0 || groups[groups.length - 1].to !== 10}>
        Show Status
      </button>
      {showStatus && <div className="status-list-container"><StatusList /></div>}
    </div>
  );
};

export default GroupList;
