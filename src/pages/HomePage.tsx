import React, { useState, useEffect, useRef } from 'react';
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
    // Current section
    const [activeSection, setActiveSection] = useState<string | null>(null);

    const sectionObserverOptions = { threshold: 0.5 };
    const [aboutRef, aboutInView] = useInView(sectionObserverOptions);
    const [experienceRef, experienceInView] = useInView(sectionObserverOptions);
    const [projectsRef, projectsInView] = useInView(sectionObserverOptions);

    useEffect(() => {
        if (aboutInView) setActiveSection("about");
        else if (experienceInView) setActiveSection("experience");
        else if (projectsInView) setActiveSection("projects");
    }, [aboutInView, experienceInView, projectsInView]);

    // Header pinning
    const [isPinned, setIsPinned] = useState<boolean>(false);

    const aboutHeaderRef = useRef<HTMLDivElement>(null);
    const experienceHeaderRef = useRef<HTMLDivElement>(null);
    const projectsHeaderRef = useRef<HTMLDivElement>(null);

    const checkIfHeaderIsPinned = () => {
        const aboutTop = aboutHeaderRef.current?.getBoundingClientRect().top || 0;
        const experienceTop = experienceHeaderRef.current?.getBoundingClientRect().top || 0;
        const projectsTop = projectsHeaderRef.current?.getBoundingClientRect().top || 0;

        if (aboutTop === 0 || experienceTop === 0 || projectsTop === 0) {
            setIsPinned(true);
        } else {
            setIsPinned(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', checkIfHeaderIsPinned);

        return () => {
            window.removeEventListener('scroll', checkIfHeaderIsPinned);
        };
    }, []);

    return (
        <>
            <div className={isPinned ? styles.blurEffect : styles.hidden}></div>
            <Container className='d-flex'>
                <Row>
                    <Col lg={1} md={0} className={styles.hiddenCol}></Col>
                    <Col lg={5} md={12}>
                        <SideNav activeSection={activeSection} />
                    </Col>
                    <Col lg={5} md={12}>
                        <div className={styles.tallSpacer} id='about'></div>

                        <div className={styles.stickyWrapper}>
                            <div ref={aboutHeaderRef} className={styles.sectionHeader}>About</div>
                            <div ref={aboutRef} className={styles.aboutSection}>
                                <p>Hello there! I'm Connor Bowling, a Junior Software Engineer and an undergraduate at <a href="https://www.tamu.edu/" target="_blank" rel="noopener noreferrer" className={styles.textLink}>Texas A&M University - College Station.</a> My coding journey began not in a classroom, but amidst the enthralling world of game design. What started as a fascination with game development in C# soon transformed into a profound love for all things coding.</p>
                                <p>As I transitioned into high school, I took formal programming courses, where Java became my new playground. This foundational knowledge was just the beginning. On reaching Texas A&M, I delved deeper into the realm of Computer Science. My initial years were about grasping the basics with languages like Python and C++. However, with time, my aspirations evolved. I began crafting interactive websites, designing intuitive apps, and diving deep into backend functionalities.</p>
                                <p>The growth didn't stop there. I ventured into complex domains such as database management, cloud deployments, and more. Parallel to this academic progression, my passion for game design never waned. I've consistently channeled my creativity into various gaming projects over the years, and you can explore some of these creations on my <a href="https://bowlinggamedesign.com/" target="_blank" rel="noopener noreferrer" className={styles.textLink}>game design portfolio.</a></p>
                                <p>Outside the world of codes and pixels, I enjoy a good game of hockey or immersing myself in the latest video game. It's this blend of physical and digital recreation that keeps me grounded and offers a refreshing break from my professional endeavors.</p>
                            </div>
                        </div>

                        <div className={styles.spacer}></div>
                        <div className={styles.divider} id='experience'></div>
                        <div className={styles.spacer}></div>

                        <div className={styles.stickyWrapper}>
                            <div ref={experienceHeaderRef} className={styles.sectionHeader}>Experience</div>
                            <div ref={experienceRef} className={styles.cardSection}>
                                {experienceData.map((exp: Experience) => (
                                    <a href={exp.website} target="_blank" rel="noopener noreferrer" key={exp.id}>
                                        <div className={styles.card}>
                                            <div className={styles.date}>
                                                <span className={styles.startDate}>{exp.startDate}</span>
                                                <div className={styles.timeline}></div>
                                                <span className={styles.endDate}>{exp.endDate}</span>
                                            </div>
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
                        </div>

                        <div className={styles.spacer}></div>
                        <div className={styles.divider} id='projects'></div>
                        <div className={styles.spacer}></div>

                        <div className={styles.stickyWrapper}>
                            <div ref={projectsHeaderRef} className={styles.sectionHeader}>Projects</div>
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
                        </div>

                        <div className={styles.spacer}></div>
                    </Col>
                    <Col lg={1} md={0} className={styles.hiddenCol}></Col>
                </Row>
            </Container>
        </>
    );
};

export default HomePage;
