import React, { useRef, useState } from 'react';
import styles from './SideNav.module.css';
import { Container } from 'react-bootstrap';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface NavItemProps {
    label: string;
    href: string;
    isActive: boolean;
    onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ label, href, isActive, onClick }) => {
    return (
        <a href={href} className={`${styles.navItem} ${isActive ? styles.active : ''}`} onClick={onClick}>
            <span className={styles.indicator}></span>
            {label}
        </a>
    );
}

interface SideNavProps {
    activeSection: string | null;
}

const SideNav: React.FC<SideNavProps> = ({ activeSection }) => {
    const [userClickedSection, setUserClickedSection] = useState<string | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleNavClick = (section: string) => {
        setUserClickedSection(section);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setUserClickedSection(null);
        }, 1000);
    };

    const getIsActive = (section: string): boolean => {
        if (userClickedSection) {
            return userClickedSection === section;
        }
        return activeSection === section;
    };

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
                    <a href="/" className={styles.name} onClick={handleNameClick}><h1>Connor Bowling</h1></a>
                    <h2 className={styles.position}>Junior Software Engineer</h2>
                    <p className={styles.description}>A brief description about yourself.</p>
                </div>

                <div className={styles.navContainer}>
                    <NavItem label="About" href="#about" isActive={getIsActive("about")} onClick={() => handleNavClick("about")} />
                    <NavItem label="Experience" href="#experience" isActive={getIsActive("experience")} onClick={() => handleNavClick("experience")} />
                    <NavItem label="Projects" href="#projects" isActive={getIsActive("projects")} onClick={() => handleNavClick("projects")} />
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
