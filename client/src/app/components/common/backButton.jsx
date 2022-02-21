import React from "react"
import { useHistory } from "react-router"

const BackHistoryButton = () => {
    const history = useHistory()

    return (
        <button
            className="action-btn btn btn-primary "
            onClick={() => history.goBack()}
        >
            <i className="bi bi-caret-left"></i>
            Назад
        </button>
    )
}

export default BackHistoryButton