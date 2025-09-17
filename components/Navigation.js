"use client"
import React, { useState } from 'react';
import { Layout, Menu, Button, Spin } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DashboardOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';

const { Header, Sider, Content } = Layout;

export default function Navigation({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);


  const menuConfig = [
    { key: '1', path: '/', icon: <UserOutlined />, label: 'Главная' },
    { key: '2', path: '/collectors', icon: <DashboardOutlined />, label: 'Коллекторы' },
    { key: '3', path: '/agents', icon: <TeamOutlined />, label: 'Агенты' }
  ];

  const handleMenuClick = (key) => {
    const item = menuConfig.find(item => item.key === key);
    if (item) {
      router.push(item.path);
    }
  };

  const getSelectedKeys = () => {
    const item = menuConfig.find(item => item.path === pathname);
    return item ? [item.key] : ['1'];
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={200}
        style={{ background: '#fff' }}
      >
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
          selectedKeys={getSelectedKeys()}
          items={menuConfig}
          onClick={({ key }) => handleMenuClick(key)}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: '#fff' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}