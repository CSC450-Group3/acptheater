import React from 'react';
import { Spin, Space } from 'antd';

function Loading() {
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

export default Loading;