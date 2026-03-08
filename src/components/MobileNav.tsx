import React from 'react';
import styles from './MobileNav.module.css';

interface MobileNavProps {
    activeSection: string | null;
}

const sections = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
];

const MobileNav: React.FC<MobileNavProps> = ({ activeSection }) => {
    return (
        <nav className={styles.mobileNav}>
            {sections.map(section => (
                <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`${styles.navTab} ${activeSection === section.id ? styles.active : ''}`}
                >
                    {section.label}
                    <span className={styles.indicator}></span>
                </a>
            ))}
        </nav>
    );
};

export default MobileNav;
