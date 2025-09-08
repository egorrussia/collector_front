"use client"
import { Button } from "antd";
import { openModal } from "@/components/modals/redux/actions";
import { useDispatch } from "react-redux"

export default function collectorPage() {
	const dispatch = useDispatch()
	return (
		<div>
			<Button type="primary" onClick={() => {
				dispatch(openModal('AddCollectorForm'))
			}}>
				Создать коллектор
			</Button >
			<h1>Коллекторы</h1>
		</div >
	)
} 