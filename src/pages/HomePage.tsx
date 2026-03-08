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
import certificationsData from '../data/certificationsData.json';
import Certification from '../types/CertificationType';

const SECTIONS = ['about', 'skills', 'certifications', 'experience', 'projects'] as const;

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
                                    <p>Howdy, I'm Connor Bowling, a Software Engineer at Charles Schwab where I work on .NET APIs and internal tooling. I graduated from Texas A&M University with a B.S. in Computer Science in 2024, though my path into coding started well before that.</p>
                                    <p>It started through game development in C#, not through any formal class. Most of what I know came from picking something up and building with it: games, apps, websites, and a Linux homelab for self-hosting and experimenting. That habit has carried into my career, where I keep picking up new technologies, usually to improve how I or other developers work. Game development is still where I go when I want to build something just for fun, and you can find some of those projects on my <a href="https://bowlinggamedesign.com/" target="_blank" rel="noopener noreferrer" className={styles.textLink}>game design portfolio.</a></p>
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
                        <div className={styles.divider} id='certifications'></div>
                        <div className={styles.spacer}></div>

                        <div className={styles.stickyWrapper}>
                            <div data-section-header className={styles.sectionHeader}>Certifications</div>
                            <AnimatedSection>
                                <div className={styles.certSection}>
                                    {certificationsData.map((cert: Certification) => (
                                        <a href={cert.website} target="_blank" rel="noopener noreferrer" key={cert.id} className={styles.certItem}>
                                            <span className={styles.certTitle}>{cert.title}</span>
                                            <span className={styles.certIssuer}>{cert.issuer}</span>
                                        </a>
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
