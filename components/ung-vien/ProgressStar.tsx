// components/ProgressBar.js
import React from 'react';
import styles from './progressStar.module.scss';

const ProgressStar = ({ percent }: any) => {
    return (
        <div className={styles.progressStar}>
            <div className={styles.progress} style={{ width: `${percent}%` }}></div>
        </div>
    );
};

export default ProgressStar;
