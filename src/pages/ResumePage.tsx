import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsPrinter } from 'react-icons/bs';
import { BsArrowLeft } from 'react-icons/bs';
import styles from './ResumePage.module.css';
import experienceData from '../data/experienceData.json';
import projectsData from '../data/projectsData.json';
import certificationsData from '../data/certificationsData.json';
import educationData from '../data/educationData.json';
import Experience from '../types/ExperienceType';
import Project from '../types/ProjectType';
import Certification from '../types/CertificationType';
import Education from '../types/EducationType';

const resumeSkills = [
    { category: 'Languages', items: 'C#, TypeScript, JavaScript, Python, Java, C++, Kotlin, SQL' },
    { category: 'Frameworks & Tools', items: '.NET Core, React, Nest JS, Node.js, Docker, AWS, GCP, PCF, Git, Aerospike, Postgres' },
];

const ResumePage: React.FC = () => {
    const resumeProjects = (projectsData as Project[]).filter(p => p.showOnResume);

    useEffect(() => {
        document.title = 'Connor Bowling - Resume';
        return () => { document.title = 'Connor Bowling - Software Engineer'; };
    }, []);

    return (
        <div className={styles.page}>
            <div className={styles.actions}>
                <Link to="/" className={styles.backLink}>
                    <BsArrowLeft /> Portfolio
                </Link>
                <div className={styles.printActions}>
                    <button className={styles.printButton} onClick={() => window.print()}>
                        <BsPrinter /> Print / Save as PDF
                    </button>
                    <span className={styles.printHint}>In print dialog: More settings → uncheck Headers and footers</span>
                </div>
            </div>

            <div className={styles.resume}>
                <header className={styles.header}>
                    <h1 className={styles.name}>Connor Bowling</h1>
                    <div className={styles.contact}>
                        <a href="mailto:connorbowling26@gmail.com">connorbowling26@gmail.com</a>
                        <span className={styles.sep}>|</span>
                        <a href="https://connorbowling.com" target="_blank" rel="noopener noreferrer">connorbowling.com</a>
                        <span className={styles.sep}>|</span>
                        <a href="https://linkedin.com/in/connor-bowling" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        <span className={styles.sep}>|</span>
                        <a href="https://github.com/connorb26" target="_blank" rel="noopener noreferrer">GitHub</a>
                    </div>
                </header>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Experience</h2>
                    {(experienceData as Experience[]).map(exp => (
                        <div key={exp.id} className={styles.entry}>
                            <div className={styles.entryHeader}>
                                <span className={styles.entryTitle}>
                                    {exp.company} – <em>{exp.position}</em>
                                </span>
                                <span className={styles.entryDate}>
                                    {exp.startDate} – {exp.endDate}
                                </span>
                            </div>
                            <ul className={styles.bullets}>
                                {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
                            </ul>
                        </div>
                    ))}
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Projects</h2>
                    {resumeProjects.map(proj => (
                        <div key={proj.id} className={styles.entry}>
                            <div className={styles.entryHeader}>
                                <a href={proj.website} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                                    {proj.title}
                                </a>
                                {proj.startDate && (
                                    <span className={styles.entryDate}>
                                        {proj.startDate}{proj.endDate ? ` – ${proj.endDate}` : ''}
                                    </span>
                                )}
                            </div>
                            <ul className={styles.bullets}>
                                {proj.bullets.map((b, i) => <li key={i}>{b}</li>)}
                            </ul>
                        </div>
                    ))}
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Education</h2>
                    {(educationData as Education[]).map(edu => (
                        <div key={edu.id} className={styles.entry}>
                            <div className={styles.entryHeader}>
                                <span className={styles.entryTitle}>
                                    {edu.institution}, {edu.location}
                                </span>
                                <span className={styles.entryDate}>{edu.graduationDate}</span>
                            </div>
                            <div className={styles.entrySubtitle}>
                                {edu.degree}{edu.honors ? `, ${edu.honors}` : ''}
                            </div>
                        </div>
                    ))}
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Skills</h2>
                    <div className={styles.skillsGrid}>
                        {resumeSkills.map(group => (
                            <div key={group.category} className={styles.skillRow}>
                                <span className={styles.skillLabel}>{group.category}:</span>
                                <span className={styles.skillItems}>{group.items}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Certifications</h2>
                    <div className={styles.certRow}>
                        {(certificationsData as Certification[]).map((cert, i, arr) => (
                            <React.Fragment key={cert.id}>
                                <a
                                    href={cert.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.certLink}
                                    style={{ textAlign: (['left', 'center', 'right'] as const)[i] }}
                                >
                                    {cert.title}
                                    <span className={styles.certIssuer}> ({cert.issuer})</span>
                                </a>
                                {i < arr.length - 1 && <div className={styles.certDivider} />}
                            </React.Fragment>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ResumePage;
