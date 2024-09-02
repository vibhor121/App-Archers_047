import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
// import "../Accordion.css"; // Adjust the path according to the actual location of Accordion.css

export const Accordion = () => {
  const [selectedImage, setSelectedImage] = useState(
    "https://global.discourse-cdn.com/business7/uploads/adalo/original/3X/0/0/00cb4da7aa01fc9b9885eb31a1562e1c9de778a4.jpeg"
  );

  const handleAccordionClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <div className="image-container">
            <img src={selectedImage} alt="Selected" className="img-fluid" />
          </div>
        </div>
        <div className="col-md-8">
          <div className="accordion custom-accordion" id="accordionExample">
            {/* MCQ Poll Accordion Item */}
            <div className="accordion-item custom-accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button custom-accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                  onClick={() =>
                    handleAccordionClick(
                      "https://global.discourse-cdn.com/business7/uploads/adalo/original/3X/0/0/00cb4da7aa01fc9b9885eb31a1562e1c9de778a4.jpeg"
                    )
                  }
                >
                  MCQ Poll
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body custom-accordion-body">
                  A multiple-choice question poll where participants are
                  presented with a list of predefined answer options and are
                  required to select one or more choices. This format is ideal
                  for questions that have several possible answers and helps in
                  understanding preferences or opinions across a range of
                  options.
                </div>
              </div>
            </div>
            {/* Binary Poll Accordion Item */}
            <div className="accordion-item custom-accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed custom-accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                  onClick={() =>
                    handleAccordionClick(
                      "https://media.istockphoto.com/id/1191857368/photo/dichotomous-questions-yes-no-buttons-vote-poll-concept.jpg?s=612x612&w=0&k=20&c=UEosLLuVDNZ2-KsKI8gDxMrocm4VqQKZ-M6LYbhFs-0="
                    )
                  }
                >
                  Binary Poll
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body custom-accordion-body">
                  A simple poll that offers only two response options, such as
                  "Yes" or "No," "Agree" or "Disagree." This type of poll is
                  useful for straightforward questions that seek a clear and
                  direct response, making it easy to gauge consensus or make
                  decisions based on a binary choice.
                </div>
              </div>
            </div>
            {/* Scale Poll Accordion Item */}
            <div className="accordion-item custom-accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button collapsed custom-accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                  onClick={() =>
                    handleAccordionClick(
                      "https://assets-eu-01.kc-usercontent.com/2702f056-973d-0149-8b6e-67ab679c010f/87256dd3-45f7-49b7-86b6-826304ef58f6/Blog%20images%20-%20Likert%20scale.png?w=1296&h=729"
                    )
                  }
                >
                  Scale Poll
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body custom-accordion-body">
                  A poll that asks respondents to rate something on a numerical
                  scale, such as from 1 to 5 or 1 to 10. This format allows
                  participants to express varying degrees of opinion or
                  satisfaction, providing a more nuanced understanding of their
                  views or experiences compared to binary responses.
                </div>
              </div>
            </div>
            {/* Q&A Poll Accordion Item */}
            <div className="accordion-item custom-accordion-item">
              <h2 className="accordion-header" id="headingFour">
                <button
                  className="accordion-button collapsed custom-accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                  onClick={() =>
                    handleAccordionClick(
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT63v1Z4Iq1J7qA2lY8evOIggBcpw16g1GHZA&s"
                    )
                  }
                >
                  Q & A Poll
                </button>
              </h2>
              <div
                id="collapseFour"
                className="accordion-collapse collapse"
                aria-labelledby="headingFour"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body custom-accordion-body">
                  A poll format where participants can submit their own
                  questions or answers, allowing for open-ended feedback. This
                  type of poll encourages more detailed and diverse responses,
                  making it useful for gathering in-depth opinions or
                  suggestions on a topic.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
