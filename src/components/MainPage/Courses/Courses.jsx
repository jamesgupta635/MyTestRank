import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Courses.css"; // Import CSS for styling
import imgageone from '../../../assets/B2.png';
import imgagetwo from '../../../assets/B1.png';
import imgagethree from '../../../assets/B3.png';

const subjectsData = [
  { name: "Web Development", image: imgageone },
  { name: "Graphic Design", image: imgagetwo },
  { name: "Data Science", image: imgagethree },
  { name: "Marketing", image: imgageone },
  { name: "Cyber Security", image: imgagetwo, hidden: true },
  { name: "AI & ML", image: imgagethree, hidden: true },
  { name: "Photography", image: imgageone, hidden: true },
  { name: "Finance", image: imgageone, hidden: true },
];

const Courses = (prop) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <section className="explore-subjects">
      <div className="container">
        <h2 className="section-title">{prop.Topic}</h2>
        
        <div className="row justify-content-center">
          {subjectsData.map((subject, index) => (
            <div
              key={index}
              className={`col-md-3 col-sm-6 subject-col ${
                subject.hidden && !showMore ? "d-none" : "fade-in"
              }`}
            >
              <div className="subject-card">
                <img
                  src={subject.image}
                  alt={subject.name}
                  className="subject-image"
                />
                <h5 className="subject-title">{subject.name}</h5>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <button
            className="btn btn-primary view-more-btn"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "View Less" : "View More Subjects"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Courses;
