"use client"

import React from 'react';
import { AuthProvider, useAuthContext } from "@/components/context/Auth";
import { Spin } from "antd";

import { AntdRegistry } from '@ant-design/nextjs-registry'
import { Provider } from 'react-redux';
import { useStore } from '@/redux/store';
import './globals.css'

import Popup from '@/components/Popup';
import Navigation from '@/components/Navigation';

const AuthLayout = ({ children }) => {
	const {user, isLoading} = useAuthContext();

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<Spin size="large" />
			</div>
		);
	}
	console.log(user)
	return (!user.token) ? (
		<>
			<Navigation>{children}</Navigation>
			<Popup />
		</>
	) : (
		<div className="min-h-screen">
			{children}
		</div>
	);
};

export default function RootLayout({ children }) {
	const store = useStore()

	return (
		<html lang="ru">
			<body>
				<AntdRegistry>
					<Provider store={store}>
						<AuthProvider>
							<AuthLayout>{children}</AuthLayout>
						</AuthProvider>
					</Provider>
				</AntdRegistry>
			</body>
		</html>
	)
}