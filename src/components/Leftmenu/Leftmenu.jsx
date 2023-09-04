import React from 'react';
import styles from   './Leftmenu.module.css'
const LeftMenu = () => {
    /**
     * 菜单栏常量
     */
    const LeftList = [
        {
            key:1,
            title:'日常任务',
        },
        {
            key:2,
            title:'会议记录'
        }
    ]
    return (
        <>
            <ul className={styles.LeftBox}>
                {
                    LeftList.map((item)=>
                        <li key={item.key}>{item.title}</li>
                    )
                }
            </ul>

        </>

    );
};

export default LeftMenu;