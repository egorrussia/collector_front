"use client"

import { openModal } from "@/components/modals/redux/actions";
import { loadCollectors } from "@/components/collectors/redux/actions";
import { useDispatch, useSelector } from "react-redux"
import { Button, Pagination, Select, Table } from "antd";
import { useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";


export default function collectorPage() {
	const dispatch = useDispatch()
	const collectors = useSelector(p => p.collectors.collectors) || []
	const { totalItems, currentPage, itemsPerPage, totalPages } = useSelector(p => p.collectors.pagination)

	const router = useRouter();
	const searchParams = useSearchParams()
	const page = parseInt(searchParams.get('page')) || 1
	const limit = parseInt(searchParams.get('limit')) || 1
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
		}

	];

	useEffect(() => dispatch(loadCollectors({ page, limit, search })), [page, limit, search])

	return (
		<div>
			<div className="mb-5 mt-5 flex justify-end">
				<Button type="primary" onClick={() => {
					dispatch(openModal('AddCollectorForm'))
				}}>
					Создать коллектор
				</Button >
			</div>
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
					pagination={false} // Убрать пагинацию если нужно
				/>
			</div>

		</div >
	)
}




