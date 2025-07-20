import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Courses.css"; // This will now contain the updated CSS

// Images
import csir from '../Courses/CoursesImage/1.jpeg';
import supremeCourt from '../Courses/CoursesImage/T2.png';
import aiims from '../Courses/CoursesImage/T3.png';
import cbse from '../Courses/CoursesImage/T4.png';
import nvs from '../Courses/CoursesImage/T4.png';
import ssc from '../Courses/CoursesImage/T4.0.png';
import chsl from '../Courses/CoursesImage/t5.png';
import dsssb from '../Courses/CoursesImage/t6.jpeg';
import delhiPolice from '../Courses/CoursesImage/t7.png';
import delhiHighCourt from '../Courses/CoursesImage/t8.webp';
import drdo from '../Courses/CoursesImage/t9.webp';
import epfo from '../Courses/CoursesImage/t10.webp';
import jnu from '../Courses/CoursesImage/t11.webp';
import bsf from '../Courses/CoursesImage/t12.webp';
import crpf from '../Courses/CoursesImage/t15.webp';
import delhiPoliceAwo from '../Courses/CoursesImage/t13.png';
import rrb from '../Courses/CoursesImage/t14.png';
import allahabad from '../Courses/CoursesImage/t16.png';
import upsssc from '../Courses/CoursesImage/t17.png';
import itbp from '../Courses/CoursesImage/t18.png';

const coursesData = [
  { name: "CSIR JSA English & Hindi Typing test", image: csir },
  { name: "Supreme Court Junior Court Assistant (JCA) Typing test", image: supremeCourt },
  { name: "AIIMS CRE English Typing Skill Test", image: aiims },
  { name: "CBSE Jr. Assistant and Superintendent English Typing Skill Test", image: cbse },
  { name: "NVS Junior Secretariat Assistant Typing Test", image: nvs },
  { name: "SSC CGL Typing Course", image: ssc },
  { name: "SSC CHSL 2024 Dest Typing skill test (250+ test)", image: chsl },
  { name: "DSSSB JJA / SPA / PA English Typing Tests", image: dsssb },
  { name: "Delhi Police Typing Course", image: delhiPolice },
  { name: "Delhi High Court PA SPA Typing Test", image: delhiHighCourt },
  { name: "DRDO Assistant Typing Course", image: drdo },
  { name: "EPFO Typing Test Course", image: epfo },
  { name: "JNU Assistant Typing Course", image: jnu },
  { name: "BSF Head Constable Typing Tests", image: bsf },
  { name: "Download 250 CRPF HCM typing paragraph pdf", image: crpf },
  { name: "Delhi Police AWO TPO Typing Test Course", image: delhiPoliceAwo },
  { name: "Typing test for RRB NTPC / GDCE govt exam", image: rrb },
  { name: "HC ALLAHABAD RO / ARO Typing Test Series", image: allahabad },
  { name: "ALLAHABAD HC JA & Paid Apprentices & Steno Typing Tests", image: allahabad },
  { name: "UPSSSC Junior Assistant Typing Skill Test", image: upsssc },
  { name: "ITBP HCM English Typing Tests", image: itbp }
];

const Courses = () => {
  const navigate = useNavigate();

  // Pass both the name AND the image URL
  const handleCourseClick = (courseItem) => {
    navigate('/coursesExam', {
      state: {
        courseName: courseItem.name,
        courseImage: courseItem.image // Pass the image URL
      }
    });
  };

  return (
    <section id="all-courses-section" className="course-grid-section py-5">
      <div className="container-fluid">
        <h2 className="course-grid-title text-center mb-4">
          All <span className="course-grid-highlight">Courses</span>
        </h2>
        <div className="row course-grid-row justify-content-center">
          {coursesData.map((course, idx) => (
            <div
              className="course-grid-card mb-4"
              key={idx}
              style={{ cursor: "pointer" }}
              onClick={() => handleCourseClick(course)}
            >
              <img
                src={course.image}
                alt={course.name}
                className="course-grid-img img-fluid mb-2"
              />
              <div className="course-grid-name">{course.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;