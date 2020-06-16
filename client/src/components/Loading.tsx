import React from 'react'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export const Loading=()=>{
    const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;

    return (
        <Spin indicator={antIcon} />
    )
}


