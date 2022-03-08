import React, { useState, useRef } from "react"
import { useHistory } from "react-router-dom"
import { SEARCH_ROUTE } from "../../consts"
import { Button, Form, FormControl, InputGroup } from "react-bootstrap"

const SearchBar = () => {
    const history = useHistory()
    const [search, setSearch] = useState("")

    const searchRef = useRef()

    const handleSearch = ({ target }) => {
        setSearch(target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        history.push(SEARCH_ROUTE + `?search=${search}`)
        searchRef.current.reset()
    }

    return (
        <Form onSubmit={handleSubmit} ref={searchRef} className="search-bar">
            <InputGroup>
                <FormControl
                    placeholder="Поиск"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    onChange={handleSearch}
                    required
                    className="search-input"
                />
                <Button
                    variant="outline-light"
                    id="button-addon2"
                    onClick={handleSubmit}
                    className="search-btn"
                >
                    <i className="bi bi-search"></i>
                </Button>
            </InputGroup>
        </Form>
    )
}

export default SearchBar
