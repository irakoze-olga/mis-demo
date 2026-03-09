import React from 'react';
import '../../styles/components.css';

const ActivityFeed = () => {
  const activities = [
    { user: 'Alex Johnson', action: 'created project', target: 'Phoenix', time: '10m ago', color: 'indigo' },
    { user: 'Maria Garcia', action: 'updated permissions', target: '3 users', color: 'purple' },
    { user: 'David Lee', action: 'uploaded report', target: 'Q3-2024.pdf', color: 'blue' },
    { user: 'Sarah Chen', action: 'commented on', target: 'Task #45', color: 'pink' },
  ];

  return (
    <div className="activity-feed card flex-col gap-md">
      <div className="flex justify-between items-center">
        <h3 className="card-title">Live Activity</h3>
        <span className="badge badge-primary">Recent</span>
      </div>

      <div className="activity-list flex-col gap-md">
        {activities.map((item, i) => (
          <div key={i} className="activity-item flex gap-md">
            <div className={`activity-line ${i === activities.length - 1 ? 'last' : ''}`}>
              <div className={`dot-pulse ${item.color}`}></div>
            </div>
            <div className="activity-info flex-col">
              <p className="text-sm">
                <span className="font-bold">{item.user}</span> {item.action}
                <span className="text-primary font-bold"> {item.target}</span>
              </p>
              <span className="text-muted" style={{ fontSize: '0.7rem' }}>{item.time || 'A moment ago'}</span>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .activity-line {
          position: relative;
          width: 2px;
          background: var(--border-color);
          margin-left: 8px;
        }
        .activity-line.last { background: transparent; }
        .dot-pulse {
          position: absolute;
          top: 0;
          left: -4px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--primary);
          border: 2px solid var(--bg-card);
          z-index: 2;
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
        }
        
        .activity-info { padding-bottom: 4px; }
      `}</style>
    </div>
  );
};

export default ActivityFeed;