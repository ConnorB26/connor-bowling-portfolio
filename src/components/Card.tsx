import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import styles from '../pages/HomePage.module.css';

type LeftContent =
    | { type: 'date'; startDate: string; endDate: string }
    | { type: 'thumbnail'; src: string; alt: string };

interface CardProps {
    title: string;
    subtitle?: string;
    description: string;
    technologies: string[];
    leftContent: LeftContent;
}

const Card: React.FC<CardProps> = ({ title, subtitle, description, technologies, leftContent }) => {
    return (
        <div className={styles.card}>
            {leftContent.type === 'date' ? (
                <div className={styles.date}>
                    <span className={styles.startDate}>{leftContent.startDate}</span>
                    <div className={styles.timeline}></div>
                    <span className={styles.endDate}>{leftContent.endDate}</span>
                </div>
            ) : (
                <div className={styles.thumbnail}>
                    <img src={leftContent.src} alt={leftContent.alt} />
                </div>
            )}
            <div className={styles.details}>
                <h4>{title}</h4>
                {subtitle && <h5>{subtitle}</h5>}
                <FaExternalLinkAlt className={styles.externalLinkIcon} />
                <p>{description}</p>
                <ul className={styles.technologies}>
                    {technologies.map(tech => (
                        <li key={tech}>{tech}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Card;
