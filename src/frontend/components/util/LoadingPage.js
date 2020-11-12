import React from 'react';
import { Spin, Space } from 'antd';

function LoadingPage() {
    return (
        <div className = "loadingWrapper">
            <div className = "loading">
                <Space size="middle">
                <Spin size="large" />
                </Space>,
            </div>   
        </div>
    )
};

export default LoadingPage;