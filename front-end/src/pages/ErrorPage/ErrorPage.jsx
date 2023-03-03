import React from "react";
import LinkButton from "../../components/LinkButton";

const ErrorPage = () => {
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6 text-center">
          <h1>404 Not Found</h1>
          <p>The page you're looking for doesn't exist.</p>
          <LinkButton type="primary" to="/">
            Back Home
          </LinkButton>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
