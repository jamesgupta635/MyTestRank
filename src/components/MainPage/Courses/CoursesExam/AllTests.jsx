import React from 'react';
import './CoursesExam.css';
import t4_0 from '../CoursesImage/T4.0.png';
import t10 from '../CoursesImage/t10.webp';

const allTests = [
  {
    id: 'typing-speed-test',
    name: 'Typing Speed Test',
    image: t4_0,
    description: 'Test your typing speed and accuracy with real exam patterns.',
    tags: ['Speed', 'Accuracy', 'Practice'],
    duration: '15 min',
    isFree: true,
  },
  {
    id: 'english-typing-test',
    name: 'English Typing Test',
    image: t10,
    description: 'Practice English typing for government and competitive exams.',
    tags: ['English', 'Competitive', 'Skill Test'],
    duration: '10 min',
    isFree: false,
  },
  {
    id: 'hindi-typing-test',
    name: 'Hindi Typing Test',
    image: t4_0,
    description: 'Improve your Hindi typing skills for various exams.',
    tags: ['Hindi', 'Skill', 'Practice'],
    duration: '12 min',
    isFree: false,
  },
  {
    id: 'typing-speed-test',
    name: 'Typing Speed Test',
    image: t4_0,
    description: 'Test your typing speed and accuracy with real exam patterns.',
    tags: ['Speed', 'Accuracy', 'Practice'],
    duration: '15 min',
    isFree: true,
  },
  {
    id: 'english-typing-test',
    name: 'English Typing Test',
    image: t10,
    description: 'Practice English typing for government and competitive exams.',
    tags: ['English', 'Competitive', 'Skill Test'],
    duration: '10 min',
    isFree: false,
  },
  {
    id: 'hindi-typing-test',
    name: 'Hindi Typing Test',
    image: t4_0,
    description: 'Improve your Hindi typing skills for various exams.',
    tags: ['Hindi', 'Skill', 'Practice'],
    duration: '12 min',
    isFree: false,
  },  {
    id: 'typing-speed-test',
    name: 'Typing Speed Test',
    image: t4_0,
    description: 'Test your typing speed and accuracy with real exam patterns.',
    tags: ['Speed', 'Accuracy', 'Practice'],
    duration: '15 min',
    isFree: true,
  },
  {
    id: 'english-typing-test',
    name: 'English Typing Test',
    image: t10,
    description: 'Practice English typing for government and competitive exams.',
    tags: ['English', 'Competitive', 'Skill Test'],
    duration: '10 min',
    isFree: false,
  },
  {
    id: 'hindi-typing-test',
    name: 'Hindi Typing Test',
    image: t4_0,
    description: 'Improve your Hindi typing skills for various exams.',
    tags: ['Hindi', 'Skill', 'Practice'],
    duration: '12 min',
    isFree: false,
  }
];

export default function AllTests() {
  return (
    <div className="courses-exam-container">
      <h2 className="courses-exam-title text-center mb-4">All Tests</h2>
      <div className="related-courses-grid">
        {allTests.map((test) => (
          <div className="related-course-card" key={test.id}>
            <div className="related-course-card-header">
              <span className={`related-course-duration${test.isFree ? ' free' : ''}`}>{test.duration}</span>
            </div>
            <div className="related-course-card-body">
              <div className="related-course-info">
                <h5 className="related-course-title">{test.name}</h5>
                <p className="courses-exam-description">{test.description}</p>
                <div className="courses-exam-tags">
                  {test.tags.map((tag, i) => (
                    <span className="courses-exam-tag" key={i}>{tag}</span>
                  ))}
                </div>
              </div>
              <img src={test.image} alt={test.name} className="related-course-image" />
            </div>
            <button className={`related-course-buy-btn${test.isFree ? ' free' : ''}`} tabIndex={-1}>
              {test.isFree ? 'Start Free Test' : 'Start Test'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 