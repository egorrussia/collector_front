"use client"
import React from 'react';
import { AuthProvider } from "@/components/context/Auth"
import { MainProvider } from "@/components/context/Main"
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { Provider } from 'react-redux';
import { useStore } from '@/redux/store';
import './globals.css'

import Popup from '@/components/Popup';
import Navigation from '@/components/Navigation';

export default function RootLayout({ children }) {
	const store = useStore()

	return (
		<html lang="ru">
			<body>
				<AntdRegistry>
					<Provider store={store}>
						<AuthProvider>
							<MainProvider>
								<Navigation>
									{children}
								</Navigation>
								<Popup />
							</MainProvider>
						</AuthProvider>
					</Provider>
				</AntdRegistry>
			</body>
		</html>
	)
}