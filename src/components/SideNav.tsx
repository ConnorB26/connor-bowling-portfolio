import React from 'react';
import styles from './SideNav.module.css';
import { Container } from 'react-bootstrap';
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface NavItemProps {
    label: string;
    href: string;
    isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ label, href, isActive }) => {
    return (
        <a href={href} className={`${styles.navItem} ${isActive ? 'active' : ''}`}>
            <span className={styles.indicator}></span>
            {label}
        </a>
    );
}

interface SideNavProps {
    activeSection: string | null;
}

const SideNav: React.FC<SideNavProps> = ({ activeSection }) => {
    const navigate = useNavigate();

    const handleNameClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        window.scrollTo(0, 0);
        navigate('/');
    }

    return (
        <Container className={styles.container} fluid>
            <div className={styles.topContainer}>
                <div className={styles.nameContainer}>
                    <a href="#" className={styles.name} onClick={handleNameClick}><h1>Connor Bowling</h1></a>
                    <h2 className={styles.position}>Junior Software Engineer</h2>
                    <p className={styles.description}>A brief description about yourself.</p>
                </div>

                <div className={styles.navContainer}>
                    <NavItem label="About" href="#about" isActive={activeSection === "about"} />
                    <NavItem label="Experience" href="#experience" isActive={activeSection === "experience"} />
                    <NavItem label="Projects" href="#projects" isActive={activeSection === "projects"} />
                </div>
            </div>

            <div className={styles.socialContainer}>
                <a href="https://github.com/connorb26" target="_blank" rel="noopener noreferrer">
                    <FaGithub className={styles.socialIcon} />
                </a>
                <a href="https://www.linkedin.com/in/connor-bowling/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className={styles.socialIcon} />
                </a>
            </div>
        </Container>
    );
}

export default SideNav;
