import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Container from 'react-bootstrap/Container';
import SideNav from '../components/SideNav';
import styles from './HomePage.module.css';
import { Col, Row } from 'react-bootstrap';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
import experienceData from '../data/experienceData.json';
import projectsData from '../data/projectsData.json';
import Experience from '../types/ExperienceType';
import Project from '../types/ProjectType';

const HomePage: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string | null>(null);

    const [aboutRef, aboutInView] = useInView({ threshold: 0.7 });
    const [experienceRef, experienceInView] = useInView({ threshold: 0.7 });
    const [projectsRef, projectsInView] = useInView({ threshold: 0.7 });

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
                    <div className={styles.spacer} id='about'></div>

                    <div className={styles.stickyWrapper}>
                        <div className={styles.sectionHeader}>About</div>
                        <div ref={aboutRef} className={styles.aboutSection}>
                            <p>About me text</p>
                        </div>
                    </div>

                    <div className={styles.spacer} id='experience'></div>

                    <div className={styles.stickyWrapper}>
                        <div className={styles.sectionHeader}>Experience</div>
                        <div ref={experienceRef} className={styles.cardSection}>
                            {experienceData.map((exp: Experience) => (
                                <a href={exp.website} target="_blank" rel="noopener noreferrer" key={exp.id}>
                                    <div className={styles.card}>
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
                        <a href="/resume" target="_blank" rel="noopener noreferrer" className={styles.textLink}>See Full Resume <BsArrowRight /></a>
                    </div>

                    <div className={styles.spacer} id='projects'></div>

                    <div className={styles.stickyWrapper}>
                        <div className={styles.sectionHeader}>Projects</div>
                        <div ref={projectsRef} className={styles.cardSection}>
                            {projectsData.map((proj: Project) => (
                                <a href={proj.website} target="_blank" rel="noopener noreferrer" key={proj.id}>
                                    <div className={styles.card}>
                                        <div className={styles.thumbnail}>
                                            <img src={proj.screenshot} alt={proj.title} />
                                        </div>
                                        <div className={styles.details}>
                                            <h4>{proj.title}</h4>
                                            <FaExternalLinkAlt className={styles.externalLinkIcon} />
                                            <p>{proj.description}</p>
                                            <ul className={styles.technologies}>
                                                {proj.technologies.map(tech => (
                                                    <li>{tech}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                        <a href="/projects" target="_blank" rel="noopener noreferrer" className={styles.textLink}>See Project Archive <BsArrowRight /></a>
                    </div>

                    <div className={styles.spacer}></div>
                </Col>
                <Col lg={1} md={0} className={styles.hiddenCol}></Col>
            </Row>
        </Container>
    );
};

export default HomePage;
