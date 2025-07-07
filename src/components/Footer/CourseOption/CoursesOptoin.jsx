import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CoursesOptoin.css";

// Import all course images from CoursesImage folder
import csir from '../CourseOption/CoursesImage/1.jpeg';
import supremeCourt from '../CourseOption/CoursesImage/T2.png';
import aiims from '../CourseOption/CoursesImage/T3.png';
import cbse from '../CourseOption/CoursesImage/T4.png';
import nvs from '../CourseOption/CoursesImage/T4.png';
import ssc from '../CourseOption/CoursesImage/T4.0.png';
import chsl from '../CourseOption/CoursesImage/t5.png';
import dsssb from '../CourseOption/CoursesImage/t6.jpeg';
import delhiPolice from '../CourseOption/CoursesImage/t7.png';
import delhiHighCourt from '../CourseOption/CoursesImage/t8.webp';
import drdo from '../CourseOption/CoursesImage/t9.webp';
import epfo from '../CourseOption/CoursesImage/t10.webp';
import jnu from '../CourseOption/CoursesImage/t11.webp';
import bsf from '../CourseOption/CoursesImage/t12.webp';
import crpf from '../CourseOption/CoursesImage/t15.webp';
import delhiPoliceAwo from '../CourseOption/CoursesImage/t13.png';
import rrb from '../CourseOption/CoursesImage/t14.png';
import allahabad from '../CourseOption/CoursesImage/t16.png';
import upsssc from '../CourseOption/CoursesImage/t17.png';
import itbp from '../CourseOption/CoursesImage/t18.png';


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

const CoursesOptoin = () => {
  return (
    <section className="all-courses-section">
      <div className="container">
        <h2 className="all-courses-title">
          All <span className="highlight">Courses</span>
        </h2>
        <div className="row">
          {coursesData.map((course, idx) => (
            <div key={idx}>
              <div className="course-card">
                <img src={course.image} alt={course.name} className="course-img" />
                <div className="course-name">{course.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesOptoin;