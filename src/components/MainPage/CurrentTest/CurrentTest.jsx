import React from "react";
import "./CurrentTest.css";
import imgagetwo from '../../../assets/B1.png';

const plans = [
  {
    title: "Test01",
    courses: "10 Courses",
    price: "$15.00",
    features: [
      "Access to Free Courses",
      "Community Support",
      "1 Certificate",
      "Limited Resources",
    ],
    image: "basic-plan.jpg",
  },
  {
    title: "Test02",
    courses: "20 Courses",
    price: "$30.00",
    features: [
      "Access to All Courses",
      "Priority Support",
      "3 Certificates",
      "Downloadable Resources",
    ],
    image: "standard-plan.jpg",
  },
  {
    title: "Test03",
    courses: "Unlimited Courses",
    price: "$50.00",
    features: [
      "All Access Pass",
      "1-on-1 Mentorship",
      "Unlimited Certificates",
      "Exclusive Webinars",
    ],
    image: "premium-plan.jpg",
  },
];

const CurrentTest = () => {
  return (
    <section className="pricing-section">
      <div className="container">
        <h2 className="section-title text-center">Current <span className="highlight">Test</span></h2>

        <div className="row">
          {plans.map((plan, index) => (
            <div key={index} className="col-md-4">
              <div className="pricing-card">
                <img
                  src={imgagetwo}
                  alt={plan.title}
                  className="pricing-image"
                />
                <div className="pricing-content">
                  <h3 className="plan-title">{plan.title}</h3>
                  <div className="course-count">{plan.courses}</div>
                  <p className="plan-description">
                    {plan.features.map((feature, i) => (
                      <span key={i} className="feature">
                        ✅ {feature}
                      </span>
                    ))}
                  </p>
                  <p className="price">START FROM <br /><span className="price-value">{plan.price}</span> /MONTH</p>
                  <a href="#" className="view-plans">View Plans →</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CurrentTest;
