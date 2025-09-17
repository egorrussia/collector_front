import { Modal } from "antd";
import { useDispatch,useSelector } from "react-redux";
import {settings} from "@/components/modals/settings";
import { closeModal } from "@/components/modals/redux/actions";

const Popup = () => {

	const dispatch = useDispatch()
	let {type, params, callback} = useSelector(m => m.forms.modal)

	const isOpen = type ? true : false
	
	if(!isOpen) return null

	let Component = settings[type].Component

	return (
		<Modal
			open={isOpen}
			title = {settings[type].title}
			onCancel={()=>dispatch(closeModal())}
			footer={null}
		>
			<Component params={params} callback={callback}/>
		</Modal>
	)
}

export default Popup