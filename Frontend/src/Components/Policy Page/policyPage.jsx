import React from "react";

const PolicyPage = () => {
  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "'Arial', sans-serif",
        backgroundColor: "#f7f7f7",
        color: "#333",
        lineHeight: "1.6",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "2.5em",
          marginBottom: "40px",
          color: "#2c3e50",
        }}
      >
        StayNear - Policies
      </h1>

      <p
        style={{
          fontSize: "1.1em",
          marginBottom: "40px",
          textAlign: "center",
          color: "#555",
        }}
      >
        Welcome to StayNear! We aim to make the accommodation search process easy and seamless for college students. Please read the following policies carefully before using our platform.
      </p>

      {/* Privacy Policy Section */}
      <section
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          marginBottom: "40px",
        }}
      >
        <h2
          style={{
            fontSize: "2em",
            marginBottom: "20px",
            color: "#2980b9",
          }}
        >
          Privacy Policy
        </h2>
        <p>
          At StayNear, we prioritize your privacy and are committed to protecting your personal information. This privacy policy outlines the types of data we collect, how we use it, and the steps we take to ensure your data is protected.
        </p>

        <h3
          style={{
            fontSize: "1.4em",
            marginTop: "20px",
            color: "#2980b9",
          }}
        >
          Information We Collect
        </h3>
        <ul style={{ paddingLeft: "20px" }}>
          <li>Personal information such as name, email address, phone number, etc.</li>
          <li>Location data to help you find accommodation near your college.</li>
          <li>Booking details and payment information for processing your reservations.</li>
        </ul>

        <h3
          style={{
            fontSize: "1.4em",
            marginTop: "20px",
            color: "#2980b9",
          }}
        >
          How We Use Your Information
        </h3>
        <ul style={{ paddingLeft: "20px" }}>
          <li>To facilitate bookings and confirm your reservation details.</li>
          <li>To send you important updates about your bookings or any changes in our policies.</li>
          <li>To improve the services provided on our platform and enhance user experience.</li>
        </ul>

        <h3
          style={{
            fontSize: "1.4em",
            marginTop: "20px",
            color: "#2980b9",
          }}
        >
          Your Data Rights
        </h3>
        <ul style={{ paddingLeft: "20px" }}>
          <li>You have the right to access, update, or delete your personal information.</li>
          <li>You can opt out of promotional emails by clicking on the unsubscribe link in the email.</li>
        </ul>
      </section>

      {/* Terms and Conditions Section */}
      <section
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          marginBottom: "40px",
        }}
      >
        <h2
          style={{
            fontSize: "2em",
            marginBottom: "20px",
            color: "#2980b9",
          }}
        >
          Terms and Conditions
        </h2>
        <p>
          These terms and conditions govern your use of the StayNear platform and the services we offer. By using our website and services, you agree to abide by these terms.
        </p>

        <h3
          style={{
            fontSize: "1.4em",
            marginTop: "20px",
            color: "#2980b9",
          }}
        >
          Eligibility
        </h3>
        <ul style={{ paddingLeft: "20px" }}>
          <li>You must be a college student, or someone booking accommodation on behalf of a student, to use our platform.</li>
          <li>Users must be at least 18 years old to register and use the platform.</li>
        </ul>

        <h3
          style={{
            fontSize: "1.4em",
            marginTop: "20px",
            color: "#2980b9",
          }}
        >
          Booking and Payment
        </h3>
        <ul style={{ paddingLeft: "20px" }}>
          <li>All bookings are subject to availability and confirmation by StayNear.</li>
          <li>Full payment is required at the time of booking to secure your accommodation.</li>
        </ul>

        <h3
          style={{
            fontSize: "1.4em",
            marginTop: "20px",
            color: "#2980b9",
          }}
        >
          Prohibited Activities
        </h3>
        <ul style={{ paddingLeft: "20px" }}>
          <li>You may not use the platform for illegal activities or violate any local laws related to accommodation.</li>
          <li>Any fraudulent activity or misrepresentation during the booking process may result in account termination.</li>
        </ul>
      </section>

      {/* Cookie Policy Section */}
      <section
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          marginBottom: "40px",
        }}
      >
        <h2
          style={{
            fontSize: "2em",
            marginBottom: "20px",
            color: "#2980b9",
          }}
        >
          Cookie Policy
        </h2>
        <p>
          StayNear uses cookies to enhance your experience on our website. Cookies are small text files stored on your device that help us analyze web traffic, personalize content, and improve user experience.
        </p>

        <h3
          style={{
            fontSize: "1.4em",
            marginTop: "20px",
            color: "#2980b9",
          }}
        >
          What Cookies Do We Use?
        </h3>
        <ul style={{ paddingLeft: "20px" }}>
          <li>Essential cookies to enable basic functionalities of the platform such as login and booking.</li>
          <li>Analytical cookies to track usage and improve our services.</li>
          <li>Advertising cookies to provide personalized content and offers.</li>
        </ul>

        <h3
          style={{
            fontSize: "1.4em",
            marginTop: "20px",
            color: "#2980b9",
          }}
        >
          Managing Cookies
        </h3>
        <p>
          You can control or disable cookies through your browser settings. However, please note that disabling cookies may affect your experience on StayNear, and some features may not function as expected.
        </p>
      </section>

      {/* Refund Policy Section */}
      <section
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          marginBottom: "40px",
        }}
      >
        <h2
          style={{
            fontSize: "2em",
            marginBottom: "20px",
            color: "#2980b9",
          }}
        >
          Refund Policy
        </h2>
        <p>
          StayNear offers a transparent refund policy to ensure that your experience is hassle-free. Please read the following conditions for refunds.
        </p>

        <h3
          style={{
            fontSize: "1.4em",
            marginTop: "20px",
            color: "#2980b9",
          }}
        >
          Eligibility for Refund
        </h3>
        <ul style={{ paddingLeft: "20px" }}>
          <li>If you cancel your booking at least 48 hours before your scheduled check-in, you are eligible for a full refund.</li>
          <li>If you cancel your booking within 48 hours of your check-in time, a partial refund of 50% of the total booking amount will be processed.</li>
          <li>If you do not show up for your booking without prior notice, no refund will be issued.</li>
        </ul>

        <h3
          style={{
            fontSize: "1.4em",
            marginTop: "20px",
            color: "#2980b9",
          }}
        >
          Refund Process
        </h3>
        <ul style={{ paddingLeft: "20px" }}>
          <li>Refunds will be processed to the original payment method within 7-10 business days after the cancellation is confirmed.</li>
          <li>In case of any discrepancies or issues, please contact our support team, and we will assist you in resolving the matter.</li>
        </ul>
      </section>
    </div>
  );
};

export default PolicyPage;
