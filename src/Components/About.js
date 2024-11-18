import React, { Component } from "react";
import Fade from "react-reveal";
import './About.css';

class About extends Component {
  render() {
    if (!this.props.data) return null;

    const { name, image, bio, about } = this.props.data;
    const profilepic = "images/" + image;
    const tutor = about.tutor;
    const sportsAndEvents = about.sportsAndEvents;
    const collaborationMessage = about.collaborationMessage;
    const emailLink = about.emailLink;

    return (
      <section id="about">
        <div className="about-wrapper">
          <Fade duration={1000}>
            <div className="row">
              {/* Profile Picture Section */}
              <div className="profile-pic-container">
                <img
                  className="profile-pic"
                  src={profilepic}
                  alt={`${name} Profile Pic`}
                />
              </div>
            </div>

            {/* About Me Header */}
            <div className="about-content" style={{ marginBottom: '20px' }}>
              <div className="bio-box">
                <h3 className="section-title">About Me</h3>
                <p style={{ color: 'black' }}>{bio}</p>
              </div>
            </div>

            {/* About Me Details in Flex Layout */}
            <div className="about-content-flex" style={{ display: 'flex' }}>
              <div className="content-box">
                <h3 className="section-title" style={{ fontSize: '14px' }}>🎓 Technical Tutor</h3>
                <p style={{ color: 'black' }}>{tutor}</p>
              </div>
              <div className="content-box">
                <h3 className="section-title" style={{ fontSize: '14px' }}>⚽ Sports & Events</h3>
                <p style={{ color: 'black' }}>{sportsAndEvents}</p>
              </div>
              <div className="content-box">
                <h3 className="section-title" style={{ fontSize: '14px' }}>💡 Do you have any idea?</h3>
                <p style={{ color: 'black' }}>
                  {collaborationMessage}{" "}
                </p>
              </div>
            </div>

            <div><p style={{color: 'black',marginTop: 10}}>Please feel free to reach out to me if you need any information or have any questions regarding my work, tutoring, or anything else. You can contact me at {emailLink}</p></div>

          </Fade>
        </div>
      </section>
    );
  }
}

export default About;
