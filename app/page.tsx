'use client'
import React from 'react'

const HomePage = () => {
  return (
    <div className="homepage">
      {/* On Demand Services Header */}
      <h1 className="header">On-Demand Services</h1>
      <p className="caption">
        TryAt.ai connects you with millions of service providers—covering every
        service you can imagine
      </p>
      <div className="flip-container">
        {/* Left Box */}
        <div className="flip-box">
          <div className="flip-box-inner">
            <div className="flip-box-front">
              <h2>For Service Requesters</h2>
              <p className="text-slate-950">
                Are you looking for quick, reliable services at your fingertips?
                Whether it’s a tutor for your child, a plumber, electricians,
                hiring a rental agent for your property, for rental home, a
                personal trainer, or even a professional photographer.
              </p>
            </div>
            <div className="flip-box-back">
              <h2>How It Works</h2>
              <ol>
                <li>Message Us: Send your service request via WhatsApp.</li>
                <li>
                  AI-Powered Matchmaking: We match you with the best service
                  providers nearby.
                </li>
                <li>Get Connected: Receive immediate responses.</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Center Image */}
        <div className="center-image">
          <img src="/tryat-logo.svg" alt="tryat.ai" className="image" />
        </div>

        {/* Right Box */}
        <div className="flip-box">
          <div className="flip-box-inner">
            <div className="flip-box-front">
              <h2>For Service Providers</h2>
              <p>
                Are you a service provider looking for a seamless platform to
                reach more clients? Join TryAt.ai and gain instant access to a
                vast audience of service requesters.
              </p>
            </div>
            <div className="flip-box-back">
              <h2>Why Choose TryAt.ai?</h2>
              <ul>
                <li>Wider Reach: Tap into a global user base.</li>
                <li>Real-Time Requests: Get notified instantly.</li>
                <li>
                  Seamless Communication: Connect directly with clients via
                  WhatsApp.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .homepage {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 50px;
          background-color: #f5f5f5;
        }

        .header {
          font-size: 2.5rem; /* Increased font size */
          margin-bottom: 10px;
          color: black;
          text-align: center;
        }

        .caption {
          font-size: 1rem; /* Adjust the caption size */
          color: gray;
          margin-top: -10px; /* Adjusts the space between header and caption */
          text-align: center;
          font-weight: 300;
          margin-bottom: 40px; /* Adds space below the caption */
        }

        .flip-container {
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 100%;
        }

        .flip-box {
          background-color: transparent;
          width: 400px; /* Increased size */
          height: 650px; /* Increased size */
          perspective: 1000px;
          margin: 0 20px; /* Reduced gap between boxes */
        }

        .flip-box-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }

        .flip-box:hover .flip-box-inner {
          transform: rotateY(180deg);
        }

        .flip-box-front,
        .flip-box-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 10px;
        }

        .flip-box-front {
          background-color: #fff;
          color: black;
        }

        .flip-box-back {
          background-color: #333;
          color: white;
          transform: rotateY(180deg);
        }

        .center-image {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .image {
          width: 200px; /* Reduced size */
          height: 200px; /* Reduced size */
          object-fit: contain;
        }

        p,
        ol,
        ul {
          font-size: 1.1rem;
          margin: 0;
        }

        ol li,
        ul li {
          margin-bottom: 10px;
        }

        /* Updated title styles */
        h2 {
          font-size: 1.6rem; /* Increased font size for titles */
          font-weight: bold; /* Make titles bold */
          margin-bottom: 20px; /* Added gap between title and content */
        }
      `}</style>
    </div>
  )
}

export default HomePage
