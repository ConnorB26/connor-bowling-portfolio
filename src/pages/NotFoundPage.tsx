import React from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import styles from './NotFoundPage.module.css';

const NotFoundPage: React.FC = () => {
    return (
        <Container className={`d-flex justify-content-center align-items-center ${styles.fullHeight}`}>
            <h1 className={styles.code}>404</h1>
            <p className={styles.message}>This page doesn't exist.</p>
            <Link to="/" className={styles.homeLink}>
                <BsArrowLeft /> Back to home
            </Link>
        </Container>
    );
};

export default NotFoundPage;
