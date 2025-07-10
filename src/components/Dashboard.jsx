import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [studyStreak, setStudyStreak] = useState(7);
  const [totalStudyTime, setTotalStudyTime] = useState(1240);
  const [completedSessions, setCompletedSessions] = useState(23);
  const [currentGoal, setCurrentGoal] = useState(120);
  const [weeklyGoal, setWeeklyGoal] = useState(600);
  const [weeklyProgress, setWeeklyProgress] = useState(420);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const progressPercentage = Math.min((totalStudyTime / currentGoal) * 100, 100);
  const weeklyProgressPercentage = Math.min((weeklyProgress / weeklyGoal) * 100, 100);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        
        .dashboard-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          font-family: 'Press Start 2P', cursive, monospace;
          color: #ecf0f1;
          padding: 20px;
          image-rendering: pixelated;
          image-rendering: -moz-crisp-edges;
          image-rendering: crisp-edges;
        }

        .dashboard-header {
          text-align: center;
          margin-bottom: 30px;
          padding: 20px;
          background: linear-gradient(145deg, #34495e 0%, #2c3e50 100%);
          border: 4px solid #95a5a6;
          border-radius: 0;
          box-shadow: 
            0 4px 0 #7f8c8d,
            0 8px 0 #6c7b7d;
        }

        .dashboard-title {
          font-size: 24px;
          font-weight: bold;
          color: #f39c12;
          text-transform: uppercase;
          letter-spacing: 2px;
          text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.3);
          margin-bottom: 8px;
        }

        .dashboard-subtitle {
          font-size: 12px;
          color: #bdc3c7;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .main-stats-section {
          max-width: 1400px;
          margin: 0 auto 30px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .stat-card {
          background: linear-gradient(145deg, #34495e 0%, #2c3e50 100%);
          border: 4px solid #95a5a6;
          border-radius: 0;
          padding: 20px;
          text-align: center;
          box-shadow: 
            0 4px 0 #7f8c8d,
            0 8px 0 #6c7b7d,
            0 12px 20px rgba(0, 0, 0, 0.4);
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 
            0 8px 0 #7f8c8d,
            0 16px 0 #6c7b7d,
            0 20px 30px rgba(0, 0, 0, 0.5);
        }

        .stat-icon {
          font-size: 32px;
          margin-bottom: 12px;
          filter: drop-shadow(2px 2px 0 rgba(0, 0, 0, 0.3));
        }

        .stat-value {
          font-size: 24px;
          font-weight: bold;
          color: #e74c3c;
          text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.3);
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 10px;
          color: #bdc3c7;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .dashboard-content {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 30px;
        }

        .left-column {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .right-column {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .dashboard-card {
          background: linear-gradient(145deg, #34495e 0%, #2c3e50 100%);
          border: 4px solid #95a5a6;
          border-radius: 0;
          padding: 20px;
          box-shadow: 
            0 4px 0 #7f8c8d,
            0 8px 0 #6c7b7d,
            0 12px 20px rgba(0, 0, 0, 0.4);
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .dashboard-card:hover {
          transform: translateY(-4px);
          box-shadow: 
            0 8px 0 #7f8c8d,
            0 16px 0 #6c7b7d,
            0 20px 30px rgba(0, 0, 0, 0.5);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 3px solid #95a5a6;
        }

        .card-icon {
          font-size: 24px;
          filter: drop-shadow(2px 2px 0 rgba(0, 0, 0, 0.3));
        }

        .card-title {
          font-size: 14px;
          font-weight: bold;
          color: #f39c12;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.3);
        }

        .progress-bar {
          width: 100%;
          height: 20px;
          background: #2c3e50;
          border: 3px solid #7f8c8d;
          border-radius: 0;
          overflow: hidden;
          position: relative;
          margin: 16px 0;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #e74c3c 0%, #c0392b 100%);
          transition: width 0.5s ease;
          position: relative;
        }

        .progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%);
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .progress-text {
          font-size: 10px;
          color: #ecf0f1;
          text-align: center;
          margin-top: 8px;
        }

        .clock-display {
          font-size: 28px;
          font-weight: bold;
          color: #f39c12;
          text-align: center;
          margin: 16px 0;
          text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.3);
          font-family: 'Courier New', monospace;
        }

        .streak-display {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin: 16px 0;
        }

        .streak-icon {
          font-size: 24px;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .achievement-list {
          list-style: none;
          padding: 0;
          margin: 16px 0;
        }

        .achievement-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          margin-bottom: 8px;
          background: linear-gradient(145deg, #27ae60 0%, #229954 100%);
          border: 2px solid #2ecc71;
          border-radius: 0;
          font-size: 10px;
        }

        .achievement-icon {
          font-size: 16px;
        }

        .quick-actions {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          margin-top: 16px;
        }

        .action-btn {
          padding: 12px 16px;
          border: 3px solid #95a5a6;
          border-radius: 0;
          background: linear-gradient(145deg, #3498db 0%, #2980b9 100%);
          color: white;
          font-family: inherit;
          font-size: 10px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 
            3px 3px 0 #7f8c8d,
            6px 6px 0 #6c7b7d;
        }

        .action-btn:hover {
          transform: translate(-2px, -2px);
          box-shadow: 
            5px 5px 0 #7f8c8d,
            8px 8px 0 #6c7b7d;
        }

        .action-btn:active {
          transform: translate(2px, 2px);
          box-shadow: 
            1px 1px 0 #7f8c8d,
            2px 2px 0 #6c7b7d;
        }

        .recent-activity {
          list-style: none;
          padding: 0;
          margin: 16px 0;
        }

        .activity-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 12px;
          margin-bottom: 8px;
          background: linear-gradient(145deg, #34495e 0%, #2c3e50 100%);
          border: 2px solid #7f8c8d;
          border-radius: 0;
          font-size: 10px;
        }

        .activity-icon {
          font-size: 14px;
        }

        .activity-time {
          color: #bdc3c7;
          font-size: 8px;
        }

        .pixel-border {
          position: relative;
        }

        .pixel-border::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #e74c3c, #f39c12, #f1c40f, #2ecc71, #3498db, #9b59b6);
          background-size: 400% 400%;
          animation: borderGlow 3s ease-in-out infinite;
          z-index: -1;
        }

        @keyframes borderGlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @media (max-width: 1200px) {
          .main-stats-section {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .dashboard-content {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .main-stats-section {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          
          .dashboard-card {
            padding: 16px;
          }
          
          .card-title {
            font-size: 12px;
          }
          
          .stat-value {
            font-size: 20px;
          }
          
          .clock-display {
            font-size: 24px;
          }
          
          .dashboard-title {
            font-size: 20px;
          }
        }
      `}</style>

      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">DeepTerm Dashboard</h1>
          <p className="dashboard-subtitle">Your Learning Command Center</p>
        </div>

        {/* Main Stats Section */}
        <div className="main-stats-section">
          <div className="stat-card">
            <div className="stat-icon">⏰</div>
            <div className="stat-value">{formatTime(totalStudyTime)}</div>
            <div className="stat-label">Total Study Time</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">🔥</div>
            <div className="stat-value">{studyStreak}</div>
            <div className="stat-label">Day Streak</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-value">{completedSessions}</div>
            <div className="stat-label">Sessions</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-value">{Math.round(progressPercentage)}%</div>
            <div className="stat-label">Goal Progress</div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          <div className="left-column">
            {/* Weekly Progress */}
            <div className="dashboard-card">
              <div className="card-header">
                <span className="card-icon">📈</span>
                <h2 className="card-title">Weekly Progress</h2>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${weeklyProgressPercentage}%` }}
                ></div>
              </div>
              <div className="progress-text">
                {formatTime(weeklyProgress)} / {formatTime(weeklyGoal)} ({Math.round(weeklyProgressPercentage)}%)
              </div>
            </div>

            {/* Study Session */}
            <div className="dashboard-card">
              <div className="card-header">
                <span className="card-icon">🍅</span>
                <h2 className="card-title">Current Session</h2>
              </div>
              <div className="clock-display">
                {currentTime.toLocaleTimeString()}
              </div>
              <div className="quick-actions">
                <button className="action-btn">Start Pomodoro</button>
                <button className="action-btn">Take Break</button>
                <button className="action-btn">End Session</button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="dashboard-card">
              <div className="card-header">
                <span className="card-icon">📝</span>
                <h2 className="card-title">Recent Activity</h2>
              </div>
              <ul className="recent-activity">
                <li className="activity-item">
                  <span className="activity-icon">🍅</span>
                  <span>Completed Pomodoro Session</span>
                  <span className="activity-time">2 min ago</span>
                </li>
                <li className="activity-item">
                  <span className="activity-icon">📚</span>
                  <span>Created 5 flashcards</span>
                  <span className="activity-time">15 min ago</span>
                </li>
                <li className="activity-item">
                  <span className="activity-icon">🎯</span>
                  <span>Reached daily goal</span>
                  <span className="activity-time">1 hour ago</span>
                </li>
                <li className="activity-item">
                  <span className="activity-icon">🏆</span>
                  <span>Earned "Streak Master" badge</span>
                  <span className="activity-time">2 hours ago</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="right-column">
            {/* Study Streak */}
            <div className="dashboard-card pixel-border">
              <div className="card-header">
                <span className="card-icon">🔥</span>
                <h2 className="card-title">Study Streak</h2>
              </div>
              <div className="streak-display">
                <span className="streak-icon">🔥</span>
                <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#e74c3c' }}>
                  {studyStreak} Days
                </span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${Math.min((studyStreak / 30) * 100, 100)}%` }}
                ></div>
              </div>
              <div className="progress-text">
                {studyStreak}/30 Days Goal
              </div>
            </div>

            {/* Achievements */}
            <div className="dashboard-card">
              <div className="card-header">
                <span className="card-icon">🏆</span>
                <h2 className="card-title">Achievements</h2>
              </div>
              <ul className="achievement-list">
                <li className="achievement-item">
                  <span className="achievement-icon">🔥</span>
                  <span>7-Day Streak Master</span>
                </li>
                <li className="achievement-item">
                  <span className="achievement-icon">⏱️</span>
                  <span>20+ Hour Learner</span>
                </li>
                <li className="achievement-item">
                  <span className="achievement-icon">🎯</span>
                  <span>Goal Crusher</span>
                </li>
                <li className="achievement-item">
                  <span className="achievement-icon">📚</span>
                  <span>Flashcard Pro</span>
                </li>
              </ul>
            </div>

            {/* Quick Actions */}
            <div className="dashboard-card">
              <div className="card-header">
                <span className="card-icon">⚡</span>
                <h2 className="card-title">Quick Actions</h2>
              </div>
              <div className="quick-actions">
                <button className="action-btn">Start Review</button>
                <button className="action-btn">Create Flashcards</button>
                <button className="action-btn">Study Center</button>
                <button className="action-btn">View Progress</button>
                <button className="action-btn">Settings</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
