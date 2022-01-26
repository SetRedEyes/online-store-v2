import React, { useEffect, useState } from "react"
import { useAuth } from "../../../hooks/useAuth"
import TextField from "../../form/textField"
import { validator } from "../../../utils/validator"
import LoadingSpinner from "../../common/loadingSpinner"
import { Link } from "react-router-dom"
import { Col, Container, Form, Row } from "react-bootstrap"

const UserPage = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState()
    const { currentUser, updateUserData } = useAuth()
    const [errors, setErrors] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()

        const isValid = validate()
        if (!isValid) return
        try {
            console.log("from SUBMIT", data)

            await updateUserData({
                ...data
            })
        } catch (error) {
            setErrors(error)
        }
    }

    useEffect(() => {
        if (currentUser && !data) {
            setData({
                ...currentUser
            })
        }
    }, [currentUser, data])

    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false)
        }
    }, [data])

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: { message: "Электронная почта введена не корректно" }
        },
        firstName: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            },
            min: {
                message: "Имя должно состоять минимум из 3 символов",
                value: 3
            }
        },
        lastName: {
            isRequired: {
                message: "Фамилия обязательна для заполнения"
            },
            min: {
                message: "Фамилия должна состоять минимум из 3 символов",
                value: 3
            }
        },
        phone: {
            isRequired: {
                message: "Номер телефона обязателен для заполнения"
            }
        },
        city: {
            isRequired: {
                message: "Название города обязательно для заполнения"
            }
        },
        postOfficeNumber: {
            isRequired: {
                message: "Номер почтового отделения обязательнен для заполнения"
            }
        }
    }

    useEffect(() => {
        validate()
    }, [data])

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const isValid = Object.keys(errors).length !== 0
    return (
        <Row>
            <Col md={{ span: 6, offset: 3 }} className="shadow p-4">
                <Container>
                    <div className="d-flex  justify-content-center">
                        <Link
                            to={"/gigi-janssen-store/logOut"}
                            className="buyBtn btn btn-primary  "
                        >
                            Выйти из аккаунта
                        </Link>
                    </div>
                    {!isLoading && Object.keys(currentUser).length > 0 ? (
                        <Form onSubmit={handleSubmit} className="ms-3">
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                                disabled={true}
                            />
                            <TextField
                                label="Имя"
                                name="firstName"
                                value={data.firstName}
                                onChange={handleChange}
                                error={errors.firstName}
                            />
                            <TextField
                                label="Фамилия"
                                name="lastName"
                                value={data.lastName}
                                onChange={handleChange}
                                error={errors.lastName}
                            />
                            <TextField
                                label="Номер телефона"
                                name="phone"
                                value={data.phone}
                                onChange={handleChange}
                                error={errors.phone}
                            />
                            <TextField
                                label="Город"
                                name="city"
                                value={data.city}
                                onChange={handleChange}
                                error={errors.city}
                            />
                            <TextField
                                label="Номер отделения Новой Почты"
                                name="postOfficeNumber"
                                value={data.postOfficeNumber}
                                onChange={handleChange}
                                error={errors.postOfficeNumber}
                            />

                            <button
                                type="submit"
                                disabled={isValid}
                                className="btn btn-primary w-100 mx-auto submit-btn"
                            >
                                Отправить данные
                            </button>
                        </Form>
                    ) : (
                        <LoadingSpinner />
                    )}
                </Container>
            </Col>
        </Row>
    )
}

export default UserPage
