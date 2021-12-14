import React, { useEffect, useState } from "react"
import { Breadcrumb } from "react-bootstrap"
import { Link, useLocation } from "react-router-dom"
import api from "../../api"
import PropTypes from "prop-types"
import { useCategory } from "../../hooks/useCategory"

const BreadCrumbs = ({ productId }) => {
  const [product, setProduct] = useState()
  const { categories } = useCategory()
  const { pathname } = useLocation()

  useEffect(() => {
    api.products.getById(productId).then((data) => setProduct(data))
  }, [productId])

  const pathnames = pathname.split("/").filter((x) => x)
  console.log(product)
  const renderCrumbName = (name) => {
    if (name === "gigi") {
      return "Каталог GIGI"
    } else if (name === "janssen") {
      return "Каталог Janssen"
    } else if (name === "search") {
      return "Поиск"
    } else if (categories && isNaN(name)) {
      return categories.find((cat) => cat._id === name).name
    } else if (product && !isNaN(name)) {
      return `${product.name} - ${product.rusName}`
    }
  }

  if (pathname === "/") return null

  return (
    <Breadcrumb className="ms-3 mt-2">
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/` }}>
        Главная
      </Breadcrumb.Item>
      {pathnames.map((name, index) => {
        const isLast = index === pathnames.length - 1
        const routeTo = pathnames.slice(0, index + 1).join("/")
        return (
          <Breadcrumb.Item
            linkAs={Link}
            linkProps={{ to: `/${routeTo}` }}
            key={name}
            active={isLast}
          >
            {renderCrumbName(name)}
          </Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
  )
}

BreadCrumbs.propTypes = {
  productId: PropTypes.string
}

export default BreadCrumbs
