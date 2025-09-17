import { Button, Input } from "antd"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { closeModal } from "@/components/modals/redux/actions"
import { createCollector } from "@/components/collectors/redux/actions"

const AddCollector = ({ callback }) => {
    const [params, setParams] = useState({
        ipAddress: null,
        port: null,
        name: null,
        description: null
    })

    const dispatch = useDispatch()

    const addCollector = async () => {
        try {
            await dispatch(createCollector(params))
            callback();
        } catch (error) {
            message.error('Ошибка при создании');
        }
    };

    return (

        <div className="flex flex-col gap-3">
            <Input
                placeholder="IP адресс"
                onChange={(e) => setParams({ ...params, ipAddress: e.target.value })}
            />
            <Input
                placeholder="порт"
                onChange={(e) => setParams({ ...params, port: e.target.value })}
            />
            <Input
                placeholder="наименование"
                onChange={(e) => setParams({ ...params, name: e.target.value })}
            />
            <Input
                placeholder="описание"
                onChange={(e) => setParams({ ...params, description: e.target.value })}
            />

            <div className="flex justify-end mt-4">
                <Button type="primary" disabled={!params.name} onClick={addCollector}>
                    Создать
                </Button>
            </div>
        </div>

    )
}

export default AddCollector
