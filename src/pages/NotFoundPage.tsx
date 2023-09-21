import React from 'react';
import Container from 'react-bootstrap/Container';
import styles from './NotFoundPage.module.css';

const NotFoundPage: React.FC = () => {
    return (
        <Container className={`d-flex justify-content-center align-items-center ${styles.fullHeight}`}>
            <h1 className='text-white'>Page Not Found</h1>
        </Container>
    );
};

export default NotFoundPage;
