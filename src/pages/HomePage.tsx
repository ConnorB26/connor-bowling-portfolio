import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Container from 'react-bootstrap/Container';
import SideNav from '../components/SideNav';
import styles from './HomePage.module.css';

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
        <Container className={`d-flex ${styles.test}`}>
            <SideNav activeSection={activeSection} />
            <div>
                <div ref={aboutRef}>
                    {/* About section content */}
                </div>
                <div ref={experienceRef}>
                    {/* Experience section content */}
                </div>
                <div ref={projectsRef}>
                    {/* Projects section content */}
                </div>
            </div>
        </Container>
    );
};

export default HomePage;
