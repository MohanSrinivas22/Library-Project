import React from "react";
export const Heros = () => {
  return (
    <div>
      <div className="d-none d-lg-block">
        <div className="row g-0 mt-5">
          <div className="col-md-6 col-sm-6">
            <div className="col-image-left"></div>
          </div>

          <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
            <div className="ml-2">
              <h2>What have you been reading?</h2>
              <p className="lead">
                Our Library would love to know what you have been reading.
                Weather it is to learn a new skill or to grow in one, we will be
                there to provide you the top content.
              </p>
              <div className="d-grid justify-content-lg-start mb-4 mb-lg-3">
                <a href="#" className="btn main-color btn-lg text-white">
                  Sign up
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-0 mt-5">
          <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
            <div className="ml-2">
              <h2>Our Collection is always changing!</h2>
              <p className="lead">
                Try to check in daily our collecion is always changing. We work
                nonstop to deliver the accurate book selection possible for our
                React library students! We are diligent about our books
                Collection and aour books and students are always going tobe our
                top priority.
              </p>
            </div>
          </div>

          <div className="col-md-6 col-sm-6">
            <div className="col-image-right"></div>
          </div>
        </div>
      </div>

      {/* Mobile Heros */}
      <div className="d-lg-none">
        <div className="container">
          <div className="m-2">
            <div className="col-image-left"></div>
            <div className="mt-2">
              <h2>What have you been reading?</h2>
              <p className="lead">
                Our Library would love to know what you have been reading.
                Weather it is to learn a new skill or to grow in one, we will be
                there to provide you the top content.
              </p>
              <div className="d-grid justify-content-lg-start mb-4 mb-lg-3">
                <a href="#" className="btn main-color btn-lg text-white">
                  Sign up
                </a>
              </div>
            </div>
          </div>
          <div className="m-2">
            <div className="col-image-right"></div>
            <div className="mt-2">
              <h2>Our Collection is always changing!</h2>
              <p className="lead">
                Try to check in daily our collecion is always changing. We work
                nonstop to deliver the accurate book selection possible for our
                React library students! We are diligent about our books
                Collection and aour books and students are always going tobe our
                top priority.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
