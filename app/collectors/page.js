"use client"

import { openModal, closeModal } from "@/components/modals/redux/actions";
import { loadCollectors, deleteCollector } from "@/components/collectors/redux/actions";
import { useDispatch, useSelector } from "react-redux"
import { Button, Pagination, Popconfirm, Table, Spin } from "antd";
import { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { DeleteOutlined } from '@ant-design/icons';


export default function collectorPage() {
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(false);
	const collectors = useSelector(p => p.collectors.collectors) || []
	const { totalItems, currentPage, itemsPerPage } = useSelector(p => p.collectors.pagination)
	console.log(collectors)

	const router = useRouter();
	const searchParams = useSearchParams()
	const page = parseInt(searchParams.get('page')) || 1
	const limit = parseInt(searchParams.get('limit')) || 10
	const search = searchParams.get('search') == 'null' ? null : searchParams.get('search')

	const setPage = (page) => {
		router.push(`/collectors?page=${page}&limit=${itemsPerPage}`)
	}

	const setLimit = (limit) => {
		router.push(`/collectors?page=1&limit=${limit}`)
	}

	const setSearch = (search) => {
		if (search.length) {
			router.push(`/collectors?page=1&limit=${itemsPerPage}&search=${search}`)
		} else {
			router.push(`/collectors?page=1&limit=${itemsPerPage}`)
		}

	}

	const removeSearch = () => {
		router.push(`/collectors?page=1&limit=${itemsPerPage}`)
	}

	const collectorDelete = async (id) => {
		try {
			await dispatch(deleteCollector({ id }))
			dispatch(loadCollectors({ page, limit, search }))
		} catch (error) {
			message.error('Ошибка при удалении');
		}
	};

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'Название',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'IP адрес',
			dataIndex: 'ip',
			key: 'ip',
		},
		{
			title: 'порт',
			dataIndex: 'port',
			key: 'port',
		},
		{
			title: 'Действия',
			key: 'actions',
			width: 100,
			render: (_, record) => (
				<Popconfirm
					title="Удалить коллектор?"
					onConfirm={() => collectorDelete(record.id)}
					okText="Да"
					cancelText="Нет"
				>
					<Button
						type="text"
						danger
						icon={<DeleteOutlined />}
						size="small"
					/>
				</Popconfirm>
			)
		}

	];

	// useEffect(() => {
	// 	setLoading(true)
	// 	dispatch(loadCollectors({ page, limit, search })), [page, limit, search]
	// 	setLoading(false)
	// })

	useEffect(() => {

		setLoading(true);
		dispatch(loadCollectors({ page, limit, search })).then(() => setLoading(false))

	}, [page, limit, search]);

	const callback = () => {
		dispatch(closeModal());
		dispatch(loadCollectors({ page, limit, search }));
	}

	return (
		<>
			{loading ? (
				<div className="flex justify-center items-center h-full">
					<Spin size="large" />
				</div>
			) : (
				<div>
					<div className="mb-5 mt-5 flex justify-end">
						<Button type="primary" onClick={() => {
							dispatch(openModal('AddCollectorForm', null, callback))
						}}>
							Создать коллектор
						</Button >
					</div>
					{(collectors.length > 0) && <>
						<div className="mb-5 mt-5">
							<Pagination
								current={currentPage}
								total={totalItems}
								pageSize={itemsPerPage}

								onChange={(newpage) => {
									if (newpage != currentPage) { setPage(newpage) }
								}}

								showTotal={(total, range) =>
									`Найдено записей: ${total}`
								}

								showSizeChanger={true}

								pageSizeOptions={['1', '20', '50', '100']}

								onShowSizeChange={(currentPage, limit) => {
									setLimit(limit)
								}}

								locale={{
									items_per_page: '',
									jump_to: 'Перейти',
									page: '',
									select: null
								}}
							/>
						</div>
						<div className="mb-5 mt-5">
							<Table
								dataSource={collectors}
								columns={columns}
								pagination={false}
								rowKey="id"
							/>
						</div>
					</>}
				</div >
			)}

		</>
	)
}