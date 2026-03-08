import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

import Container from 'react-bootstrap/Container';
import SideNav from '../components/SideNav';
import MobileNav from '../components/MobileNav';
import AnimatedSection from '../components/AnimatedSection';
import styles from './HomePage.module.css';
import { Col, Row } from 'react-bootstrap';
import Card from '../components/Card';
import experienceData from '../data/experienceData.json';
import projectsData from '../data/projectsData.json';
import skillsData from '../data/skillsData.json';
import Experience from '../types/ExperienceType';
import Project from '../types/ProjectType';
import SkillCategory from '../types/SkillType';

const SECTIONS = ['about', 'skills', 'experience', 'projects'] as const;

const cardContainerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" },
    },
};

const HomePage: React.FC = () => {
    // Active section detection based on scroll position
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [isPinned, setIsPinned] = useState<boolean>(false);
    const ticking = useRef(false);

    const updateActiveSection = useCallback(() => {
        let closest: string | null = null;
        let closestDistance = Infinity;

        for (const id of SECTIONS) {
            const el = document.getElementById(id);
            if (el) {
                const top = el.getBoundingClientRect().top;
                // Pick the section whose anchor is closest to (but above or at) the viewport top
                // Use a small offset so it activates slightly before reaching the anchor
                const distance = Math.abs(top - 100);
                if (top <= 150 && distance < closestDistance) {
                    closestDistance = distance;
                    closest = id;
                }
            }
        }

        // If nothing is close enough (user is at the very top), default to first section
        if (!closest && window.scrollY < 200) {
            closest = 'about';
        }

        if (closest) setActiveSection(closest);
    }, []);

    const checkIfHeaderIsPinned = useCallback(() => {
        const headers = document.querySelectorAll('[data-section-header]');
        let pinned = false;
        headers.forEach(header => {
            if (Math.abs(header.getBoundingClientRect().top) < 2) {
                pinned = true;
            }
        });
        setIsPinned(pinned);
    }, []);

    useEffect(() => {
        const onScroll = () => {
            if (!ticking.current) {
                requestAnimationFrame(() => {
                    updateActiveSection();
                    checkIfHeaderIsPinned();
                    ticking.current = false;
                });
                ticking.current = true;
            }
        };

        updateActiveSection(); // Set initial state
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [updateActiveSection, checkIfHeaderIsPinned]);

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
                            <div data-section-header className={styles.sectionHeader}>About</div>
                            <AnimatedSection>
                                <div className={styles.aboutSection}>
                                    <p>Hello there! I'm Connor Bowling, a Junior Software Engineer and an undergraduate at <a href="https://www.tamu.edu/" target="_blank" rel="noopener noreferrer" className={styles.textLink}>Texas A&M University - College Station.</a> My coding journey began not in a classroom, but amidst the enthralling world of game design. What started as a fascination with game development in C# soon transformed into a profound love for all things coding.</p>
                                    <p>As I transitioned into high school, I took formal programming courses, where Java became my new playground. This foundational knowledge was just the beginning. On reaching Texas A&M, I delved deeper into the realm of Computer Science. My initial years were about grasping the basics with languages like Python and C++. However, with time, my aspirations evolved. I began crafting interactive websites, designing intuitive apps, and diving deep into backend functionalities.</p>
                                    <p>The growth didn't stop there. I ventured into complex domains such as database management, cloud deployments, and more. Parallel to this academic progression, my passion for game design never waned. I've consistently channeled my creativity into various gaming projects over the years, and you can explore some of these creations on my <a href="https://bowlinggamedesign.com/" target="_blank" rel="noopener noreferrer" className={styles.textLink}>game design portfolio.</a></p>
                                    <p>Outside the world of codes and pixels, I enjoy a good game of hockey or immersing myself in the latest video game. It's this blend of physical and digital recreation that keeps me grounded and offers a refreshing break from my professional endeavors.</p>
                                </div>
                            </AnimatedSection>
                        </div>

                        <div className={styles.spacer}></div>
                        <div className={styles.divider} id='skills'></div>
                        <div className={styles.spacer}></div>

                        <div className={styles.stickyWrapper}>
                            <div className={styles.sectionHeader}>Skills</div>
                            <AnimatedSection>
                                <div className={styles.skillsSection}>
                                    {skillsData.map((group: SkillCategory) => (
                                        <div key={group.category} className={styles.skillGroup}>
                                            <h4 className={styles.skillCategory}>{group.category}</h4>
                                            <ul className={styles.technologies}>
                                                {group.items.map(skill => (
                                                    <li key={skill}>{skill}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </AnimatedSection>
                        </div>

                        <div className={styles.spacer}></div>
                        <div className={styles.divider} id='experience'></div>
                        <div className={styles.spacer}></div>

                        <div className={styles.stickyWrapper}>
                            <div data-section-header className={styles.sectionHeader}>Experience</div>
                            <motion.div
                                className={styles.cardSection}
                                variants={cardContainerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: false, margin: "-50px" }}
                            >
                                {experienceData.map((exp: Experience) => (
                                    <motion.a href={exp.website} target="_blank" rel="noopener noreferrer" key={exp.id} variants={cardVariants}>
                                        <Card
                                            title={exp.position}
                                            subtitle={exp.company}
                                            description={exp.description}
                                            technologies={exp.technologies}
                                            leftContent={{ type: 'date', startDate: exp.startDate, endDate: exp.endDate }}
                                        />
                                    </motion.a>
                                ))}
                            </motion.div>
                        </div>

                        <div className={styles.spacer}></div>
                        <div className={styles.divider} id='projects'></div>
                        <div className={styles.spacer}></div>

                        <div className={styles.stickyWrapper}>
                            <div data-section-header className={styles.sectionHeader}>Projects</div>
                            <motion.div
                                className={styles.cardSection}
                                variants={cardContainerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: false, margin: "-50px" }}
                            >
                                {projectsData.map((proj: Project) => (
                                    <motion.a href={proj.website} target="_blank" rel="noopener noreferrer" key={proj.id} variants={cardVariants}>
                                        <Card
                                            title={proj.title}
                                            description={proj.description}
                                            technologies={proj.technologies}
                                            leftContent={{ type: 'thumbnail', src: proj.screenshot, alt: proj.title }}
                                        />
                                    </motion.a>
                                ))}
                            </motion.div>
                        </div>

                        <div className={styles.spacer}></div>
                    </Col>
                    <Col lg={1} md={0} className={styles.hiddenCol}></Col>
                </Row>
            </Container>
            <MobileNav activeSection={activeSection} />
        </>
    );
};

export default HomePage;
