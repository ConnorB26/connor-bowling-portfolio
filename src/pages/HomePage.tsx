import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Container from 'react-bootstrap/Container';
import SideNav from '../components/SideNav';
import styles from './HomePage.module.css';
import { Col, Row } from 'react-bootstrap';
import { FaExternalLinkAlt } from 'react-icons/fa';
import experienceData from '../data/experienceData.json';
import projectsData from '../data/projectsData.json';
import Experience from '../types/ExperienceType';
import Project from '../types/ProjectType';

const HomePage: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string | null>(null);

    const [aboutRef, aboutInView] = useInView({ threshold: 0.5 });
    const [experienceRef, experienceInView] = useInView({ threshold: 0.5 });
    const [projectsRef, projectsInView] = useInView({ threshold: 0.5 });

    useEffect(() => {
        if (aboutInView) setActiveSection("about");
        else if (experienceInView) setActiveSection("experience");
        else if (projectsInView) setActiveSection("projects");
    }, [aboutInView, experienceInView, projectsInView]);

    return (
        <Container className='d-flex'>
            <Row>
                <Col lg={1} md={0} className={styles.hiddenCol}></Col>
                <Col lg={5} md={12}>
                    <SideNav activeSection={activeSection} />
                </Col>
                <Col lg={5} md={12}>
                    <div ref={aboutRef} id='about'>
                        <p>Back in 2012, I decided to try my hand at creating custom Tumblr themes and tumbled head first into the rabbit hole of coding and web development. Fast-forward to today, and I've had the privilege of building software for an advertising agency, a start-up, a student-led design studio, and a huge corporation.</p>
                        <p>My main focus these days is building products and leading projects for our clients at Upstatement. In my free time I've also released an online video course that covers everything you need to know to build a web app with the Spotify API.</p>
                        <p>When I'm not at the computer, I'm usually rock climbing, hanging out with my wife and two cats, or running around Hyrule searching for Korok seeds</p>
                    </div>
                    <div ref={experienceRef} className={styles.experienceSection} id='experience'>
                        {experienceData.map((exp: Experience) => (
                            <a href={exp.website} target="_blank" rel="noopener noreferrer">
                                <div className={styles.experienceCard}>
                                    <div className={styles.date}>{exp.date}</div>
                                    <div className={styles.details}>
                                        <h4>{exp.position}</h4>
                                        <h5>{exp.company}</h5>
                                        <FaExternalLinkAlt className={styles.externalLinkIcon} />
                                        <p>{exp.description}</p>
                                        <ul className={styles.technologies}>
                                            {exp.technologies.map(tech => (
                                                <li>{tech}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>

                    <a href="/resume" target="_blank" rel="noopener noreferrer">See Full Resume</a>

                    <div ref={projectsRef} className={styles.projectsSection} id='projects'>
                        {projectsData.map((proj: Project) => (
                            <div className={styles.projectCard}>
                                <img src={proj.screenshot} alt={proj.title} />
                                <div className={styles.details}>
                                    <h4>{proj.title}</h4>
                                    <p>{proj.description}</p>
                                    <ul className={styles.technologies}>
                                        {proj.technologies.map(tech => (
                                            <li>{tech}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>

                    <a href="/projects" target="_blank" rel="noopener noreferrer">See Project Archive</a>
                </Col>
                <Col lg={1} md={0} className={styles.hiddenCol}></Col>
            </Row>
        </Container>
    );
};

export default HomePage;
