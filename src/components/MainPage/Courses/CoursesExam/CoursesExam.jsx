import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CoursesExam.css';

// Static image imports (keep these for the 'allCourses' data)
import t4_0 from '../CoursesImage/T4.0.png';
import t10 from '../CoursesImage/t10.webp';

// IMPORTANT: Ensure these names/IDs match what you might use in Courses.jsx's coursesData
// for related courses to function correctly.
const allCourses = [
  {
    id: 'ssc-cgl-typing-test-course-series',
    name: 'SSC CGL Typing Test Course Series',
    image: t4_0, // This image is for the related course cards, not the main header.
    description: 'Typing test passage in this course are based on SSC CGL previous year tcs typing test pdf. Candidates who passed the SSC CGL exam in Session I need... A passage of approximately 2000 (two thousand) key depressions will be covered by the "Data Entry Speed Test" (DEST) Skill Test. Candidates must finish a 15-minute Data Entry Speed Test (DEST) in Session II. Unlimited Attempts of the tests are also available. Purchase TestMentor course to boost your speed and accuracy and clear the exam. Based on ssc cgl previous year typing test paragraph pdf',
    tags: [
      'best typing software', 'SSC', 'CGL', 'Typing', 'Speed Booster', 'Skill Test', 'Based on ssc cgl previous year typing test paragraph pdf'
    ],
    features: [
      '500+ Tests',
      'TCS User Interface',
      'Free Speed Booster Course',
      'Based on ssc cgl previous year typing test paragraph pdf'
    ],
    duration: '30 Days',
    price: 89,
    badges: ['View Full Details', 'Discount available'],
    isFree: false
  },
  {
    id: 'ssc-cgl-typing-test-series',
    name: 'SSC CGL Typing Test Series',
    image: t4_0,
    description: '500+ Tests, TCS User Interface, Free Speed Booster Course, Based on Previous Year',
    tags: ['SSC', 'CGL', 'Typing'],
    features: [
      '500+ Tests',
      'TCS User Interface',
      'Free Speed Booster Course',
      'Based on Previous Year'
    ],
    duration: '70 Days',
    price: 169,
    badges: ['View Full Details', 'Discount available'],
    isFree: false
  },
  {
    id: 'ssc-cgl-typing-tests-free',
    name: 'SSC CGL Typing Tests Free',
    image: t4_0,
    description: '5 FREE Tests, TCS User Interface, Free Speed Booster Course, Based on Previous Year',
    tags: ['SSC', 'CGL', 'Typing'],
    features: [
      '5 FREE Tests',
      'TCS User Interface',
      'Free Speed Booster Course',
      'Based on Previous Year'
    ],
    duration: 'FREE',
    price: 0,
    badges: ['View Full Details', 'Free For You'],
    isFree: true
  },
  {
    id: 'ssc-cgl-chsl-typing-tests',
    name: 'SSC CGL + CHSL Typing Tests',
    image: t4_0,
    description: '1000+ Tests, TCS User Interface, Based on Previous Year, Unlimited Attempts',
    tags: ['SSC', 'CGL', 'CHSL', 'Typing'],
    features: [
      '1000+ Tests',
      'TCS User Interface',
      'Based on Previous Year',
      'Unlimited Attempts'
    ],
    duration: '30 Days',
    price: 129,
    badges: ['View Full Details'],
    isFree: false
  },
  {
    id: 'ssc-cgl-vh-cat-typing-tests',
    name: 'SSC CGL VH. CAT. Typing Tests',
    image: t4_0,
    description: '180+ Tests, TCS User Interface, Free Speed Booster Course',
    tags: ['SSC', 'CGL', 'VH', 'Typing'],
    features: [
      '180+ Tests',
      'TCS User Interface',
      'Free Speed Booster Course'
    ],
    duration: '30 Days',
    price: 109,
    badges: ['View Full Details'],
    isFree: false
  },
  {
    id: 'all-exam-typing-course',
    name: 'All Exam Typing (CGL, CHSL, DP HCM, EPFO, JNU, BSF, CRPF)',
    image: t10,
    description: '2000+ tests, Real User Interface, Free Speed Booster Course',
    tags: ['CGL', 'CHSL', 'DP', 'EPFO', 'JNU', 'BSF', 'CRPF', 'Typing'],
    features: [
      '2000+ tests',
      'Real User Interface',
      'Free Speed Booster Course'
    ],
    duration: '30 Days',
    price: 149,
    badges: ['View Full Details'],
    isFree: false
  },
  // Add other detailed courses here if they are intended for the related section
  // and have different names than the primary SSC CGL ones.
  // For example, if "NVS Junior Secretariat Assistant Typing Test" should be a related course
  // and has detailed data:
  /*
  {
    id: 'nvs-junior-secretariat-assistant-details',
    name: 'NVS Junior Secretariat Assistant Typing Test',
    image: someNVSImage, // Make sure to import this image
    description: 'Detailed description for NVS typing test...',
    tags: ['NVS', 'Typing'],
    features: ['Specific NVS features'],
    duration: '45 Days',
    price: 99,
    badges: ['New Course'],
    isFree: false
  },
  */
];

export default function CoursesExam() {
  const location = useLocation();
  const navigate = useNavigate();

  // State for the header display (from Courses.jsx state)
  const [headerCourseName, setHeaderCourseName] = useState('');
  const [headerCourseImage, setHeaderCourseImage] = useState('');

  // State for the related courses (found from allCourses based on headerCourseName)
  const [relatedCourses, setRelatedCourses] = useState([]);

  useEffect(() => {
    // Get data directly from location.state for the header
    const nameFromState = location.state?.courseName;
    const imageFromState = location.state?.courseImage;

    // Set header data immediately
    setHeaderCourseName(nameFromState || 'Course Not Found');
    setHeaderCourseImage(imageFromState || t4_0); // Fallback image if none passed

    // Find the current course in allCourses for the purpose of filtering related courses
    // This lookup is for finding a "master" course entry if available, to exclude it from related.
    const currentCourseDetails = allCourses.find(c => c.name === nameFromState);

    // Filter related courses
    let filteredRelated;
    if (currentCourseDetails) {
      // If we found details, exclude this exact course from related list
      filteredRelated = allCourses.filter(c => c.id !== currentCourseDetails.id);
    } else {
      // If we didn't find detailed info for the header course,
      // just get related courses without excluding any specific ID.
      // Or, you could have a generic ID to exclude if you always fallback to a specific generic course.
      filteredRelated = allCourses;
    }

    const shuffledRelated = filteredRelated.sort(() => 0.5 - Math.random()).slice(0, 5);
    setRelatedCourses(shuffledRelated);

  }, [location.state?.courseName, location.state?.courseImage, navigate]); // Depend on state changes

  return (
    <div className="courses-exam-container">
      <button className="back-btn" onClick={() => navigate(-1)}>&larr; Go Back</button>

      {/* Main card on top using only the name and image from the passed state */}
      <div className="courses-exam-header">
        <img src={headerCourseImage} alt={headerCourseName} className="courses-exam-image" />
        <div className="courses-exam-header-content">
          <h2 className="courses-exam-title">{headerCourseName}</h2>
          {/* Removed description, tags, features etc. from here as per requirement */}
          {/* Removed description, tags, features etc. from here as per requirement */}
         
          <h2 className="courses-exam-title">{relatedCourses[0]?.name}</h2>
          <p className="courses-exam-description">{relatedCourses[0]?.description}</p>
          <div className="courses-exam-tags">
            {relatedCourses[0]?.tags?.map((tag, i) => <span className="courses-exam-tag" key={i}>{tag}</span>)}
          </div>
          
          {/* If you want a description here, it would have to come from location.state as well */}
        </div>
      </div>

      {/* Related Courses section - still uses data from allCourses array */}
      <h4 className="related-courses-title">Related Courses</h4>
      <div className="related-courses-grid">
        {relatedCourses.map((rc, i) => (
          <div
            className="related-course-card"
            key={i}
            // When clicking a related course, navigate again, passing its name and image
            onClick={() => navigate('/payment', { state: { courseName: rc.name, courseImage: rc.image } })}
            tabIndex={0}
            role="button"
            aria-label={`View details for ${rc.name}`}
          >
            <div className="related-course-card-header">
              <span className={`related-course-duration${rc.isFree ? ' free' : ''}`}>{rc.duration}</span>
            </div>
            <div className="related-course-card-body">
              <div className="related-course-info">
                <h5 className="related-course-title">{rc.name}</h5>
                <ul className="related-course-features">
                  {rc.features?.map((f, j) => <li key={j}>{f}</li>)}
                </ul>
                <div className="related-course-badges">
                  {rc.badges?.map((b, j) => <span className={`related-course-badge${b === 'Free For You' ? ' free' : ''}`} key={j}>{b}</span>)}
                </div>
              </div>
              <img src={rc.image} alt={rc.name} className="related-course-image" />
            </div>
            <button className={`related-course-buy-btn${rc.isFree ? ' free' : ''}`} tabIndex={-1}>
              {rc.isFree ? 'BUY @ ₹0 (FREE)' : `BUY @ ₹${rc.price}`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}